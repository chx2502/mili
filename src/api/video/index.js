import axios from "axios";

// 视频投稿
const postVideo = form => axios.post("/api/v1/video", form).then(res => res.data);

// 获取视频列表
const getVideos = () => axios.get("/api/v1/videos").then(res => res.data);

// 获取视频详情
const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data);

export {
  postVideo,
  getVideos,
  getVideo,
};
