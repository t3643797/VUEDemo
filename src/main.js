import Vue from 'vue'
import App from './App.vue'
import router from './router'

import uploader from 'vue-simple-uploader'
Vue.use(uploader)
import '@/style/base.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
