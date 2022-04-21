import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

//开发环境
let baseUrl = '/api'
Vue.prototype.$imgUrl = "http://localhost:8080/"

//上线环境
// let baseUrl = ''
// Vue.prototype.$imgUrl = ''


//响应拦截
axios.interceptors.response.use((res) => {
  console.group('======本次请求路径是' + res.config.url)
  console.log(res);
  console.groupEnd('======请求结束')

  return res
})


// ==========goods商品管理=============
// 添加
export const goodsAdd = (form) => {
  // 因为涉及到了图片，所以使用模拟form表单
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// 列表
export const goodsList = (form) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: form
  })
}
// 删除
export const goodsDel = (form) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const goodsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const goodsEdit = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  })
}
// 总条数
export const goodsTotal = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  })
}