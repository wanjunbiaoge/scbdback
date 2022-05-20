<template>
  <div class="list">
    <el-select
      v-model="type"
      placeholder="请选择类型"
      @change="changeType"
      class="typeInput"
    >
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-select>
    <Table @changeSeqNumber='changeSeqNumber' :list="list" @del="del" @edit="edit" />
    <Pagenation :pagenation="pagenation" :getTableData="getTableData" />
  </div>
</template>
<script>
import Pagenation from "@/components/pagenation";
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
import Table from "./table.vue";
export default {
  props: [],
  components: {
    Pagenation,
    Table
  },
  created() {
    this.getTableData(this.type);
  },
  data() {
    return {
      list: [],
      pagenation: {
        pageTotal: 1,
        pageNumber: 1
      },
      type: "NEWS_COMPANY",
      typeList: [
        {
          name: "公司新闻",
          value: "NEWS_COMPANY"
        },
        {
          name: "行业新闻",
          value: "NEWS_INDUSTRY"
        }
      ]
    };
  },
  computed: {},
  methods: {
    changeType(value) {
      this.getTableData(value);
    },
    //!获取表格数据
    async getTableData(info) {
      this.type = info;
      let res = await fetchData({
        url: "/news/list",
        data: { type: info }
      });
      if (!res) return;
      this.list = res.data;
      this.list.map(item => {
        item.fileName = "/attachment/get_file/" + item.fileName;
      });
      this.pagenation.pageTotal = res.total;
      this.pagenation.pageNumber = res.pages;
    },
    //!删除
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await fetchData({
          url: "/news/delete/" + id
        });
        if (!res) return;
        successAlert(res.outMsg);
        this.getTableData(this.type);
      });
    },
    //!编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //!修改排序
     async changeSeqNumber(id,seqNumber) {
       console.log(1);
      let res = await fetchData({
        url: "/news/sort/" + `${id}/${seqNumber}`
      });
      if (!res) return;
      successAlert(res.outMsg);
      this.getTableData(this.type);
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
