<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd ? '添加' : '修改'"
      :visible.sync="info.isShow"
      width="550px"
      @close="cancel"
      @opened="opened"
      custom-class="dialogHeight"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="submit"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="edit">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        id: "",
        name: "", //名称
        account: "", //账号
        password: "" //密码
      }
    };
  },
  methods: {
    //! 点击取消
    cancel() {
      this.info.isShow = false;
      for (let i in this.form) {
        this.form[i] = "";
      }
    },
    //!新增
    async submit() {
      let res = await fetchData({
        url: "/user/insert",
        data: this.form
      });
      if (res) {
        this.info.isShow = false;
        this.$emit("updateData");
        successAlert(res.outMsg);
        this.cancel();
      }
    },
    //!编辑
    async edit() {
      let res = await fetchData({
        url: "/user/update/",
        data: this.form
      });
      if (res.outCode == 1) {
        this.info.isShow = false;
        this.$emit("updateData");
        successAlert(res.outMsg);
        this.cancel();
      }
    },
    //!获取单条
    async getOne(id) {
      this.form.id = id;
      let res = await fetchData({
        url: "/user/list/" + id
      });
      for (let i in this.form) {
        for (let j in res.data) {
          if (i == j) {
            this.form[i] = res.data[j];
          }
        }
      }
    },

    //!dia打开后回调
    opened() {}
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.add {
  .dialogHeight {
    height: auto;
  }
  .wangHeight {
    height: 650px;
  }
  .fileBox {
    position: relative;
    width: 300px;
    height: 200px;
    border: 1px dashed skyblue;
  }
  .fileBox input {
    position: absolute;
    width: 300px;
    height: 200px;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .fileBox h3 {
    font-size: 40px;
    line-height: 200px;
    text-align: center;
    margin: 0;
  }
  .fileBox img {
    width: 300px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
  }
  #wangEdit {
    width: 1300px;
    height: 300px;
  }
}
</style>
