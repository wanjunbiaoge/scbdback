<template>
  <div class="aboutPlatform">
    <el-button type="primary" @click="add">编辑</el-button>
    <v-add :info="info" @updateData='updateData'></v-add>
    <v-list ref="list"></v-list>
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
        isShow: false
      }
    };
  },
  methods: {
    add() {
      this.info.isShow = true;
    },
    updateData(){
      this.$refs.list.getTableData()
    }
  },

  mounted() {}
};
</script>
<style scoped></style>
