<template>
  <el-form-item style="margin: 20px 0px" label-width="80px" size="normal">
    <el-button style="padding: 0px 50px" type="primary" @click = "charts('0')">
      日统计
    </el-button>
    <el-button style="padding: 0px 50px" type="success" @click = "charts('1')">
      月统计
    </el-button>
    <el-button style="padding: 0px 50px" type="danger" @click = "charts('2')">
      年统计
    </el-button>
  </el-form-item>

  <el-form>
    <div ref="myChart" style="width: 100%; height: 400px;"></div>
    <div ref="myChart1" style="width: 100%; height: 350px;"></div>
  </el-form>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import m_instance from '../../hooks/m_instance';
  import { getTotalApi } from '../../api/order';

  const { global } = m_instance();
  const myChart = ref<HTMLElement>();
  const myChart1 = ref<HTMLElement>();

  const charts = async (type:string) => {
    const echartInstance = global.$echarts.init(myChart.value);
    const echartInstance1 = global.$echarts.init(myChart1.value);

    let option = reactive({
      title: {
        text: "柱状图"
      },
      xAxis: {
        type: "category",
        data: [],
        axisLabel: {
          show: true,
          interval: 0,
        }
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [],
          type: "bar",
          itemStyle: {
            normal: {
              color: function (params: any) {
                var colorList = [
                  "#00A3E0", "#FFAF00", "#FFFCb8", "#CCCCCC", "#BBFFAA", "#749BF3", "#ca8622",
                  "#00A3E0", "#FFAF00", "#FFFCb8", "#CCCCCC", "#BBFFAA", "#749BF3", "#ca8622",
                  "#00A3E0", "#FFAF00", "#FFFCb8", "#CCCCCC", "#BBFFAA", "#749BF3", "#ca8622",
                  "#00A3E0", "#FFAF00", "#FFFCb8", "#CCCCCC", "#BBFFAA", "#749BF3", "#ca8622"
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(32, 33, 36, .7)',
        borderColor: 'rgba(32, 33, 36, .2)',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
          fontSize: '12'
        }
      }
    });

    let option1 = reactive({
      title: {
        text: "折线图"
      },
      xAxis: {
        type: "category",
        data: [],
        axisLabel: {
          show: true,
          interval: 0,
        }
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [],
          type: "line",
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(32, 33, 36, .7)',
        borderColor: 'rgba(32, 33, 36, .2)',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
          fontSize: '12'
        }
      }
    });
    
    let res = await getTotalApi(type)
    if (res && res.data) {
        console.log(res)
        option.xAxis.data = res.data.names
        option.series[0].data = res.data.values
        option1.xAxis.data = res.data.names
        option1.series[0].data = res.data.values
    }
    
    echartInstance.setOption(option);
    echartInstance1.setOption(option1);
  };

  onMounted(() => {
    charts('0');
  });
</script>

<style lang="scss" scoped></style>
