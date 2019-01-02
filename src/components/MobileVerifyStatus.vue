<template>
  <div>
      <div class="container-status">
        <div v-for="(item, index) in items" v-bind:key="index" class="row">
          <span class="iconmoon-checkmark2 status-icon font-size-21" v-if="index+1 < currentStatus"></span>
          <span class="iconmoon-radio-unchecked status-icon font-size-18" v-if="index+1 > currentStatus"></span>
          <span class="spinner iconmoon-spinner status-icon font-size-18" v-if="index+1 == currentStatus && resp.status != 'failed'"></span>
          <span class="iconmoon-close status-icon font-size-21" style="color: rgb(241, 87, 33)" v-if="index+1 == currentStatus && resp.status == 'failed'"></span>
          
          &nbsp;&nbsp;&nbsp;<span class="status-text">{{ item.message }}</span>
        </div>
      </div>
      <div v-if="error != undefined" class="error-text">{{error}}</div>
      <button class="btn" v-on:click="close($event)" v-if="currentStatus > items.length">Done</button>
      <button class="btn" v-on:click="goBack($event)">Back</button>
  </div>
</template>


<script>
import { HttpPost } from '../http-common';

export default {
  name : 'mobile-verify-status',
  props: {
    reference: undefined
  },
  data: function () {
      return {
          mobileNumber: '',
          items: [
            { message: 'Passport Reading' },
            { message: 'Passport Confirmation' },
            { message: 'Liveness Detection' },
            { message: 'Validating User' },
            { message: 'Account Verification' }
          ],
          currentStatus: 1,
          resp: {},
          error: undefined
      }
  },
  created: function() {
      this.timer = setInterval(this.getStatus, 5000)
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.mobileNumber = number;
    },
    getStatus() {
      HttpPost(`webapi/status`, this.reference, {
      })
      .then(response => {
        this.error = response.data.error;
        this.resp = response.data;
        if (this.resp.status == 'success') {
          this.currentStatus = response.data.index != undefined ? response.data.index + 1 : 1;
        } else {
          this.currentStatus = response.data.index != undefined ? response.data.index : 1;
        }
        
      })
      .catch(e => {
        this.error = 'Connection error. Please try again';
      })    
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
    cancelAutoUpdate: function() { clearInterval(this.timer) }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>

<style scoped>
 .status-icon {
   color: 'black';
 }

 .font-size-18 {
   font-size: 18px;
 }

 .font-size-21 {
   font-size: 21px;
 }

 .status-text {
   color: 'gray';
   font-size: 16px;
 }

 .row {
   padding: 8px 10px;
   vertical-align: top;
 }

@keyframes anim-rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
.spinner {
	display: inline-block;
	animation: anim-rotate 2s infinite linear;
	text-shadow: 0 0 .25em rgba(255,255,255, .3);
}
.spinner--steps {
	animation: anim-rotate 1s infinite steps(8);
}
.spinner--steps2 {
	animation: anim-rotate 1s infinite steps(12);
}

</style>