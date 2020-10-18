<template>
<div class="home">
  <div class="video-card">
    <el-row :gutter="30">
      <el-col :span="4" v-for="video in videos" :key="video.id">
        <el-card class="video-card" @click.native="clickVideo(video)">
          <img class="video-avatar" :src="video.avatar">
          <div>
            <div class="video-title">{{video.title}}</div>
            <div class="video-bottom clearfix">
              <span class="video-info">{{video.info.substring(0, 50)}}</span>
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
    clickVideo(video) {
      this.$router.push({
        name: "showVideo",
        params: {
          videoID: video.id
        }
      })
    },
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
  width: 100%;
}

.video-title {
  margin-left: 7px;
  margin-bottom: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.video-info {
  color: #909399;
  text-overflow: ellipsis;
}

.video-bottom {
  margin-bottom: 5px;
  margin-left: 7px;
}

.video-card {
  cursor: pointer;
}
</style>
