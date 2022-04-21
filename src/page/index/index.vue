<template>
  <div>
    <el-container class="wrap">
      <el-header class="beidoutitle">
        四川北斗卫星导航平台有限公司官网后台管理系统
      </el-header>
      <el-container>
        <el-aside width="200px" class="left">
          <el-row>
            <el-col>
              <!-- 
              default-active 当前激活的菜单
              background-color 菜单背景颜色
              text-color  文字颜色
              active-text-color 当前选中的菜单文字颜色
             -->
              <el-menu
                default-active="/slideshow"
                class="el-menu-vertical-demo"
                active-text-color="#ffd04b"
                unique-opened
                router
              >
                <!-- <el-menu-item index="/">
                  <span>首页</span>
                </el-menu-item> -->
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
              title: "首页关于我们",
              url: "/indexAboutUs"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.$router.push("slideshow");
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
}

.left {
}
</style>
