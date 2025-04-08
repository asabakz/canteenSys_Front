import { ref } from 'vue';
import { getSelectListApi } from '../../api/dish';

export default function SelectMenu() {
    // 下拉数据
    const selectData = ref([]);

    // 获取数据
    const getSelect = async () => {
        let res = await getSelectListApi();
        if (res && res.code == 200) {
            selectData.value = res.data;
        }
    };

    return {
        selectData,
        getSelect,
    };
}
