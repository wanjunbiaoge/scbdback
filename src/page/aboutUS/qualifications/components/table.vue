<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      title="行业地位和荣誉"
    >
      <el-table-column prop="title" label=" 标题"> </el-table-column>
      <el-table-column width="320px" label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.fileName" class="head_pic" />
          <!-- <img :src="scope.row.fileName" class="head_pic" /> -->
        </template>
      </el-table-column>
      <el-table-column width="100px" label="操作">
        <template slot-scope="scope">
          <div>
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
    return {};
  },
  computed: {},
  methods: {
    del(id) {
      this.$emit("del", id);
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
}
</style>
