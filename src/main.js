import Vue from 'vue'
import './fonts/flaticon/font/flaticon.css';
import 'vue-tel-input/dist/vue-tel-input.css';
import './fonts/icomoon/style.css';
import KycWidget from './components/KycWidget.vue'
import MobileVerifyStatus from './components/MobileVerifyStatus.vue'
import ManualUpload from './components/ManualUpload.vue'

import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import './styles.scss';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCustomElement from 'vue-custom-element'
import VueTelInput from 'vue-tel-input'

// import DependancyPlugin from './dependancy.js';

Vue.use(VueTelInput)
Vue.use(VueCustomElement)
Vue.use(VueAxios, axios);
Vue.customElement('kyc-widget',KycWidget)
Vue.customElement('mobile-verify-status',MobileVerifyStatus)
Vue.customElement('manual-upload',ManualUpload)

