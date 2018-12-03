<template>
  <div>
      <div>
        <div v-for="(item, index) in items" v-bind:key="index" class="row">
          <span class="iconmoon-checkmark2 status-icon font-size-21" v-if="index+1 < currentStatus"></span>
          <span class="iconmoon-radio-unchecked status-icon font-size-18" v-if="index+1 > currentStatus"></span>
          <span class="spinner iconmoon-spinner status-icon font-size-18" v-if="index+1 == currentStatus"></span>
          
          &nbsp;&nbsp;&nbsp;<span class="status-text">{{ item.message }}</span>
        </div>
      </div>
      <button class="btn" v-on:click="close($event)" v-if="currentStatus > items.length">Done</button>
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
            { message: 'Liveness Detection' },
            { message: 'Validating User' },
            { message: 'Completed' }
          ],
          currentStatus: 1
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
      HttpPost(`webapi/status`, {
        ref: this.reference
      })
      .then(response => {
        this.currentStatus = response.data.statusCode != undefined ? response.data.statusCode + 1 : 1;

      })
      .catch(e => {
        this.error = e;
      })    
    },
    close(event) {
      if (this.closeCallback != undefined) {
        this.closeCallback(event);
      }
      this.$emit('closed', event);
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
.btn {
    background-color: #686868;
    color: white;
    border: 1px solid #686868;
    padding: 6px 15px;
    border-radius: 3px;
    margin: 20px 10px 10px 15px;
  }
</style>