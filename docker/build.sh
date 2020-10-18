npm run build

cp -r ../dist ./
# 将镜像推送到Registry
docker login --username=我给你打折吧 registry.cn-shanghai.aliyuncs.com
docker build -t registry.cn-shanghai.aliyuncs.com/chx2502/mili:v1.0.0 ./
docker push registry.cn-shanghai.aliyuncs.com/chx2502/mili:v1.0.0
