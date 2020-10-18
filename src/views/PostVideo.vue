<template>
<div class="post-video">
  <h2>作品投递</h2>
  <el-form label-position="left" ref="form" :model="form" label-width="80px" size="medium">
    <el-form-item label="稿件标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="稿件描述">
      <el-input type="textarea" v-model="form.info"></el-input>
    </el-form-item>
    <el-form-item label="稿件地址">
      <el-input type="url" v-model="form.url"></el-input>
    </el-form-item>
    <el-form-item>
      <el-upload
          class="avatar-uploader"
          action=""
          :drag="true"
          :show-file-list="true"
          :http-request="httpUploadRequest"
          :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即投稿</el-button>
      <el-button>取消投稿</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import * as API from "@/api/video/";
import uploadAPI from "@/api/upload/";

export default {
  name: "PostVideo",
  data() {
    return {
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        title: "",
        info: "",
        url: "",
        avatar: "",
      },
    }
  },
  methods: {
    beforeUpload(file) {
      const isImage = (file.type === 'image/png' || file.type === 'image/jpeg');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传头像图片只能是图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    httpUploadRequest(option) {
      uploadAPI(option.file.name).then((res) => {
        const oReq = new XMLHttpRequest();
        oReq.open('PUT', res.data.put, true);
        oReq.send(option.file);
        oReq.onload = () => {
          this.imageUrl = res.data.get;
          this.form.avatar = res.data.key;
        };
      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
      });
    },
    onSubmit() {
      API.postVideo(this.form).then((res) => {
        if (res.status > 0) {
          this.$notify.error({
            title: "投稿失败",
            message: res.msg,
          });
        } else {
          this.$notify({
            title: "投稿成功",
            message: `你的投稿 ID 为${res.data.id}`,
            type: "success",
          });
        }
      }).catch((error) => {
        this.$notify.error({
          title: "网络错误",
          message: error,
        });
      });
    }
  },
  components: {

  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>