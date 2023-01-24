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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import { getStatistics3 } from '@/api/index.js'
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
  current.value = type;
  getData()
}

//渲染完再调用echart组件
onMounted(() => {
  var chartDom = document.getElementById('chart');
  myChart = echarts.init(chartDom)
  getData();
})

var myChart = null;
function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  //定义加载loading状态
  myChart.showLoading()
  // option && myChart.setOption(option);
  getStatistics3(current.value).then(res => {
    console.log(res);
    option.xAxis.data = res.x
    option.series[0].data = res.y
    myChart.setOption(option)
    console.log(current.value);
  }).finally(() => {
    myChart.hideLoading()
  })


  //一个小bug
  //如果离开这个页面不销毁echart 就会出现白屏现象
  onBeforeUnmount(() => {
    if (myChart) echarts.dispose(myChart);
  })
}
</script>

<style scoped>

</style>