<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" width="80" label=" 序号">
      </el-table-column>
      <el-table-column prop="title" width="200" label="标题"> </el-table-column>
      <el-table-column prop="contactMen" width="200" label="联系人"> </el-table-column>
      <el-table-column prop="contactPhone" width="200" label="联系电话"> </el-table-column>
      <el-table-column prop="messageDetail" width="600" label="内容"> </el-table-column>
      <el-table-column prop="createTime" width="200" label="时间"> </el-table-column>
      <el-table-column label="操作">
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
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
export default {
  props: [],
  components: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  methods: {
    async getTableData() {
      let res = await fetchData({
        url: "/message/list",
        data: {}
      });
      if (!res) return;
      this.list = res.data;
    },
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await fetchData({
          url: "/message/delete/" + id
        });
        if (!res) return;
        successAlert(res.outMsg);
        this.getTableData();
      });
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
    width: 200px;
    height: auto;
  }
}
</style>
