import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App),
}).$mount('#app')

