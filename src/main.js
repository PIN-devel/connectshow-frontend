import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'


//<--도연
import VueCookies from 'vue-cookies'
import VueSimpleAlert from "vue-simple-alert"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {}); // config is optional. more below

Vue.use(BootstrapVue)

var sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions)

Vue.use(VueCookies)
Vue.use(VueSimpleAlert)
//--> npm install --save vue-cookies vue-simple-alert
// npm install vue-wysiwyg --save


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
