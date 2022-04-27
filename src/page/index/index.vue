<template>
  <div>
    <el-container class="wrap">
      <el-header class="beidoutitle">
        四川北斗卫星导航平台有限公司官网后台管理系统
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="left">
          <el-row>
            <el-col>
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                active-text-color="#ffd04b"
                unique-opened
                router
                background-color="#545c64"
                text-color="#fff"
              >
                <div v-for="item in menus" :key="item.id">
                  <!-- 目录 -->
                  <el-submenu :index="item.id + ''" v-if="item.children">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        v-for="i in item.children"
                        :key="i.id"
                        :index="i.url"
                      >
                        <span>{{ i.title }}</span>
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <!-- 菜单 -->
                  <el-menu-item :index="item.url" v-else>
                    <span>{{ item.title }}</span>
                  </el-menu-item>
                </div>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      menus: [
        {
          id: 1,
          title: "首页管理",
          url: "/",
          children: [
            {
              id: 2,
              title: "轮播图管理",
              url: "/slideshow"
            },
            {
              id: 3,
              title: "关于我们",
              url: "/indexAboutUs"
            },
            {
              id: 4,
              title: "应用领域",
              url: "/application"
            },
            {
              id: 5,
              title: "关于平台",
              url: "/aboutPlatform"
            },
            {
              id: 6,
              title: "解决方案",
              url: "/solution"
            },
            {
              id: 7,
              title: "成功案例",
              url: "/successCase"
            }
          ]
        },
        {
          id: 11,
          title: "关于我们",
          url: "/",
          children: [
            {
              id: 12,
              title: "公司简介",
              url: "/indexAboutUs"
            },
            {
              id: 13,
              title: "企业文化",
              url: "/culture"
            },
            {
              id: 14,
              title: "公司资质",
              url: "/qualifications"
            }
          ]
        },
        {
          id: 21,
          title: "产品展示",
          url: "/product"
        },
        {
          id: 31,
          title: "新闻",
          url: "/news"
        },
        {
          id: 41,
          title: "招聘",
          url: "/employment"
        },
        {
          id: 51,
          title: "留言板",
          url: "/messageBoard"
        },
        {
          id: 61,
          title: "用户管理",
          url: "/user"
        }
      ]
    };
  },
  created() {
    // this.$router.push("slideshow");
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100vh;
  .beidoutitle {
    font-size: 30px;
    line-height: 60px;
    background-color: #ccc;
  }
  .el-row,
  .el-col,
  .el-menu {
    height: 100% !important;
  }
}

.left {
}
</style>
