import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './plugins/element'
import './plugins/avue'
import router from './router'
import EleForm from 'vue-ele-form'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

// //注册vue-ele-form,动态表单
// Vue.use(EleForm)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
