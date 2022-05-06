<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <!-- <el-table-column prop="title" width="320px" label=" 标题"> </el-table-column> -->
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.fileName" class="head_pic" />
          <!-- <img :src="scope.row.fileName" class="head_pic" /> -->
        </template>
      </el-table-column>
      <el-table-column width="100px" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
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
    return {};
  },
  computed: {},
  methods: {
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
    height: 100px;
  }
}
</style>
