import {createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



let app = createApp(App)
app.use(store)
app.use(router)

app.config.globalProperties.$filters = {
    currencyUSD(value) {
      return '$' + value
    }
}
app.directive('highlight', {    
     beforeMount(el, binding, vnode) {       
         el.style.background = binding.value     
    }
})
app.provide('guide', 'Vue 3 Guide')

let rootVm  = app.mount('#app')   //与大多数应用方法不同的是，mount 不返回应用本身。相反，它返回的是根组件实例
