<template>
  <div>
    <el-row :gutter="20" >
      <el-col :xs="12" :sm="6" :md="6"  :lg="4" 
        v-for="(image, index) in images" :key="index"
        class="img-container"
        @click.native="selected = index"
      >
        <el-image fit="cover" :src="image"  style="padding-bottom:20px;"></el-image>
        <div class="selected" v-if="isSelected && selected === index"></div>
        <div class="img-action" v-if="isAddOpr">
          <el-button 
            type="warning" 
            :icon="isCollect ? 'el-icon-star-on' : 'el-icon-star-off'" 
            circle
            size="small"
            @click="isCollect=!isCollect"
          >
          <!-- :loading="isLoading" 添加在加载的 图标，防止用户多次点击 -->
          </el-button>
          <el-button 
            type="danger" 
            icon="el-icon-delete" 
            circle 
            size="small"
            @click="onDelete(index)"
          ></el-button>
          <!-- <i :class="{
            'el-icon-star-on': isCollect,
            'el-icon-star-off': !isCollect
            }"
            @click="isCollect=!isCollect"
          > </i>
          <i :class="{
            'el-icon-delete-solid': isDelete,
            'el-icon-delete': !isDelete
            }"
            @click="isDelete=!isDelete"
          > </i> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ImgList',
  data() {
    return {
      // isDelete: false,
      isCollect: false,
      images: [
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image',
        'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/01f2673fce1dab60d4b4d5906d81e329~300x300.image'
      ],
      selected: null
    }
  },
  props: {
    isAddOpr: {
      type: Boolean,
      default: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onDelete (index) {
      this.$confirm('此操作将删除图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( () => {
        this.images.splice(index,1)
        console.log('已删除图片序号：'+index);
      })
    }
  },
}
</script>

<style scoped lang="less">
.img-container {
  position: relative;
}
.img-action {
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  background-color: rgba(143, 143, 143,0.5);

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  color: yellow;
}
.selected {
  background: url('./selected.png') no-repeat;
  background-size: cover;
  margin: 15px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>