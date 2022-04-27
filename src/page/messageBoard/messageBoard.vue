<template>
  <div class="application">
    <v-list ref="list"></v-list>
  </div>
</template>
<script>
import vList from "./components/list";
export default {
  props: [],
  components: {
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
