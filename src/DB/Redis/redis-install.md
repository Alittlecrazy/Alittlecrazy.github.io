---
title: Redis安装(Docker版)
index: 1
category: 数据库
tag:
  - redis
---

## 1.拉取redis镜像
```shell
docker pull redis
```

## 2.创建挂载目录

```shell
mkdir /docker-data/redis
```

## 3.下载redis.conf文件
在github上找到对应版本的redis,下载对应版本的redis.conf即可

## 4.赋权限
```shell
chmod 777 redis.conf
```

## 5.修改默认配置信息

```shell
bind 127.0.0.1 # 这行要注释掉，解除本地连接限制
protected-mode no # 默认yes，如果设置为yes，则只允许在本机的回环连接，其他机器无法连接。
daemonize no # 默认no 为不守护进程模式，docker部署不需要改为yes，docker run -d本身就是后台启动，不然会冲突
requirepass 123456 # 设置密码
appendonly yes # 持久化
```
## 6.docker启动redis
```shell
docker run --name redis \
-p 6379:6379 \
-v /docker-data/redis/redis.conf:/etc/redis/redis.conf \
-v /docker-data/redis:/data \
-d redis:latest redis-server /etc/redis/redis.conf --appendonly yes
```
**说明**  
* -p 6379:6379：端口映射，前面是宿主机，后面是容器。
* –name redis：指定该容器名称。
* -v 挂载文件或目录：前面是宿主机，后面是容器。
* -d redis redis-server /etc/redis/redis.conf：表示后台启动redis，以配置文件启动redis，加载容器内的conf文件。
* appendonly yes：开启redis 持久化。  



