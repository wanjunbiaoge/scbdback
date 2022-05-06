<template>
  <div class="list">
    <Table @edit="edit" ref="logo" :list="logoList" />
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
import Table from "./table.vue";
export default {
  props: [],
  components: { Table },
  data() {
    return {
      logoList: [],
      telList: []
    };
  },
  computed: {},
  methods: {
    async getTableData() {
      let resLogo = await fetchData({
        url: "/server_config/list",
        data: { type: "COMPANY_LOGO" }
      });
      if (!resLogo) return;
      this.logoList = resLogo.data;
      this.logoList.map(item => {
        item.fileName = "/attachment/get_file/" + item.value;
      });
      successAlert(resLogo.outMsg);
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.list {
  img {
    width: 600px;
    height: auto;
  }
}
</style>
