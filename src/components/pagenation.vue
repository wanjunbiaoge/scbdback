<template>
  <div class="pagenation">
    <el-pagination
      :page-size="10"
      background
      layout="prev, pager, next"
      :total="pagenation.pageTotal"
      :current-page="pagenation.pageNumber"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    pagenation: {
      default() {
        return {
          pageNumber: "1",
          pageTotal: 9,
        };
      },
    },
    getData: {
      require: true,
    },
  },
  methods: {
    handleCurrentChange() {
      this.getTableData();
    },
  },
};
</script>
<style lang="less" scoped>
.pagenation {
  text-align: center;
}
</style>
