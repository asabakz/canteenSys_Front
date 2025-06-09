import { createApp } from 'vue'
// import './style.css'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { zhCn } from 'element-plus/es/locales.mjs'
import comfirm_dia from './tools/comfirm_dia'
import * as echarts from 'echarts'
const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia).use(ElementPlus, { locale: zhCn }).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//全局注册
app.config.globalProperties.$comfirmDia = comfirm_dia
app.config.globalProperties.$echarts = echarts;