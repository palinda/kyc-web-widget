<template>
  <div class="kyc-widget">
    <div class="" v-if="mode ==  1 || mode == undefined">
      <div class="">
        
       <h2 class="inline"><span class="iconmoon-phone icon"></span>Instant Verification Via Mobile App</h2>
        <div class="et-body ">
          <span class="p-b-20">
            Enter your mobile number in below to get an SMS with a link to Verification App.<br>This will verify you instantly.
          </span>
        </div>
      </div>

        <div class="actions" v-if="mode == undefined">
            <div class="phone-input">
              <vue-tel-input class="" v-model="mobileNumber"
                    @onInput="onInput"
                    :preferredCountries="['us', 'lk']">
              </vue-tel-input>
            </div>
            <button class="btn" v-on:click="sendSMS($event)" :disabled="mobileNumber == undefined"><span>Request Url</span></button>
            <div class="error" v-if="error != undefined"> {{error}}</div>
        </div>
        <div class="actions" v-if="mode == 1">
          <mobile-verify-status v-bind:reference="reference"  @closed="onClose" @goback="mode = undefined"></mobile-verify-status>
        </div>
    </div>
    <div class="" v-if="mode == 2 || mode == undefined">

      <div class="">
        
       <h2 class=""><span class="iconmoon-cloud-upload icon" style="font-weight: 600;"></span>Manual Verification</h2>
        <div class="et-body ">
          <span class="p-b-20">
            Manually upload your passport and selfie image here. <br> 
            We will notify you via an email once it is processed.
          </span>
        </div>
      </div>

      <div class="actions" v-if="mode == undefined">
        <button class="inline btn" v-on:click="setMode(2)"><span class="">Process Manually</span></button>
      </div>
      <div class="actions" v-if="mode == 2">
        <manual-upload v-bind:reference="reference" @closed="onClose" @goback="mode = undefined"></manual-upload>
      </div>
    </div>
  </div>
</template>


<script>
import { HttpPost } from '../http-common';

export default {
  name : 'kyc-widget', 
  props: {
    reference: undefined,
    closeCallback: Function,
    mode: undefined
  },
  data: function () {
      return {
          mobileNumber: '',
          error: undefined
      }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.mobileNumber = number;
    },
    sendSMS (event) {
      if (this.mobileNumber == undefined || this.mobileNumber == '') {
        this.error = 'Mobile number is required';
        return;
      }

      if (this.reference == undefined || this.reference == '') {
        this.error = 'Please set request reference. Please contact support.';
        return;
      }

      HttpPost(`webapi/send_sms`, this.reference, {
        tel: this.mobileNumber,
      })
      .then(response => {
        this.setMode(1);
      })
      .catch(e => {
        this.error = 'Connection error' + (e.transformResponse != undefined ? ': ' + e.transformResponse : '');
      })    
    },
    setMode (mode) {
      this.mode = mode;
    },
    onClose(event) {
      if (this.closeCallback != undefined) {
        this.closeCallback(event);
      }
      this.$emit('closed', event);
    }
  }
};
</script>

<style scoped>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; 
    background-color: #e9ebee;
    margin: 10px;
    vertical-align: top;
  }

  .inline {
    display: inline-block;
  }

  .round-btn {
    border-radius: 100%;
    border: 1px solid gray;
    background-color: lightgrey;
    padding: 10px 13px;
    vertical-align: middle;
    font-size: 32px;
  }

  .title {
    font-size: 18px;
    color: black;
    padding-left: 12px;
    border-bottom: 15px;
    font-size: 21px;
  }

  .details {
    font-size: 16px;
    color: #5b5b5b;
    padding: 19px 0px;
  }

  .actions {
    padding: 15px;
    background-color: white;
  }

  .top {
    padding: 20px;
  }

  .phone-input {
    padding-bottom: 10px;
    max-width: 300px;
    margin: 0px auto;
  }

  .error {
    color: #f74646;
    font-size: 15px;
    padding: 15px 0px;
    background: none;
  }

  .icon {
    padding: 12px;
  }

  .vue-tel-input {
    border: none;
    border-bottom: 1px solid #c3c3c3;
    border-radius: 0px;
  }
</style>