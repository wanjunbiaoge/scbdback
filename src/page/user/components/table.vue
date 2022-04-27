<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" width="50" label=" 序号"> </el-table-column>
      <el-table-column prop="name" label=" 名称">
      </el-table-column>
      <el-table-column prop="account" label="账号">
      </el-table-column>
      <el-table-column fixed="right" width="200px" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)"
              >删 除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["list"],
  components: {},
  data() {
    return {
      // tableHeight: {
      //   height: "300px"
      // }
    };
  },
  computed: {},
  methods: {
    del(id) {
      this.$emit("del", id);
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.list {
  img {
    width: 300px;
    height: 200px;
  }
  .newsDetail{
    height: 250px;
    overflow-y: scroll;
  }
}
</style>
