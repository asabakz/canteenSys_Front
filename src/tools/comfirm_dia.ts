import { ElMessageBox } from 'element-plus'
export default function comfirm_dia(text: string) {
    return new Promise((resolve, reject) => {
        const open = () => {
            ElMessageBox.confirm(
                text,
                '系统提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    resolve(true)
                })
                .catch(() => {
                    reject(false)
                })
        }
        open()
    });
}
