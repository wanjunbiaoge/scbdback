<template>
  <div class="login">
    <div class="box">
      <h3 class="center">登录</h3>
      <div>
        <div class="marginBottom">
          <el-input
            placeholder="请输入内容"
            v-model="form.account"
            clearable
          ></el-input>
        </div>
        <div class="marginBottom">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            clearable
            show-password
          ></el-input>
        </div>
        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
    <div class="logo">
      <img src="/static/logo_login.png" alt="" srcset="" />
    </div>
    <div class="sate">
      <img src="/static/satellite.png" alt="" srcset="" />
    </div>
  </div>
</template>
<script>
import { successAlert, warningAlert } from "@/utils/alert";
import fetchDataLogin from "@/utils/fetchDataLogin";
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      let res = await fetchDataLogin({
        url: "/login/enter",
        data: this.form
      });
      if (res.outCode == 1) {
        successAlert(res.outMsg);
        this.$router.push("/slideshow");
      } else {
        warningAlert("登陆失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(/static/left_login.png) left top no-repeat,
    url(/static/right_login.png) right top no-repeat;
  background-size: 74% 100%, 26% 100%;
}
.box {
  width: 22%;
  height: 260px;
  background: white;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-5%, -50%);
}

.center {
  text-align: center;
}

.marginBottom {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.logo {
  img {
    width: 400px;
    margin-left: 30px;
    margin-top: 30px;
  }
}
.sate {
  width: 74%;
  img {
    display: inherit;
    margin: 0 auto;
  }
}
</style>
