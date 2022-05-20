<template>
  <div class="indexAboutUs">
    <div id="wangEdit"></div>
    <el-button type="primary" style="margin-top:20px" @click="submit"
      >提交</el-button
    >
  </div>
</template>
<script>
import E from "wangeditor";
import BASE_URL from "@/utils/env";
import { successAlert, warningAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
export default {
  created() {},
  data() {
    return {
      wangEditorInner: ""
    };
  },
  methods: {
    async getData() {
      let res = await fetchData({
        url: "/server_config/list/CORPORATE_CULTURE"
      });
      this.wangEditor(res.data.value);
    },
    async submit() {
      let res = await fetchData({
        url: "/server_config/update",
        data: {
          type: "CORPORATE_CULTURE",
          value: this.wangEditorInner
        }
      });
      if (res.outCode === 1) {
        successAlert(res.outMsg);
      } else {
        warningAlert(res.outMsg);
      }
    },
    wangEditor(info) {
      // 加载富文本
      const editor = new E("#wangEdit");
      editor.config.height = 600;
      //图片处理
      editor.config.uploadImgServer = BASE_URL + "/attachment/rtf_upload";
      editor.config.uploadFileName = "files";
      editor.config.uploadImgHeaders = {
        "x-access-token": sessionStorage.getItem("x-access-token") // 设置请求头
      };
      // 配置 onchange 回调函数
      editor.config.onchange = newHtml => {
        this.wangEditorInner = newHtml;
      };
      editor.create();
      if (info) {
        editor.txt.html(info);
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.indexAboutUs {
  #wangEdit {
    margin-top: 30px;
    width: 1300px;
  }
}
</style>
