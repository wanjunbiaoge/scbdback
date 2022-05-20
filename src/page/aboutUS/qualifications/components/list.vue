<template>
  <div class="list">
    <el-select
      v-model="type"
      placeholder="请选择类型"
      @change="changeType"
      class="typeInput"
    >
      <el-option
        v-for="item in aptitudeTypeList"
        :key="item.value"
        :label="item.aptitudeName"
        :value="item.value"
      ></el-option>
    </el-select>
    <Table @del="del" @changeSeqNumber='changeSeqNumber' :list="list" />
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
      list: [],
      type: "APTITUDE_STATUS",
      aptitudeTypeList: [
        {
          aptitudeName: "行业地位和荣誉",
          value: "APTITUDE_STATUS"
        },
        {
          aptitudeName: "管理体系认证证书",
          value: "APTITUDE_CERTIFICATE"
        },
        {
          aptitudeName: "知识产权专利",
          value: "APTITUDE_PATENT"
        }
      ]
    };
  },
  computed: {},
  methods: {
    changeType(value) {
      this.getTableData(value);
    },
    async getTableData(info) {
      this.type = info;
      let res = await fetchData({
        url: "/company_aptitude/list",
        data: { aptitudeType: info }
      });
      if (!res) return;
      this.list = res.data;

      this.list.map(item => {
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
    },
     async changeSeqNumber(id,seqNumber) {
      let res = await fetchData({
        url: "/company_aptitude/sort/" + `${id}/${seqNumber}`
      });
      if (!res) return;
      successAlert(res.outMsg);
      this.getTableData(this.type);
    }
  },
  created() {
    this.getTableData(this.type);
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.list {
  position: relative;
  img {
    width: 600px;
    height: auto;
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
