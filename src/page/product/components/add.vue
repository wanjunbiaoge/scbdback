<template>
  <div class="add">
    <el-dialog
      title="轮播图添加"
      :visible.sync="info.isShow"
      width="40%"
      @close="cancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="form.type"
            placeholder="请选择类型"
            @change="changeType"
          >
            <!-- 这里需要展示状态层的列表 -->
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.aptitudeName"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 文件上传 -->
        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeFile" v-if="info.isShow" />
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
import typeList from "./option";
export default {
  props: ["info"],
  components: {},
  created() {
    this.typeList = typeList;
  },
  data() {
    return {
      //渲染图片路径
      imgUrl: "",
      file: {
        file: ""
      },
      form: {
        fileName: "",
        title: "",
        type: ""
      },
      typeList: []
    };
  },
  computed: {},
  methods: {
    changeFile(e) {
      let file = e.target.files[0];
      // URL.createObjectURL()    可以将图片信息转换成具体的图片
      this.imgUrl = URL.createObjectURL(file);
      this.file.file = file;
    },
    changeType(value) {
      this.form.type = value;
    },
    // 点击取消
    cancel() {
      // 关闭add组件
      this.info.isShow = false;
      this.imgUrl = "";
      this.form.title = "";
      this.form.type = "";
    },
    async submit() {
      let imgData = new FormData();
      for (let i in this.file) {
        imgData.append(i, this.file[i]);
      }
      let imgDataRes = await fetchData({
        url: "/attachment/upload",
        data: imgData
      });
      let uploadRes = await fetchData({
        url: "/product/insert",
        data: {
          fileName: imgDataRes.data.fileName,
          title: this.form.title,
          type: this.form.type
        }
      });
      if (uploadRes) {
        this.info.isShow = false;
        this.$emit("updateData",this.form.type);
        successAlert(uploadRes.outMsg);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.add {
  .fileBox {
    position: relative;
    width: 400px;
    height: 300px;
    border: 1px dashed skyblue;
  }
  .fileBox input {
    position: absolute;
    width: 400px;
    height: 300px;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .fileBox h3 {
    font-size: 40px;
    line-height: 300px;
    text-align: center;
    margin: 0;
  }
  .fileBox img {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
