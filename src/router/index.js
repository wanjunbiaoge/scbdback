import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)

// 封装
// function changeEnter(path, next) {
//   // 取出你能去的地址
//   let routerUrl = store.state.userInfo.menus_url
//   if (routerUrl.includes(path)) {
//     next()
//   } else {
//     next("/")
//   }
// }

export const indexRouter = [{
    path: "slideshow",
    name: "轮播图管理",
    component: () => import("../page/home/slideshow/slideshow"),
  },
  {
    path: "indexAboutUs",
    name: "关于我们",
    component: () => import("../page/home/indexAboutUs/indexAboutUs"),
  },
  {
    path: "application",
    name: "应用领域",
    component: () => import("../page/home/application/application"),
  },
  {
    path: "aboutPlatform",
    name: "关于平台",
    component: () => import("../page/home/aboutPlatform/aboutPlatform"),
  },
  {
    path: "solution",
    name: "解决方案",
    component: () => import("../page/home/solution/solution"),
  },
  {
    path: "successCase",
    name: "成功案例",
    component: () => import("../page/home/successCase/successCase"),
  },
  {
    path: "qualifications",
    name: "公司资质",
    component: () => import("../page/aboutUs/qualifications/qualifications"),
  },
]


const router = new Router({
  routes: [
    // {
    //   path: "/login",
    //   component: () => import('../page/login/login')
    // },
    {
      path: "/",
      component: () => import("../page/index/index"),
      children: [
        ...indexRouter
      ]
    }
  ]
})
// 登录拦截
// router.beforeEach((to, from, next) => {
// 1、如果去的是登录页，那么就直接进
// if (to.path == "/login") {
//   next()
//   return
// }
// // 2、如果去的是其他页面，就验证仓库里面的token是否存在，如果存在表示已经登陆过了可以放行
// if (store.state.userInfo.token) {
//   next()
//   return
// }
// next("/login")
// })


export default router
