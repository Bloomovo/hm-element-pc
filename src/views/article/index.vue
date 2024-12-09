<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{total}} 条记录</span>
          <el-button
            @click="openDrawer('add', 1)"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round>
            添加面经
          </el-button>
        </div>
      </template>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="stem" label="标题" width="400"></el-table-column>
        <el-table-column prop="creator" label="作者">
        </el-table-column>
        <el-table-column prop="likeCount" label="点赞">
        </el-table-column>
        <el-table-column prop="views" label="浏览数"> </el-table-column>
        <el-table-column prop="createdAt" label="更新时间" width="200"> </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-view" @click="openDrawer('preview', row.id)"></i>
              <i class="el-icon-edit-outline" @click="openDrawer('edit', row.id)"></i>
              <i class="el-icon-delete" @click="del(row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        >
      </el-pagination>

      <!-- 抽屉组件 -->
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size:="70%"
        >
        <div v-if="drawerType === 'preview'" class="article-preview">
          <h5>{{ form.stem }}</h5>
          <div v-html="form.content"></div>
        </div>
        <el-form v-else ref="form" label-width="80px" :model="form" :rules="rules">
          <el-form-item label="标题" prop="stem">
            <el-input  placeholder="输入面经标题" v-model="form.stem"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <quill-editor v-model="form.content" @blur="$refs.form.validateField('content')"></quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, createArticle, removeArticle, getArticleDetail, updateArticle } from '@/api/article.js'
import quillEditor from '@/utils/quill'
export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data () {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      // isshow
      drawer: false,
      // 打开方向
      direction: 'rtl',
      drawerType: '',
      form: {
        content: '', // 内容
        stem: '' // 标题
      },
      rules: {
        stem: [{ require: true, message: '请输入面经标题', trigger: 'blur' }],
        content: [{ require: true, message: '请输入面经内容', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const { data } = await getArticleList({
        current: this.current,
        pageSize: this.pageSize
      })
      this.total = data.total
      this.list = data.rows
    },
    // 页码改变时
    handleCurrentChange (index) {
      // 重新渲染数据
      this.current = index
      this.initData()
    },
    // 打开抽屉
    async openDrawer (type, id) {
      this.drawer = true
      this.drawerType = type

      // form 文章回显
      if (type !== 'add') {
        const res = await getArticleDetail(id)
        this.form = {
          ...res.data
        }
      }
    },
    // 关闭抽屉
    handleClose (done) {
      this.$confirm('确认关闭？').then(_ => {
        // 清空内容
        // 不能是预览
        if (this.drawerType !== 'preview') {
          this.$refs.form.resetFields()
        }
        done()
      }).catch(_ => {})
    },
    // 添加面经和修改面经
    async submit () {
      try {
        // 校验
        await this.$refs.form.validate()
        // 添加面经
        if (this.drawerType === 'add') {
          // 请求
          await createArticle(this.form)
          // 提示
          this.$message.success('添加成功')
        } else if (this.drawerType === 'edit') {
          const { id, stem, content } = this.form
          // 修改
          await updateArticle({ id, stem, content })
          // 提示
          this.$message.success('修改成功')
        }
        // 修改面经

        // 关闭重置内容
        this.$refs.form.resetFields()
        this.drawer = false
        // 重新渲染 新数据在第一页 返回第一页
        this.current = 1
        this.initData()
      } catch (e) {
        this.$message(e)
      }
    },
    // 删除面经
    async del (id) {
      // 删除
      await removeArticle(id)
      // 提示
      this.$message.success('删除成功')
      // 重新渲染
      this.initData()
    }
  },
  computed: {
    drawerTitle () {
      let title = '大标题'
      if (this.drawerType === 'add') title = '添加面经'
      else if (this.drawerType === 'preview') title = '面经预览'
      else title = '修改面经'
      return title
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
