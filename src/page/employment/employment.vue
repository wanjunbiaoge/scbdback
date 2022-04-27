<template>
  <div class="employment">
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
        url: "/employment/list",
        data: {}
      });
      this.wangEditor(res.data[0].employmentDetail);
    },
    async submit() {
      let res = await fetchData({
        url: "/employment/update",
        data: {
          employmentDetail: this.wangEditorInner
        }
      });
      if (res) {
        successAlert(res.outMsg);
      }
    },
    wangEditor(info) {
      // 加载富文本
      const editor = new E("#wangEdit");
      editor.config.height = 600;
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
