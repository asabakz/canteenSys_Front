import { reactive } from 'vue';

export default function m_Dialog() {

    const m_dia_set = reactive({
        title: '新增',
        visible: false,
        width: 654,
        height: 354
    })

    const onClose = () => {
        m_dia_set.visible = false;
    }
    const onConfirm = () => {
        m_dia_set.visible = false;
    }
    const dia_display = () => {
        m_dia_set.visible = true;
    }
    return {
        m_dia_set,
        onClose,
        onConfirm,
        dia_display
    }
}