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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即投稿</el-button>
        <el-button>取消投稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from "@/api/video/";

export default {
  name: "PostVideo",
  data() {
    return {
      form: {
        title: "",
        info: "",
      },
    }
  },
  methods: {
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
