import request from '@/utils/request.js'

// 得到 article 数据
export const getArticleList = (data) => {
  return request.get('/admin/interview/query', {
    params: data
  })
}
