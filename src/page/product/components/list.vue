<template>
  <div class="list">
    <div>
      <el-select
        v-model="type"
        placeholder="请选择类型"
        @change="changeType"
        class="typeInput"
      >
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.aptitudeName"
          :value="item.value"
        ></el-option>
      </el-select>
      <Table @edit='edit' @del="del" @changeSeqNumber='changeSeqNumber' :list="list" />
    </div>
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import Table from "./table.vue";
import typeList from "./option";
import fetchData from "@/utils/fetchData";
export default {
  props: [],
  components: {
    Table
  },
  created() {
    this.typeList = typeList;
    this.getTableData("PRODUCT_WEAR");
  },
  data() {
    return {
      list: [],
      typeList: [],
      type: "PRODUCT_WEAR"
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
        url: "/product/list",
        data: { type: info }
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
          url: "/product/delete/" + id
        });
        if (!res) return;
        successAlert(res.outMsg);
        this.getTableData(this.type);
      });
    },
    async changeSeqNumber(id,seqNumber) {
      let res = await fetchData({
        url: "/product/sort/" + `${id}/${seqNumber}`
      });
      if (!res) return;
      successAlert(res.outMsg);
      this.getTableData(this.type);
    },
    async edit(id){
      this.$emit('edit',id)
    }
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
