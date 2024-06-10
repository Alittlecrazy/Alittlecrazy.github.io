---
title: MySql双主模式搭建
index: 1
category: 数据库
tag:
  - MySql

---
## 为什么要配置成双主
> [!tip]
> 在企业中，很多都是使用mysql主从方案，一主多从，读写分离等，但是单主存在单点故障，从库切换成主库需要作改动。因此，如果是双主或者多主，就会增加mysql入口，增加高可用。


## MySQL双主（主主）架构方案思路是

1. 两台mysql都可读写，互为主备，默认只使用一台（masterA）负责数据的写入，另一台（masterB）备用；
2. masterA是masterB的主库，masterB又是masterA的主库，它们互为主从；
3. 两台主库之间做高可用,可以采用keepalived等方案（使用VIP对外提供服务）；
4. 所有提供服务的从服务器与masterB进行主从同步（双主多从）;
5. 建议采用高可用策略的时候，masterA或masterB均不因宕机恢复后而抢占VIP（非抢占模式）；

这样做可以在一定程度上保证主库的高可用,在一台主库down掉之后,可以在极短的时间内切换到另一台主库上（尽可能减少主库宕机对业务造成的影响），减少了主从同步给线上主库带来的压力；  
**但是也有几个不足的地方:**  
1.masterB可能会一直处于空闲状态（可以用它当从库，负责部分查询）；  
2.主库后面提供服务的从库要等masterB先同步完了数据后才能去masterB上去同步数据，这样可能会造成一定程度的同步延时；  

## 主主环境搭建过程（这里只介绍两台主的配置方案）
1. CenOS 7 64位两台 
   masterA:192.168.152.129
   masterB:192.168.152.130
2. docker安装mysql 8

### 1.安装mysql服务
1. 拉取mysql镜像
```shell
docker pull mysql  

```
2. 创建文件夹挂在容器中的目录
```shell
mkdir -p /usr/local/mysql/conf
mkdir -p /usr/local/mysql/data
touch /usr/local/mysql/conf/my.cnf
```
3. 配置宿主机my.cnf，设置编码
```shell
[client]
default_character_set=utf8
[mysqld]
collation_server = utf8_general_ci
character_set_server = utf8

```

4. 运行mysql容器
```shell
docker run \
--restart=always \
-d \
-v /usr/local/mysql/conf:/etc/mysql/conf.d \
-v /usr/local/mysql/data:/var/lib/mysql \
-p 3306:3306 \
--name mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:latest
```

### 2.配置主主同步
#### 2.1关键配置
masterA的my.cnf文件  
```shell
[mysqld]
binlog_format=MIXED
innodb_flush_log_at_trx_commit=1
sync_binlog=1
#双主需要配置
log-slave-updates
#设置哪些数据库不进行复制
replicate-ignore-db=mysql
replicate-ignore-db=performance_schema
replicate-ignore-db=sys
#设置哪些数据库变化不记录binlog
binlog-ignore-db=mysql
binlog-ignore-db=performance_schema
binlog-ignore-db=sys

#设置记录binlog的库
binlog-do-db=ry_vue
#设置需要复制的数据库
replicate-do-db=ry_vue

#控制 AUTO_INCREMENT 序列的起始值
auto_increment_offset=1
#控制 AUTO_INCREMENT 列值的增量
auto_increment_increment=2

#标识唯一的服务器
server-id=1
#启用二进制日志功能 设置文件名字
log-bin=mysql-bin-master

```
重启mysql服务后，授予从机复制权限  
```shell
CREATE USER 'root'@'192.168.152.130' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT REPLICATION SLAVE ON *.* TO 'root'@'192.168.152.130';
FLUSH PRIVILEGES;
```

masterB的my.cnf文件  
```shell
binlog_format=MIXED
innodb_flush_log_at_trx_commit=1
sync_binlog=1
#双主需要配置
log-slave-updates
#设置哪些数据库不进行复制
replicate-ignore-db=mysql
replicate-ignore-db=performance_schema
replicate-ignore-db=sys
#设置哪些数据库变化不记录binlog
binlog-ignore-db=mysql
binlog-ignore-db=performance_schema
binlog-ignore-db=sys

#设置记录binlog的库
binlog-do-db=ry_vue
#设置需要复制的数据库
replicate-do-db=ry_vue

#控制 AUTO_INCREMENT 序列的起始值
auto_increment_offset=2
#控制 AUTO_INCREMENT 列值的增量
auto_increment_increment=2

#标识唯一的服务器
server-id=2
#启用二进制日志功能 设置文件名字
log-bin=mysql-bin-master
```
重启mysql服务后，授予从机复制权限  
```shell
CREATE USER 'root'@'192.168.152.129' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT REPLICATION SLAVE ON *.* TO 'root'@'192.168.152.129';
FLUSH PRIVILEGES;
```

#### 2.2开启同步 
masterA  
查看主库状态
```shell
show master status;
+-------------------------+----------+--------------+------------------------------+-------------------+
| File                    | Position | Binlog_Do_DB | Binlog_Ignore_DB             | Executed_Gtid_Set |
+-------------------------+----------+--------------+------------------------------+-------------------+
| mysql-bin-master.000003 |   157064 | ry_vue       | mysql,performance_schema,sys |                   |
+-------------------------+----------+--------------+------------------------------+-------------------+

```
配置同步信息  
```shell
stop slave;
change master to master_host='192.168.152.130',master_port=3306,master_user='root',master_password='123456',master_log_file='mysql-bin-master.000003',master_log_pos=157064;
start slave;
show slave status\G

```
masterB  
查看主库状态  
```shell
show master status;
+-------------------------+----------+--------------+------------------------------+-------------------+
| File                    | Position | Binlog_Do_DB | Binlog_Ignore_DB             | Executed_Gtid_Set |
+-------------------------+----------+--------------+------------------------------+-------------------+
| mysql-bin-master.000003 |   157064 | ry_vue       | mysql,performance_schema,sys |                   |
+-------------------------+----------+--------------+------------------------------+-------------------+

```
配置同步信息
```shell
stop slave;
change master to master_host='192.168.152.129',master_port=3306,master_user='root',master_password='123456',master_log_file='mysql-bin-master.000003',master_log_pos=157064;
start slave;
show slave status\G

```

如果Slave_IO_Running和Slave_SQL_Running都为Yes,则同步成功。  
如果未同步成功，可查看Last_IO_Error和Last_SQL_Error报错信息，排查问题

> [!caution]
> 多主需要考虑自增长ID问题，这个需要特别设置配置文件，比如双主，可以使用奇偶，总之，主之间设置自增长ID相互不冲突就能完美解决自增长ID冲突问题。



