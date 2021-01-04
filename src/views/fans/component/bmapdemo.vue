<template>
  <div>
    纯粹的百度地图
    <div class="container" id="container"></div>
  </div>
</template>

<script>
require("echarts/extension/bmap/bmap")

export default {
  name: 'BmapDemo',
  mounted() {
    var map = new window.BMap.Map("container")
    var point = new window.BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  },
}
</script>

<style scoped>
.container {
  width: 400px;
  height: 400px;
}
</style>