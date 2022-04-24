<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :row-style="{ height: '300px' }"
      border
    >
      <el-table-column prop="id" width="80" label=" 序号"> </el-table-column>
      <el-table-column prop="title" width="150" label="标题"> </el-table-column>
      <el-table-column prop="subtitle" width="150" label="副标题">
      </el-table-column>
      <el-table-column label="图片" width="350">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.fileName" class="head_pic" />
          <!-- <img :src="scope.row.fileName" class="head_pic" /> -->
        </template>
      </el-table-column>
      <el-table-column  prop="intro" width="1300" label="详细介绍">
        <template slot-scope="scope">
          <div class="intro" v-html="scope.row.intro"></div>
        </template>
      </el-table-column>
      <el-table-column prop="time" width="150" label="上传时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
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
    <Pagenation :pagenation="pagenation" :getTableData="getTableData" />
  </div>
</template>
<script>
import Pagenation from "@/components/pagenation";
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
export default {
  props: [],
  components: {
    Pagenation
  },
  data() {
    return {
      list: [],
      pagenation: {
        pageTotal: 1,
        pageNumber: 1
      }
    };
  },
  computed: {},
  methods: {
    //!获取表格数据
    async getTableData() {
      let res = await fetchData({
        url: "/solution/list",
        data: {}
      });
      if (!res) return;
      this.list = res.data;
      this.list.map(item => {
        item.fileName = "/attachment/get_file/" + item.fileName;
      });
      this.pagenation.pageTotal = res.total;
      this.pagenation.pageNumber = res.pages
    },
    //!删除
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await fetchData({
          url: "/solution/delete/" + id
        });
        if (!res) return;
        successAlert(res.outMsg);
        this.getTableData();
      });
    },
    //!编辑
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
    width: 300px;
    height: auto;
  }
  .intro{
    height: 250px;
    overflow-y: scroll;
  }
}
</style>
