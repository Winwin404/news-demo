<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="50px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全选" :value="null"></el-option>
            <el-option 
              :label="channel.name" 
              :value="channel.id" 
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dataRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        查询到的结果共有：{{tableData.length}}条，详情如下：
      </div>
      <el-table
        stripe
        :data="tableData"
        style="width: 100%"
        size="mini"
        class="list-table">
        <el-table-column
          label="封面">
          <template slot-scope="imagescope" >
            <el-image :src="imagescope.row.cover" lazy>
              <!-- <div slot="error" class="image-slot">
                加载中<i class="el-icon-picture-outline">...</i>
              </div> -->
            </el-image>
            <!-- <img :src="imagescope.row.cover" alt="" class="cover-class"  v-if="imagescope.row.cover">
            <img src="./pic_bg.png" alt="" class="cover-class"  v-else> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="tableDataStatus[scope.row.status].type">
              {{tableDataStatus[scope.row.status].text}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="oprScope">
            <el-button
              size="mini"
              type="primary" 
              icon="el-icon-edit" 
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete" 
              circle
              @click="onDeleteArticle(oprScope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
        :page-size="pageSize"
        @current-change="onChangePage">
      </el-pagination>
    </el-card>
  </div>

</template>

<script>
// import { getArticles } from '@/api/article'  接口挂了，使用静态数据展示
import { getArticleChannels } from '@/api/article'

  export default {
    name : 'ArticleIndex',
    data() {
      return {
        form: {
        },
        tableData: [
          {
            cover: 'https://i1.hdslb.com/bfs/face/d3fcf91a8988285fe19b47e8cd29bfe9d06cf27b.jpg@140w_140h_1c.webp',
            name: 'WINWIN',
            date: '2016-05-02',
            status: 0,
            opration: '删除'
          }, 
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'JACKSON',
            date: '2016-01-02',
            status: 3,
            opration: '新增'
          },
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'MARK',
            date: '2020-05-02',
            status: 4,
            opration: '新增'
          }, 
          {
            cover: 'https://i1.hdslb.com/bfs/face/d3fcf91a8988285fe19b47e8cd29bfe9d06cf27b.jpg@140w_140h_1c.webp',
            name: 'LUCAS',
            date: '2016-05-02',
            status: 1,
            opration: '删除'
          }, 
          {
            cover: 'https://element.eleme.cn/static/guide.0a8462c.png',
            name: 'TEN',
            date: '2021-05-02',
            status: 2,
            opration: '删除'
          },           
          {
            cover: '',
            name: 'CHENLE',
            date: '2021-05-02',
            status: 2,
            opration: '删除'
          }, 
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'RENJUN',
            date: '2016-01-02',
            status: 3,
            opration: '新增'
          },
          {
            cover: '',
            name: 'YUTA',
            date: '2020-05-02',
            status: 4,
            opration: '新增'
          },
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'MARK',
            date: '2020-05-02',
            status: 4,
            opration: '新增'
          }, 
          {
            cover: 'https://i1.hdslb.com/bfs/face/d3fcf91a8988285fe19b47e8cd29bfe9d06cf27b.jpg@140w_140h_1c.webp',
            name: 'LUCAS',
            date: '2016-05-02',
            status: 1,
            opration: '删除'
          }, 
          {
            cover: 'https://element.eleme.cn/static/guide.0a8462c.png',
            name: 'TEN',
            date: '2021-05-02',
            status: 2,
            opration: '删除'
          },           
          {
            cover: '',
            name: 'CHENLE',
            date: '2021-05-02',
            status: 2,
            opration: '删除'
          }, 
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'RENJUN',
            date: '2016-01-02',
            status: 3,
            opration: '新增'
          },
          {
            cover: '',
            name: 'YUTA',
            date: '2020-05-02',
            status: 4,
            opration: '新增'
          },
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'JACKSON',
            date: '2016-01-02',
            status: 3,
            opration: '新增'
          },
          {
            cover: 'https://element.eleme.cn/static/component.bd3411b.png',
            name: 'MARK',
            date: '2020-05-02',
            status: 4,
            opration: '新增'
          }, 
          {
            cover: 'https://i1.hdslb.com/bfs/face/d3fcf91a8988285fe19b47e8cd29bfe9d06cf27b.jpg@140w_140h_1c.webp',
            name: 'LUCAS',
            date: '2016-05-02',
            status: 1,
            opration: '删除'
          }
        ],
        tableDataStatus: [
          { type : '', text : '草稿' },
          { type : 'warning', text : '待审核' },
          { type : 'success', text : '审核通过' },
          { type : 'info', text : '审核失败' },
          { type : 'danger', text : '已删除' }
        ],
        status: null,
        pageSize: 3,
        channels: [],
        channelId: null,
        dataRange: null
      }
    },
    created() {
      // this.loadArticles()
      this.loadArticleChannels()
    },
    methods: {
      onSubmit() {
        console.log('状态status:' + this.form.status)
        console.log('频道channel:' + this.channelId)
        console.log('日期范围dataRange:' + this.dataRange)
        // this.dataRange ? console.log(this.dataRange[0]) : console.log("null")  日期选择清空之后需要做非空判断
      },
      // loadArticles () {
      //   getArticles({
          // page,
          // status : this.form.status
      // }).then( res => {
      //     console.log(res);
      //   })
      // }
      onChangePage (res) {
        console.log(`当前页：${res}`);
      },
      loadArticleChannels () {
        getArticleChannels().then( res => {
          // console.log(res)
          this.channels = res.data.data.channels
        })
      },
      onDeleteArticle (articleId) {
        console.log('删除文章ID：' + articleId);
        this.$confirm('此操作将删除文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(articleId,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除该文章'
          })
        })
      }

    },
  }
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 20px;
}
.cover-class {
  width: 70px;
  background-size: cover;
}
</style>