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
            @click="openDrawer('add')"
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
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        >
        <span>我来啦!</span>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
export default {
  name: 'article-page',
  data () {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      // isshow
      drawer: false,
      // 打开方向
      direction: 'rtl'
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
    openDrawer (type, id) {
      console.log(type, id)
      this.drawer = true
    },
    // 关闭抽屉
    handleClose (done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
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
