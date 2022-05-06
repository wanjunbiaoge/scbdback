<template>
  <div class="news">
    <el-button type="primary" @click="add">添加</el-button>
    <span style="marginLeft:300px">图片大小：300×200，</span>
    <v-add ref="add" :info="info" @updateData="updateData"></v-add>
    <v-list ref="list" @edit="edit"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true
      }
    };
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.add.getOne(id);
    },
    updateData(type) {
      this.$refs.list.getTableData(type);
    }
  },

  mounted() {}
};
</script>
<style lang="less" scoped>
.news {
}
</style>
