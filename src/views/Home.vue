<template>
<div class="home">
  <div class="video-card">
    <el-row :gutter="20">
      <el-col :span="6" v-for="video in videos" :key="video.id">
        <el-card :body-style="{ padding: '14px' }">
          <img class="video-avatar" src="../assets/avatar.png">
          <div>
            <div class="video-title">{{video.title}}</div>
            <div class="video-bottom clearfix">
              <span class="video-info">{{video.info}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import * as API from "@/api/video/";

export default {
  name: "Home",
  data() {
    return {
      videos: [],
    };
  },
  methods: {
    load() {
      API.getVideos().then((res) => {
        this.videos = res.data;
      });
    },
  },
  components: {},
  beforeMount() {
    console.log("beforeMount");
    this.load();
  },
};
</script>
<style>
  .video-avatar {
    width:100%;
  }
  .video-title {
    margin-left: 7px;
    margin-bottom: 5px;
  }
  .video-info {
    color: #909399;

  }
  .video-bottom {
    margin-bottom: 5px;
    margin-left: 7px;
  }
</style>
