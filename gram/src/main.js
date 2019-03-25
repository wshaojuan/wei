import Vue from 'vue'
import App from './App.vue'
import VueDragscoll from 'vue-dragscroll'
Vue.use(VueDragscoll)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
