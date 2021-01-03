import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueSocketIO from 'vue-socket.io'
var _ = require('lodash');

// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
// Vue.component('loading-overlay', Loading)

// const BASE_URL = process.env.NODE_ENV === 'production'
//     ? '/api/'
//     : '//localhost:3030'

// var moment = require('moment');

//Styles
import "./styles/styles.scss"

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y',
    libraries: 'places',
  },
});

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: BASE_URL,
// }))


Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
