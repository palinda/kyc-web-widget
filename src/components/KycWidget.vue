<template>
  <div class="kyc-widget">
    <div class="card" v-if="mode ==  1 || mode == undefined">
        <div class="top">
          <div class="inline round-btn">
            <span class="iconmoon-phone"></span>
          </div>
          <div class="inline title">Instant Verification Via Mobile App</div>

          <div class="details">
            Enter your mobile number in below to get an SMS with a link to Verification App. This will verify you instantly.
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
          <mobile-verify-status v-bind:reference="reference"  @closed="onClose"></mobile-verify-status>
        </div>
    </div>
    <div class="card" v-if="mode == 2 || mode == undefined">

      <div class="top">
        <div class="inline round-btn">
          <span class="iconmoon-cloud-upload"></span>
        </div>
        <div class="inline title">Manual Verification</div>

        <div class="details">
          Manually upload your passport and selfie image here. We will notify you via an email once it is processed. 
        </div>
      </div>

      <div class="actions" v-if="mode == undefined">
        <button class="inline btn" v-on:click="setMode(2)"><span class="">Process Manually</span></button>
      </div>
      <div class="actions" v-if="mode == 2">
        <manual-upload v-bind:reference="reference" @closed="onClose"></manual-upload>
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
    closeCallback: Function
  },
  data: function () {
      return {
          mobileNumber: '',
          mode: undefined,
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

      HttpPost(`webapi/send_sms`, {
        tel: this.mobileNumber,
        ref: this.reference
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
    max-width: 500px;
    background-color: #e9ebee;
    margin: 10px;
    vertical-align: top;
    font-family: sans-serif;
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

  .btn {
    background-color: #686868;
    color: white;
    border: 1px solid #686868;
    padding: 6px 15px;
    border-radius: 3px;
  }

  .top {
    padding: 20px;
  }

  .phone-input {
    padding-bottom: 10px;
  }

  .error {
    color: #f74646;
    font-size: 15px;
    padding: 15px 0px;
  }
</style>