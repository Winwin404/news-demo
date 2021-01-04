<template>
  <div class="publish-container">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="publish-form" :model="article" label-width="80px" label-position="left" :rules="publishRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh" 
            placeholder="请输入文章内容" 
            height="300"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="-1">自动</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">1张</el-radio>
            <el-radio :label="3">3张</el-radio>
          </el-radio-group>
        <template v-if="article.cover.type > 0">
          <cover-img
            v-for=" num in article.cover.type"
            :key=" num "
            v-model="article.cover.images[num-1]"
          />
          <!-- <cover-img
            v-for=" num in article.cover.type"
            :key=" num "
            @update-cover="onUpdateCover(num, $event)"
          /> -->
        </template>
        </el-form-item>
        <el-form-item label="频道" prop="channelId">
          <el-select v-model="article.channelId" placeholder="请选择频道">
            <el-option 
              :label="channel.name" 
              :value="channel.id"
              v-for="( channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button  @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels } from '@/api/article'
// import { ElementTiptap } from 'element-tiptap'
import {
  ElementTiptap,
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  HorizontalRule,
  Fullscreen
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import CoverImg from './component/coverimg'

  export default {
    name : 'PublishIndex',
    components: {
      'el-tiptap': ElementTiptap,
      CoverImg
    },
    data() {
      return {
        channels: [],
        article: {
          title: '',
          content: '',
          cover: {
            type: 1,
            images: []
          },
          channelId: null,
          draft: false
        },
        publishRules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入文章内容', trigger: 'blur' },
            { validator (rule, value, callback) {
                console.log('content validator')
                if (value === '<p></p>' || value === "" ) {
                  callback(new Error('请输入文章内容'));
                } else {
                  callback();
                }
              }
            }
          ],
          channelId: [
            { required: true, message: '请选择频道', trigger: 'blur' }
          ]
        },
        articleData: [],
        tableData: [
          {
            title: 'WINWIN',
            content: '1-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 3,
            draft: false
          }, 
          {
            title: 'LUCAS',
            content: '2-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 5,
            draft: false
          }, 
          {
            title: 'KUN',
            content: '3-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 7,
            draft: false
          }, 
          {
            title: 'YANGYANG',
            content: '4-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 7,
            draft: false
          }, 
          {
            title: 'JAEMIN',
            content: '5-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 5,
            draft: false
          },
          {
            title: 'JENO',
            content: '2-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 5,
            draft: false
          }, 
          {
            title: 'KAI',
            content: '3-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 7,
            draft: false
          }, 
          {
            title: 'TAIMIN',
            content: '4-----------WAY V !!!!!!!! I LOVE YOU, GUYS!!!!!',
            cover: {
              type: 0,
              images: []
            },
            channelId: 7,
            draft: false
          }
        ],
        extensions: [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 5 }),
          new Bold({ bubble: true }), // render command-button in bubble menu.
          new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          // 请求后端数据接口将 base64 编码的文本转为 在线的图片链接. 需要使用 element-tiptap 提供的image 类中的对象方法 实现
          new Image(
            // {
            //   uploadRequest (file) {
            //     const fd = new FormData
            //     fd.append('image', file)
            //     return uploadImage(fd).then( res => {
            //       return res.data.data.url // 使用axios发起请求，返回后端生成的 url 地址
            //     })
            //   }
            // }// element-tiptap 图片的上传方法，返回1个 promise<url>
          ),
          new HorizontalRule(), // 华丽的分割线
          new Fullscreen()
          
        ],
        // editor's content
        // content: `
        //   <h1>Heading</h1>
        //   <p>This Editor is awesome!</p>
        // `
      }
    },
    methods: {
      loadChannels () {
        getArticleChannels().then( ( { data } ) => {
          // console.log(data)
          this.channels = data.data.channels
          // console.log(this.channels);
        })
      },
      onPublish (draft = false) {
        this.$refs['publish-form'].validate( valid => {
          if (!valid) {
            // 验证失败
            console.log('error submit!!')
            return false;
          } else {
            console.log('submit success!!!')
            if (this.$route.query.id) {
              const articleId = this.$route.query.id
              this.tableData.slice(articleId,1,this.article)
              //这里是更新编辑的文章内容接口——更新
              // console.log(this.tableData[articleId])
              this.$router.push('/article')
            } else {
              //这里是新发布的文章内容接口——新增
              if (draft) {
                this.article.draft = draft
                this.articleData.push(this.article)
                console.log(this.articleData)
                console.log('存入草稿')
              } else {
                this.articleData.push(this.article)
                // console.log(this.articleData)
              }
            }
          }
        })
      },
      onUpdateCover(num, url) {
        this.article.cover.images[num-1] = url
        console.log(this.article.cover.images)
      }
    },
    created() {
      this.loadChannels()
      if (this.$route.query.id) {
        // console.log(this.$route.query.id)
        // console.log(this.tableData[this.$route.query.id])
        this.article = this.tableData[this.$route.query.id]
      }
    },
  }
</script>

<style scoped >

</style>