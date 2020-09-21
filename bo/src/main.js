import Vue from 'vue'

// Layouts
import Default from '@/layouts/Default.vue'
import NoSidebar from '@/layouts/Empty.vue'

Vue.component('default-layout', Default)
Vue.component('empty-layout', NoSidebar)

// App root component
import App from './App.vue'

// Vue Router
import router from './router'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/fr'

Vue.use(ElementUI, { locale })

// Vuex
import store from './store'

// Ionicons
import 'ionicons/dist/css/ionicons.min.css'
import '@mdi/font/scss/materialdesignicons.scss'
// Global styles
import '@/assets/styles/app.scss'
Vue.config.productionTip = false

// Filters
import filters from './filters'
filters.forEach(f => {
  Vue.filter(f.name, f.filter)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
