<template>
  <div class="product">
    <el-button type="primary" @click="add">添加</el-button>
    <span style="marginLeft:300px">产品图片大小：300×200，</span>
    <v-add ref="add" :info="info" @updateData="updateData"></v-add>
    <v-list @edit="edit" ref="list"></v-list>
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
    },
    updateData(type) {
      this.$refs.list.getTableData(type);
    },
    del(id) {
      this.$refs.list.del(id);
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.add.getOne(id);
    }
  },

  mounted() {}
};
</script>
<style scoped></style>
