// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import MintUI from 'mint-ui'
import  'mint-ui/lib/style.css'
import fastclick from 'fastclick'
import Dialog from './assets/js/vue-dialog'
import Lazyload from './assets/js/lazy'
import './assets/css/dialog.css'
import './assets/css/iconfont.css'
Vue.config.productionTip = false
Vue.use(Dialog)
Vue.use(Lazyload)
Vue.use(MintUI)

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
