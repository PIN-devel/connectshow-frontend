import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import vueCalendar from "vue2-simple-calendar"
import "./assets/vue2-simple-calendar.css"

//<--도연
import VueCookies from 'vue-cookies'
import VueSimpleAlert from "vue-simple-alert"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";

//수미
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.use(wysiwyg, {}); // config is optional. more below

var sessionOptions = {
  persist: true
}
Vue.use(wysiwyg, {})
Vue.use(BootstrapVue)
Vue.use(vueCalendar)
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
