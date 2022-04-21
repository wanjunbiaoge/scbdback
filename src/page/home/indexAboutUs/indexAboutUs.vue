<template>
  <div class="indexAboutUs">
    <div id="wangEdit"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import BASE_URL from "@/utils/env";
export default {
  created() {},
  data() {
    return {};
  },
  mounted() {
    // 加载富文本
    const editor = new E("#wangEdit");
    editor.config.height = 500;
    editor.config.uploadImgServer = BASE_URL + "/attachment/upload";
    editor.create();  
    editor.txt.html("111111111111");
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
