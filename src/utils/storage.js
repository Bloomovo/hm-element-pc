const KEY = 'my-token-element-pc'

// 直接用按需导出，可以导出多个
// 但是按需导出，导入时必须 import { getToken } from '模块名导入' 导入时必须使用相同的名字

// 获取
export const getToken = () => {
  localStorage.getItem(KEY)
}

// 设置
export const setToken = (newKEY) => {
  localStorage.setItem(KEY, newKEY)
}

// 删除
export const delToken = () => {
  localStorage.removeItem(KEY)
}
