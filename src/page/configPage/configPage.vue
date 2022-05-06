<template>
  <div class="configPage">
    <!-- <el-button type="primary" @click="add">添加</el-button> -->
    <!-- <v-add :info="info"></v-add>
    <v-list ref="list" @edit="edit"></v-list> -->
    <div class="phone">
      <label>全国联系电话： </label>
      <el-input v-model="phone" :rows="6" />
      <el-button type="primary" @click="submitPhone()">修改</el-button>
    </div>
    <div class="contact">
      <div id="wangEdit"></div>
      <el-button type="primary" style="margin-top:20px" @click="submitContact"
        >提交</el-button
      >
    </div>
  </div>
</template>
<script>
// import vAdd from "./components/add";
// import vList from "./components/list";
// import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
import BASE_URL from "@/utils/env";
import fetchData from "@/utils/fetchData";
import { successAlert } from "@/utils/alert";

export default {
  props: [],
  components: {
    // vAdd,
    // vList
  },
  data() {
    return {
      phone: "",
      contactDetail: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async submitContact() {
      let res = await fetchData({
        url: "/contact_us/update",
        data: {
          contactDetail: this.contactDetail
        }
      });
      if (!res) return;
      this.getData();
      successAlert(res.outMsg);
    },
    async submitPhone() {
      let res = await fetchData({
        url: "/server_config/update",
        data: {
          type: "SERVICE_PHONE",
          value: this.phone
        }
      });
      if (!res) return;
      successAlert(res.outMsg);
      this.getData();
    },
    async getData() {
      let res = await fetchData({
        url: "/server_config/list",
        data: {
          type: "SERVICE_PHONE"
        }
      });
      let resCon = await fetchData({
        url: "/contact_us/list"
      });
      if (!res && !resCon) return;
      this.wangEditor(resCon.data.value);
      this.phone = res.data[0].value;
    },
    wangEditor(info) {
      // 加载富文本
      const editor = new E("#wangEdit");
      editor.config.height = 300;
      //图片处理
      editor.config.uploadImgServer = BASE_URL + "/attachment/rtf_upload";
      editor.config.uploadFileName = "files";
      editor.config.uploadImgHooks = {
        // 图片上传并返回了结果，图片插入已成功
        success: function(xhr) {
          console.log("success", xhr);
        }
      };
      // 配置 onchange 回调函数
      editor.config.onchange = newHtml => {
        this.contactDetail = newHtml;
      };
      editor.create();
      if (info) {
        editor.txt.html(info);
      }
    }
  },

  mounted() {}
};
</script>
<style scoped lang="less">
.configPage {
  .el-input {
    width: 200px !important;
  }
  #wangEdit {
    margin-top: 30px;
    width: 400px;
  }
}
</style>
