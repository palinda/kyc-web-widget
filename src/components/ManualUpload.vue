<template>
  <div>
      <div>
        
        <div class="container">
          <vue-dropzone ref="dropzonePassport" id="dropzonePassport" v-on:vdropzone-sending="sendingEventPassport" 
          v-on:vdropzone-error="onErrorPassport" v-on:vdropzone-success="onPassportCompleted" :options="dropzoneOptionsPassport"></vue-dropzone>
          <div class="error" v-if="passportError != undefined"> {{passportError}}</div>
          <div class="info" v-if="uploadingPassport">Uploading. Please wait.</div>
        
        </div>
        <!-- <button v-on:click="uploadFile($event, 'passport')">Upload Passport</button> -->

        <div class="container">
          <vue-dropzone ref="dropzoneFace" id="dropzoneFace" v-on:vdropzone-sending="sendingEventFace" 
          v-on:vdropzone-error="onErrorFace" v-on:vdropzone-success="onFaceCompleted" :options="dropzoneOptionsFace"></vue-dropzone>
          <div class="error" v-if="faceError != undefined"> {{faceError}}</div>
          <div class="info" v-if="uploadingFace">Uploading. Please wait.</div>
        </div>
        <!-- <button v-on:click="uploadFile($event, 'face')">Upload Selfie</button> -->
        
        <button class="btn" v-on:click="close($event)" v-if="faceCompleted && passportCompleted">Done</button>
      </div>
  </div>
</template>


<script>
import { HttpPost } from '../http-common';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name : 'manual-upload', 
  props: {
    reference : undefined,
    closeCallback: undefined
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
      return {
        dropzoneOptionsPassport: {
            url: 'http://kyc-server-dev.app3prj8ks.us-east-1.elasticbeanstalk.com:80/webapi/manual/passport',
            maxFilesize: 8,
            paramName: 'image',
            maxFiles: 1,
            dictDefaultMessage: 'Upload passport image here',
            thumbnailWidth: 300,
            acceptedFiles: 'image/*'
        },
        dropzoneOptionsFace: {
            url: 'http://kyc-server-dev.app3prj8ks.us-east-1.elasticbeanstalk.com:80/webapi/manual/face',
            maxFilesize: 8,
            paramName: 'image',
            maxFiles: 1,
            dictDefaultMessage: 'Upload face image here',
            thumbnailWidth: 300,
            acceptedFiles: 'image/*'
        },
        faceError: undefined,
        passportError: undefined,
        faceCompleted: false,
        passportCompleted: false,
        uploadingPassport: false,
        uploadingFace: false
    }
  },
  methods: {
    uploadFile(event, type) {
      HttpPost(`manual/${type}`, {
        ref: this.reference
      })
      .then(response => {
        this.currentStatus = response.statusCode;
      })
      .catch(e => {
        this.error = e;
      })  
    },
    sendingEventPassport (file, xhr, formData) {
      formData.append('ref', this.reference);
      this.uploadingPassport = true;
    },
    sendingEventFace (file, xhr, formData) {
      formData.append('ref', this.reference);
      this.uploadingFace = true;
    },
    onErrorPassport(file, message, xh) {
      this.passportError = message;
      this.uploadingPassport = false;
    },
    onErrorFace(file, message, xh) {
      this.faceError = message;
      this.uploadingFace = false;
    },
    onPassportCompleted() {
      this.passportCompleted = true; 
      this.uploadingPassport = false;
    },
    onFaceCompleted() {
      this.faceCompleted = true;
      this.uploadingFace = false;
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
  .image_container {
    width: 300px;
    height: 250px;
    border: 1px solid gray;
  }

  .container {
    padding: 15px;
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
</style>