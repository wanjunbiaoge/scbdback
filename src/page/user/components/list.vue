<template>
  <div class="list">
    <Table :list="list" @del="del" @edit="edit" />
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
import Table from "./table.vue";
export default {
  props: [],
  components: {
    Table
  },
  created() {
    this.getTableData();
  },
  data() {
    return {
      list: []
    };
  },
  computed: {},
  methods: {
    //!获取表格数据
    async getTableData(info) {
      this.type = info;
      let res = await fetchData({
        url: "/user/list",
        data: {}
      });
      if (!res) return;
      this.list = res.data;
    },
    //!删除
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await fetchData({
          url: "/user/delete/" + id
        });
        if (!res) return;
        successAlert(res.outMsg);
        this.getTableData(this.type);
      });
    },
    //!编辑
    edit(id) {
      this.$emit("edit", id);
    }
  },

  mounted() {}
};
</script>
<style lang="less" scoped>
.list {
  position: relative;
  img {
    width: 300px;
    height: auto;
  }
  .newsDetail {
    height: 250px;
    overflow-y: scroll;
  }
  .typeInput {
    position: absolute;
    top: -60px;
    left: 100px;
  }
  .table {
    margin-top: 20px;
  }
}
</style>
