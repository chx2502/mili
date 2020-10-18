<template>
<div class="show-video">
  <h2>TITLE</h2>
  <el-row :gutter="20">
    <el-col :span="16">
      <video-player class="video-player-box" :options="playerOptions">
      </video-player>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</div>
</template>


<script type="text/javascript">
// require styles
import 'video.js/dist/video-js.css'

import {
  videoPlayer
} from 'vue-video-player'

import * as API from "@/api/video/";

export default {
  name: 'ShowVideo',
  data() {
    return {
      video: {},
      playerOptions: {
        // videojs options
        fluid: true,
        autoplay: false,
        sources: [{
          type: "video/mp4",
          src: "",
        }],
      },
    };
  },
  methods: {
    load() {
      API.getVideo(this.$route.params.videoID).then((res) => {
        this.video = res.data;
        this.playerOptions.sources[0].src = this.video.url;
      });
    },
  },
  beforeMount() {
    this.load();
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  components: {
    videoPlayer
  },
}
</script>
