<template>
    <el-menu
      class="aside-menu"
      default-active="/"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router 
      :collapse="isCollapse"
    >
    <!-- 这里使用element的Menu Attribute属性链接到index路由 -->
      <el-menu-item index="/">
        <i class="iconfont iconhome"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont iconarticle-fill"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconimage"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconzixundianji"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconfans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <i class="iconfont iconsetting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    name : 'AppAside',
    props : {
      isCollapse : Boolean
    }
  }
</script>

<style scoped lang="less">
.aside-menu {
  .iconfont{
    padding: 0 8px;
  }
}

</style>