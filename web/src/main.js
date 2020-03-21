import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// 引入CSS

import './assets/css/styles.scss'
import './assets/icon-font/iconfont.css'
import 'swiper/dist/css/swiper.css'

Vue.prototype.$http = axios.create({
    baseURL:'http://localhost:3000/web/api'
})

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
