<template>
  <div class="qualifications">
    <el-button type="primary" @click="add">添加</el-button>
    <span class="text">荣誉图片大小：230×180，证书图片大小：300×210，证书图片大小：230×260，</span>
    <v-add :info="info" @updateData='updateData'></v-add>
    <v-list ref="list"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
// import { mapGetters, mapActions } from "vuex";
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
    updateData(aptitudeType){
      this.$refs.list.getTableData(aptitudeType)
    },
    del(id){
      this.$refs.list.del(id)
    }
  },

  mounted() {}
};
</script>
<style scoped lang='less'>
.qualifications{
  .text{
    margin-left: 300px;
  }
}
</style>
