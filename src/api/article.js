import request from '@/utils/request.js'

// 得到 article 数据
export const getArticleList = (data) => {
  return request.get('/admin/interview/query', {
    params: data
  })
}

// 添加面经
export const createArticle = data => {
  return request.post('/admin/interview/create', data)
}
