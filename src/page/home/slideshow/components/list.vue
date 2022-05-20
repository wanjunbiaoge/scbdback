<template>
  <div class="list">
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border>
      <el-table-column prop="seqNumber" align="center" width="100" label=" 修改排序号">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.seqNumber" :placeholder="scope.row.seqNumber" style="width: 70%"></el-input>
          <el-button type="primary" size="small" @click="changeSeqNumber(scope.row.id,scope.row.seqNumber)" style="marginTop:10px">修改</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="title" label=" 轮播图标题"> </el-table-column> -->
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.fileName" class="head_pic" />
          <!-- <img :src="scope.row.fileName" class="head_pic" /> -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
export default {
  props: [],
  components: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  methods: {
    async getTableData() {
      let res = await fetchData({
        url: "/banner/list",
        data: {},
      });
      if (!res) return;
      this.list = res.data;
      this.list.map((item) => {
        item.fileName = "/attachment/get_file/" + item.fileName;
      });
    },
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await fetchData({
          url: "/banner/delete/" + id,
        });
        if (!res) return;
        successAlert(res.outMsg);
        this.getTableData();
      });
    },
    async changeSeqNumber(id,seqNumber) {
      let res = await fetchData({
        url: "/banner/sort/" + `${id}/${seqNumber}`,
      });
      if (!res) return;
      successAlert(res.outMsg);
      this.getTableData();
    },
  },
  created() {
    this.getTableData();
  },
  mounted() {},
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
