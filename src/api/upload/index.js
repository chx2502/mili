// 获取签名直传链接
import axios from "axios";

const postUploadToken = filename => axios.post("/api/v1/upload/token", {"filename": filename}).then(res => res.data);

export default postUploadToken