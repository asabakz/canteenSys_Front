import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
export default function m_instance() {
    const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance
    // 获取全局属性
    const global = appContext.config.globalProperties
    return {
        global,
        proxy
    }
}
