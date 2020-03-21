import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import http from './http'
import dayjs from 'dayjs'


// 引入CSS
import './assets/css/customiz.css' 
import './assets/css/icon-font/iconfont.css'


Vue.config.productionTip = false
Vue.prototype.$http = http;

Vue.filter( 'date' , function ( value ) {
    return dayjs(value).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
