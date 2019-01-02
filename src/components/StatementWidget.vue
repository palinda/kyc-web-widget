<template>
  <div>
      <div>
        <div class="container">
          <vue-dropzone ref="dropzoneStatement" id="dropzoneStatement" v-on:vdropzone-sending="sendingEventStatement" 
          v-on:vdropzone-error="onErrorStatement" v-on:vdropzone-success="onStatementCompleted" :options="dropzoneOptionsStatement"></vue-dropzone>
          <div class="error" v-if="statementError != undefined"> {{statementError}}</div>
          <div class="info" v-if="uploadingStatement">Uploading. Please wait.</div>
        </div>
         <div class="result" v-if="statementCompleted">
            <div class="result-row">
              <span>Account Name: </span><span>{{accountName}}</span>
            </div>

            <div class="result-row">
              <span>Account No: </span><span>{{accountNo}}</span>
            </div>
        </div>

        <button class="btn" v-on:click="close($event)" v-if="statementCompleted">Done</button>
        
       
      </div>
  </div>
</template>

<script>
import { HttpPost } from '../http-common';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { Configs } from '../configs'

export default {
  name : 'statement-upload', 
  props: {
    reference : undefined,
    closeCallback: undefined
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
      return {
        dropzoneOptionsStatement: {
            url: `${Configs.endpoint}webapi/statement`,
            maxFilesize: 8,
            paramName: 'statement',
            maxFiles: 1,
            dictDefaultMessage: 'Upload statement here',
            thumbnailWidth: 150,
            acceptedFiles: 'application/pdf',
            timeout: 60000
        },
        statementError: undefined,
        statementCompleted: false,
        uploadingStatement: false,
        accountName: undefined,
        accountNo: undefined
    }
  },
  methods: {
    // uploadFile(event, type) {
    //   HttpPost(`${type}`, {
    //     ref: this.reference
    //   })
    //   .then(response => {
    //     if (response.AccountNo.length > 0)
    //       this.accountNo = response.AccountNo[0];

    //     if (response.AccountName.length > 0)
    //       this.accountName = response.AccountName[0];
    //   })
    //   .catch(e => {
    //     this.error = e;
    //   })  
    // },
    sendingEventStatement (file, xhr, formData) {
      formData.append('ref', this.reference);
      this.uploadingStatement = true;
    },
    onErrorStatement(file, message, xh) {
      this.statementError = message;
      this.uploadingStatement = false;
    },
    onStatementCompleted(file, response) {
      this.statementCompleted = true; 
      this.uploadingStatement = false;

      if (response.AccountNo.length > 0)
          this.accountNo = response.AccountNo[0];

      if (response.AccountName.length > 0)
        this.accountName = response.AccountName[0];
    },
    close(event) {
      if (this.closeCallback != undefined) {
        this.closeCallback(event);
      }
      this.$emit('closed', event);
    }
  }
};
</script>

<style scoped>
   .inline {
    display: inline-block;
  }
  .btn {
    background-color: #686868;
    color: white;
    border: 1px solid #686868;
    padding: 6px 15px;
    border-radius: 3px;
    margin: 20px 10px 10px 15px;
  }

  .container {
    padding: 10px;
    margin: 15px;
    width: 240px;
  }

  .dropzone {
    padding: 0px !important;
  }

  .error {
    color: #f74646;
    font-size: 15px;
    padding: 15px 0px;
  }

  .info {
    color: 'black';
    font-size: 15px;
    padding: 15px 0px;
  }

  .result {
    padding: 15px 20px;
    font-size: 18px;
    color: black;
  }

  .result-row {
    padding: 5px 0px;
  }
</style>