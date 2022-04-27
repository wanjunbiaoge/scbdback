<template>
  <div class="user">
    <el-button type="primary" @click="add">添加</el-button>
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
    updateData() {
      this.$refs.list.getTableData();
    }
  },

  mounted() {}
};
</script>
<style lang="less" scoped>
.news {
}
</style>
