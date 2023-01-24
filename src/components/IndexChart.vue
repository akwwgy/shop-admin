<template>
  <el-card shadow="hover">
    <template #header>
      <div class=" flex justify-between">
        <span class="text-sm">订单统计</span>
        <div>
          <el-check-tag v-for="(item, index) in options" :checked="current == item.value" style="margin-right 8px"
            @click="handleChoose(item.value)">
            {{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <!-- card-body -->
    <div id="chart" style="width:100%;height:300px"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
const current = ref("week")
const options = [{
  text: "近一个月",
  value: "month"
}, {
  text: "近一周",
  value: "week"
},
{
  text: "近24小时",
  value: "hour"
}]

const handleChoose = (type) => {

}
var myChart = null;
//渲染完再调用echart组件
onMounted(() => {
  var chartDom = document.getElementById('chart');
  myChart = echarts.init(chartDom)
  var option;
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  option && myChart.setOption(option);
})
</script>

<style scoped>

</style>