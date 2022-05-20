<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd ? '添加' : '修改'"
      :visible.sync="info.isShow"
      width="1450px"
      @close="cancel"
      @opened="opened"
      custom-class="dialogHeight"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input ref="subtitle" v-model="form.subtitle"></el-input>
        </el-form-item>
        <!-- 文件上传 -->
        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeFile" v-if="info.isShow" />
          </div>
        </el-form-item>
        <el-form-item label="详细介绍" class="wangHeight">
          <div ref="wangEdit" id="wangEdit"></div>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-input v-model="form.time"></el-input>
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
import E from "wangeditor";
import BASE_URL from "@/utils/env";
import { successAlert } from "@/utils/alert";
import fetchData from "@/utils/fetchData";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      editor: null,
      file: {
        file: ""
      },
      imgUrl: "", //渲染图片路径
      form: {
        id: null,
        title: "", //标题
        subtitle: "", //副标题
        time: "", //上传时间
        fileName: "",
        intro: "" //富文本
      }
    };
  },
  methods: {
    changeFile(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.file.file = file;
      this.uploadImg();
    },
    //! 点击取消
    cancel() {
      this.info.isShow = false;
      this.imgUrl = "";
      for (let i in this.form) {
        this.form[i] = "";
      }
    },
    async uploadImg() {
      let imgData = new FormData();
      for (let i in this.file) {
        imgData.append(i, this.file[i]);
      }
      let imgDataRes = await fetchData({
        url: "/attachment/upload",
        data: imgData
      });
      this.form.fileName = imgDataRes.data.fileName;
    },
    //!新增
    async submit() {
      await this.uploadImg();
      let uploadRes = await fetchData({
        url: "/solution/insert",
        data: this.form
      });
      if (uploadRes) {
        this.info.isShow = false;
        this.$emit("updateData");
        successAlert(uploadRes.outMsg);
        this.cancel();
      }
    },
    //!编辑
    async edit() {
      let res = await fetchData({
        url: "/solution/update/",
        data: this.form
      });
      if (res.outCode == 1) {
        this.info.isShow = false;
        this.$emit("updateData");
        successAlert(res.outMsg);
        this.cancel();
      }
    },
    //!富文本方法
    wangEditor(info) {
      // 加载富文本
      this.editor = new E("#wangEdit");
      this.editor.config.height = 600;
      //图片处理
      this.editor.config.uploadImgServer = BASE_URL + "/attachment/rtf_upload";
      this.editor.config.uploadFileName = "files";
      this.editor.config.uploadImgHeaders = {
        "x-access-token": sessionStorage.getItem("x-access-token") // 设置请求头
      };
      //~ 配置 onchange 回调函数
      this.editor.config.onchange = newHtml => {
        this.form.intro = newHtml;
      };
      this.editor.create();
      if (info) {
        this.editor.txt.html(info);
      }
    },
    //!获取单条
    async getOne(id) {
      let res = await fetchData({
        url: "/solution/list/" + id
      });
      for (let i in this.form) {
        for (let j in res.data) {
          if (i == j) {
            this.form[i] = res.data[j];
          }
        }
      }
      this.form.id = id;
      this.imgUrl = BASE_URL + "/attachment/get_file/" + res.data.fileName;
    },
    //!dia打开后回调
    opened() {
      this.$nextTick(() => {
        if (this.editor == null) {
          this.wangEditor(this.form.intro);
        } else {
          this.editor.destroy();
          this.wangEditor(this.form.intro);
        }
      });
    }
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
