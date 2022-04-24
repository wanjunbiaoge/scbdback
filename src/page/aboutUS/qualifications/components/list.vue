<template>
  <div class="list">
    <div class="left">
      <div class="name">行业荣誉和地位</div>
      <Table @del="del" :list="leftList" />
    </div>
    <div class="middle">
      <div class="name">管理体系认证证书</div>
      <Table @del="del" :list="middleList" />
    </div>
    <div class="right">
      <div class="name">知识产权专利</div>
      <Table @del="del" :list="rightList" />
    </div>
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import Table from "./table.vue";
import fetchData from "@/utils/fetchData";
export default {
  props: [],
  components: {
    Table
  },
  data() {
    return {
      leftList: [],
      middleList: [],
      rightList: []
    };
  },
  computed: {},
  methods: {
    async getTableData() {
      let resleft = await fetchData({
        url: "/company_aptitude/list",
        data: { aptitudeType: "APTITUDE_STATUS" }
      });
      let resmiddle = await fetchData({
        url: "/company_aptitude/list",
        data: { aptitudeType: "APTITUDE_CERTIFICATE" }
      });
      let resright = await fetchData({
        url: "/company_aptitude/list",
        data: { aptitudeType: "APTITUDE_PATENT" }
      });
      if (!resleft && !resmiddle && !resmiddle) return;
      this.leftList = resleft.data;
      this.middleList = resmiddle.data;
      this.rightList = resright.data;
      this.leftList.map(item => {
        item.fileName = "/attachment/get_file/" + item.fileName;
      });
      this.middleList.map(item => {
        item.fileName = "/attachment/get_file/" + item.fileName;
      });
      this.rightList.map(item => {
        item.fileName = "/attachment/get_file/" + item.fileName;
      });
    },
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await fetchData({
          url: "/company_aptitude/delete/" + id
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
  display: flex;
  justify-content: space-between;
  .left,
  .middle,
  .right {
    width: 33%;
  }
  img {
    width: 600px;
    height: auto;
  }
  .name {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
