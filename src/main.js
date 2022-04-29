import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";



loadFonts()

createApp(App)
  .use(router)
  .use(store)
    .use(Toast,{
        rtl:true
    })
  .use(vuetify)
  .mount('#app')
