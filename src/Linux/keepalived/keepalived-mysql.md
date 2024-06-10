---
title: keepalived配置mysql双主热备
index: 2
category: Linux
tag:
  - keepalived

---

## 前提条件
1. mysql双主集群搭建完毕,并启动
2. keepalived安装完成

## mysql是否存活脚本

```shell
#目录随意
mkdir -p /usr/local/scripts
#创建脚本文件
touch chk_mysql_alived.sh
#授予执行权限
chmod u+x /usr/local/scripts/chk_mysql_alived.sh
```

chk_mysql_alived.sh内容
```shell
#!bin/bash

ss -tnl|grep 3306 >/dev/null 2>&1

if [ $? -eq 0 ]
then
    echo " mysql is alived "
    exit 0
else
    echo " mysql is dead "
    systemctl stop keepalived
    exit 2
fi

```

## keepalived.conf配置
keepalived.conf配置文件在/etc/keepalived目录下  
主机配置  
```shell
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL_1
}

vrrp_script chk_mysql_alived {
    script "/usr/local/scripts/chk_mysql_alived.sh"
    interval 2
    weight 2
}

vrrp_instance VI_1 {
    state BACKUP
    interface ens33
    track_interface {
        ens33
    }
    virtual_router_id 51
    priority 100
    advert_int 1
    nopreempt
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    track_script {
        chk_mysql_alived
    }
    virtual_ipaddress {
        192.168.152.131
    }
}

```
备机配置  
```shell
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL_2
}

vrrp_script chk_mysql_alived{
    script "/usr/local/scripts/chk_mysql_alived.sh"
    interval 2
    weight 2
}

vrrp_instance VI_1 {
    state BACKUP
    interface ens33
    track_interface {
        ens33
    }
    virtual_router_id 51
    priority 99
    advert_int 1
    nopreempt
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.152.131
    }

   track_script {
     chk_mysql_alived
   }
}

```

## 启动keepalived

```shell
systemctl start keepalived
systemctl enable keepalived
```