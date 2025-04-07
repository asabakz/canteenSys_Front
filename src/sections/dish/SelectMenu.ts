import { ref } from 'vue';
import { GetSelectApi } from '../../api/category';

export default function SelectMenu() {
    // 下拉数据
    const selectData = ref([]);

    // 获取数据
    const getSelect = async () => {
        let res = await GetSelectApi();
        if (res && res.code == 200) {
            selectData.value = res.data;
        }
    };

    return {
        selectData,
        getSelect,
    };
}
