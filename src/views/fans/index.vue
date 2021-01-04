<template>
  <div class="fans-container">
    纯echarts示例
    <div class="map-demo" ref="main">
      map-demo
    </div>
    <map-demo/>
    <bmap-demo/>
  </div>
</template>

<script>
import MapDemo from './component/mapdemo'
import BmapDemo from './component/bmapdemo'
// import echarts from 'echarts'
const echarts = require('echarts')

export default {
  name: 'FansIndex',
  components: {
    MapDemo,
    BmapDemo
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.main)

    // 指定图表的配置项和数据
    const option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
}
</script>

<style scoped>
.map-demo{
  width: 400px;
  height: 400px;
}
</style>