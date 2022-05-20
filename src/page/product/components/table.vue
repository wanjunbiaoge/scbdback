<template>
  <div class="table">
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border>
      <el-table-column prop="seqNumber" align="center" width="100" label=" 修改排序号">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.seqNumber" style="width: 70%"></el-input>
          <el-button type="primary" size="small" @click="changeSeqNumber(scope.row.id, scope.row.seqNumber)" style="marginTop:10px">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" width="320px" label=" 标题">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.fileName" class="head_pic" />
          <!-- <img :src="scope.row.fileName" class="head_pic" /> -->
        </template>
      </el-table-column>
      <el-table-column width="200px" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
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
    },
    async changeSeqNumber(id, seqNumber) {
      this.$emit("changeSeqNumber", id, seqNumber);
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  created() {},
  mounted() {},
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
