// import Vue from 'vue'
import { createApp } from 'vue'
import store from './store.js';
import App from './App.vue'
// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue)
// Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)
app.use(store)
app.mount('#app')

// new Vue({
//   store,
//   render: h => h(App),
// }).$mount('#app')
