<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column label="关于平台图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.fileName" class="head_pic" />
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
      list: [
        {
          fileName: ""
        }
      ]
    };
  },
  computed: {},
  methods: {
    async getTableData() {
      let res = await fetchData({
        url: "/server_config/list/ABOUT_PLATFORM",
        data: {}
      });
      if (!res) return;
      this.list = [res.data];
      this.list.map(item => {
        item.fileName = "/attachment/get_file/" + item.value;
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
    width: 1000px;
    height: auto;
  }
}
</style>
