import $ from 'jquery';

function register(Vue, name, obj) {
    Object.defineProperty(Vue.prototype, name, { value: obj });
}

export default {
  install: function(Vue,) {
  }
}