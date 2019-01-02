<template>
  <div>
      <div>
        
        <div class="container"  id="pwz">
          <vue-dropzone :include-styling="false"
      v-on:vdropzone-thumbnail="thumbnail"
      class="customdropzone" ref="dropzonePassport" id="dropzonePassport" v-on:vdropzone-sending="sendingEventPassport" 
          v-on:vdropzone-error="onErrorPassport" v-on:vdropzone-success="onPassportCompleted" :options="dropzoneOptionsPassport"></vue-dropzone>
          <div class="error" v-if="passportError != undefined"> {{passportError}}</div>
          <div class="info" v-if="uploadingPassport">Uploading. Please wait.</div>
        
        </div>
        <!-- <button v-on:click="uploadFile($event, 'passport')">Upload Passport</button> -->

        <div class="container" v-if="passportCompleted" id="fcz">
          <vue-dropzone :include-styling="false"
              class="customdropzone"  v-on:vdropzone-thumbnail="thumbnail" ref="dropzoneFace" id="dropzoneFace" v-on:vdropzone-sending="sendingEventFace" 
          v-on:vdropzone-error="onErrorFace" v-on:vdropzone-success="onFaceCompleted" :options="dropzoneOptionsFace"></vue-dropzone>
          <div class="error" v-if="faceError != undefined"> {{faceError}}</div>
          <div class="info" v-if="uploadingFace">Uploading. Please wait.</div>
        </div>
        <!-- <button v-on:click="uploadFile($event, 'face')">Upload Selfie</button> -->
        
        <div class="msg-box success" v-if="faceCompleted && passportCompleted">
          <div class="fl img"><img src="../imgs/success.png" alt="Success" /></div>
          <div class="fl"><h3>Upload Completed!</h3></div>
        </div>

        <button class="btn" v-on:click="goBack($event)">Back</button>
        <!-- <button class="btn" v-on:click="close($event)" v-if="faceCompleted && passportCompleted">Done</button> -->
      </div>
  </div>
</template>


<script>
import { HttpPost } from '../http-common';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { Configs } from '../configs'
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
            url: `${Configs.endpoint}webapi/manual/passport`,
            maxFilesize: 8,
            paramName: 'image',
            maxFiles: 1,
            timeout: 240000,
            dictDefaultMessage: 'Upload passport image here',
            thumbnailWidth: 300,
            acceptedFiles: 'image/*',
            headers: {
              Authorization: this.reference,
            },
            previewTemplate: this.template(),
        },
        dropzoneOptionsFace: {
            url: `${Configs.endpoint}webapi/manual/face`,
            maxFilesize: 8,
            paramName: 'image',
            maxFiles: 1,
            dictDefaultMessage: 'Upload face image here',
            thumbnailWidth: 300,
            timeout: 240000,
            acceptedFiles: 'image/*',
            headers: {
              Authorization: this.reference
            },
            previewTemplate: this.template(),
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
    sendingEventPassport (file, xhr, formData) {
      this.uploadingPassport = true;
    },
    sendingEventFace (file, xhr, formData) {
      this.uploadingFace = true;
    },
    onErrorPassport(file, message, xh) {
      this.passportError = 'Connection error. Please try again'
      this.uploadingPassport = false;
    },
    onErrorFace(file, message, xh) {
      this.faceError = 'Connection error. Please try again'
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
    },
    goBack(event) {
      this.$emit('goback', event)
    },
    template() {
        return `<div class="dz-preview dz-file-preview">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg></div>
                </div>
                <div class="dz-details">
                    <div class="dz-size"><span data-dz-size></span></div>
                  
                    <div class="dz-filename"><span data-dz-name></span></div>
                </div>
                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                <div class="dz-error-mark"><i class="fa fa-close"></i></div>
            </div>
        `;
      }, 
      thumbnail(file, dataUrl) {
        var j, len, ref, thumbnailElement;
        if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
            for (j = 0, len = ref.length; j < len; j++) {
                thumbnailElement = ref[j];
                thumbnailElement.alt = file.name;
                thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
                thumbnailElement.style.height = '200px';
                thumbnailElement.style.backgroundRepeat = 'no-repeat';
                thumbnailElement.style.backgroundPosition = 'center';
            }
            return setTimeout(((function(_this) {
                return function() {
                    return file.previewElement.classList.add("dz-image-preview");
                };
            })(this)), 1);
        }
      }
    }
};
</script>

<style scoped>
   .inline {
    display: inline-block;
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
    color: white;
    font-size: 15px;
    padding: 15px 0px;
  }

  .info {
    color: 'black';
    font-size: 15px;
    padding: 15px 0px;
  }

  .dz-progress {
    height: 7px;
  }

  #pwz .customdropzone {
    background-image: url('../imgs/passport-icon.png');
  }

  #fcz .customdropzone {
    background-image: url('../imgs/face-icon.png');
  }

  .customdropzone {
    border:2px dotted #1388ca; display: block; min-height: 100px;width: auto; margin: 10PX 0; padding: 5%;
    border-radius: 8px; background-color:#1388ca14;
    background-repeat: no-repeat;
    background-position: center; position: relative;
  }

  .customdropzone .dz-preview {
    width: 160px;
    display: inline-block
  }
 .customdropzone .dz-preview .dz-image {
    width: 80px;
    height: 80px;
    margin-left: 40px;
    margin-bottom: 10px;
  }
  .customdropzone .dz-preview .dz-image > div {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-size: contain;
  }
  .customdropzone .dz-preview .dz-image > img {
    width: 100%;
  }

   .customdropzone .dz-preview .dz-details {
    color: white;
    transition: opacity .2s linear;
    text-align: center;
  }
  .customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
    display: none;
  }
</style>