import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,e as n}from"./app-PpS8VsOm.js";const l={},e=n(`<h2 id="为什么要配置成双主" tabindex="-1"><a class="header-anchor" href="#为什么要配置成双主"><span>为什么要配置成双主</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在企业中，很多都是使用mysql主从方案，一主多从，读写分离等，但是单主存在单点故障，从库切换成主库需要作改动。因此，如果是双主或者多主，就会增加mysql入口，增加高可用。</p></div><h2 id="mysql双主-主主-架构方案思路是" tabindex="-1"><a class="header-anchor" href="#mysql双主-主主-架构方案思路是"><span>MySQL双主（主主）架构方案思路是</span></a></h2><ol><li>两台mysql都可读写，互为主备，默认只使用一台（masterA）负责数据的写入，另一台（masterB）备用；</li><li>masterA是masterB的主库，masterB又是masterA的主库，它们互为主从；</li><li>两台主库之间做高可用,可以采用keepalived等方案（使用VIP对外提供服务）；</li><li>所有提供服务的从服务器与masterB进行主从同步（双主多从）;</li><li>建议采用高可用策略的时候，masterA或masterB均不因宕机恢复后而抢占VIP（非抢占模式）；</li></ol><p>这样做可以在一定程度上保证主库的高可用,在一台主库down掉之后,可以在极短的时间内切换到另一台主库上（尽可能减少主库宕机对业务造成的影响），减少了主从同步给线上主库带来的压力；<br><strong>但是也有几个不足的地方:</strong><br> 1.masterB可能会一直处于空闲状态（可以用它当从库，负责部分查询）；<br> 2.主库后面提供服务的从库要等masterB先同步完了数据后才能去masterB上去同步数据，这样可能会造成一定程度的同步延时；</p><h2 id="主主环境搭建过程-这里只介绍两台主的配置方案" tabindex="-1"><a class="header-anchor" href="#主主环境搭建过程-这里只介绍两台主的配置方案"><span>主主环境搭建过程（这里只介绍两台主的配置方案）</span></a></h2><ol><li>CenOS 7 64位两台 masterA:192.168.152.129 masterB:192.168.152.130</li><li>docker安装mysql 8</li></ol><h3 id="_1-安装mysql服务" tabindex="-1"><a class="header-anchor" href="#_1-安装mysql服务"><span>1.安装mysql服务</span></a></h3><ol><li>拉取mysql镜像</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> mysql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>创建文件夹挂在容器中的目录</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /usr/local/mysql/conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /usr/local/mysql/data</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /usr/local/mysql/conf/my.cnf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置宿主机my.cnf，设置编码</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[client]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">default_character_set</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">utf8</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[mysqld]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">collation_server</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> utf8_general_ci</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">character_set_server</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> utf8</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>运行mysql容器</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">--restart=always </span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-d </span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/usr/local/mysql/conf:/etc/mysql/conf.d</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/usr/local/mysql/data:/var/lib/mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-p </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">3306:3306</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">--name </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-e </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">MYSQL_ROOT_PASSWORD=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">123456</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">mysql:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置主主同步" tabindex="-1"><a class="header-anchor" href="#_2-配置主主同步"><span>2.配置主主同步</span></a></h3><h4 id="_2-1关键配置" tabindex="-1"><a class="header-anchor" href="#_2-1关键配置"><span>2.1关键配置</span></a></h4><p>masterA的my.cnf文件</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[mysqld]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog_format</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">MIXED</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">innodb_flush_log_at_trx_commit</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">sync_binlog</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#双主需要配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">log-slave-updates</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置哪些数据库不进行复制</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">performance_schema</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">sys</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置哪些数据库变化不记录binlog</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">performance_schema</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">sys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置记录binlog的库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-do-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ry_vue</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置需要复制的数据库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-do-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ry_vue</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#控制 AUTO_INCREMENT 序列的起始值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">auto_increment_offset</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#控制 AUTO_INCREMENT 列值的增量</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">auto_increment_increment</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#标识唯一的服务器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">server-id</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#启用二进制日志功能 设置文件名字</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">log-bin</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql-bin-master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启mysql服务后，授予从机复制权限</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CREATE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> USER</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;root&#39;@&#39;192.168.152.130&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> IDENTIFIED</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> WITH</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> mysql_native_password</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> BY</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;123456&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">GRANT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> REPLICATION</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> SLAVE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> TO</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;root&#39;@&#39;192.168.152.130&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">FLUSH</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> PRIVILEGES</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>masterB的my.cnf文件</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog_format</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">MIXED</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">innodb_flush_log_at_trx_commit</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">sync_binlog</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#双主需要配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">log-slave-updates</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置哪些数据库不进行复制</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">performance_schema</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">sys</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置哪些数据库变化不记录binlog</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">performance_schema</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-ignore-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">sys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置记录binlog的库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">binlog-do-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ry_vue</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#设置需要复制的数据库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">replicate-do-db</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ry_vue</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#控制 AUTO_INCREMENT 序列的起始值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">auto_increment_offset</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#控制 AUTO_INCREMENT 列值的增量</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">auto_increment_increment</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#标识唯一的服务器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">server-id</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#启用二进制日志功能 设置文件名字</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">log-bin</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">mysql-bin-master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启mysql服务后，授予从机复制权限</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CREATE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> USER</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;root&#39;@&#39;192.168.152.129&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> IDENTIFIED</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> WITH</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> mysql_native_password</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> BY</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;123456&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">GRANT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> REPLICATION</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> SLAVE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> TO</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;root&#39;@&#39;192.168.152.129&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">FLUSH</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> PRIVILEGES</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2开启同步" tabindex="-1"><a class="header-anchor" href="#_2-2开启同步"><span>2.2开启同步</span></a></h4><p>masterA<br> 查看主库状态</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">+-------------------------+----------+--------------+------------------------------+-------------------+</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> File</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">                    |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Position</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Binlog_Do_DB</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Binlog_Ignore_DB</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">             |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Executed_Gtid_Set</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">+-------------------------+----------+--------------+------------------------------+-------------------+</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> mysql-bin-master.000003</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   157064</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ry_vue</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">       |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> mysql,performance_schema,sys</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">                   |</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">+-------------------------+----------+--------------+------------------------------+-------------------+</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置同步信息</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">stop</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> slave</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">change</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master_host=&#39;192.168.152.130&#39;,master_port=3306,master_user=&#39;root&#39;,master_password=&#39;123456&#39;,master_log_file=&#39;mysql-bin-master.000003&#39;,master_log_pos=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">157064</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">start</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> slave</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> slave</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> status</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\G</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>masterB<br> 查看主库状态</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">+-------------------------+----------+--------------+------------------------------+-------------------+</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> File</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">                    |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Position</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Binlog_Do_DB</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Binlog_Ignore_DB</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">             |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Executed_Gtid_Set</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">+-------------------------+----------+--------------+------------------------------+-------------------+</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> mysql-bin-master.000003</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   157064</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ry_vue</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">       |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> mysql,performance_schema,sys</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">                   |</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">+-------------------------+----------+--------------+------------------------------+-------------------+</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置同步信息</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">stop</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> slave</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">change</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master_host=&#39;192.168.152.129&#39;,master_port=3306,master_user=&#39;root&#39;,master_password=&#39;123456&#39;,master_log_file=&#39;mysql-bin-master.000003&#39;,master_log_pos=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">157064</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">start</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> slave</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> slave</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> status</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\G</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果Slave_IO_Running和Slave_SQL_Running都为Yes,则同步成功。<br> 如果未同步成功，可查看Last_IO_Error和Last_SQL_Error报错信息，排查问题</p><div class="hint-container caution"><p class="hint-container-title">警告</p><p>多主需要考虑自增长ID问题，这个需要特别设置配置文件，比如双主，可以使用奇偶，总之，主之间设置自增长ID相互不冲突就能完美解决自增长ID冲突问题。</p></div>`,37),h=[e];function t(k,p){return a(),i("div",null,h)}const g=s(l,[["render",t],["__file","Mysql-Dual-Machine-Configuration.html.vue"]]),c=JSON.parse('{"path":"/DB/MySql/Mysql-Dual-Machine-Configuration.html","title":"MySql双主模式搭建","lang":"zh-CN","frontmatter":{"title":"MySql双主模式搭建","category":"数据库","tag":["MySql"],"description":"为什么要配置成双主 提示 在企业中，很多都是使用mysql主从方案，一主多从，读写分离等，但是单主存在单点故障，从库切换成主库需要作改动。因此，如果是双主或者多主，就会增加mysql入口，增加高可用。 MySQL双主（主主）架构方案思路是 两台mysql都可读写，互为主备，默认只使用一台（masterA）负责数据的写入，另一台（masterB）备用； ...","head":[["meta",{"property":"og:url","content":"https://alittlecrazy.github.io/DB/MySql/Mysql-Dual-Machine-Configuration.html"}],["meta",{"property":"og:site_name","content":"Code wins arguments"}],["meta",{"property":"og:title","content":"MySql双主模式搭建"}],["meta",{"property":"og:description","content":"为什么要配置成双主 提示 在企业中，很多都是使用mysql主从方案，一主多从，读写分离等，但是单主存在单点故障，从库切换成主库需要作改动。因此，如果是双主或者多主，就会增加mysql入口，增加高可用。 MySQL双主（主主）架构方案思路是 两台mysql都可读写，互为主备，默认只使用一台（masterA）负责数据的写入，另一台（masterB）备用； ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-10T07:42:02.000Z"}],["meta",{"property":"article:author","content":"DaXian"}],["meta",{"property":"article:tag","content":"MySql"}],["meta",{"property":"article:modified_time","content":"2024-06-10T07:42:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySql双主模式搭建\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-10T07:42:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DaXian\\"}]}"]]},"headers":[{"level":2,"title":"为什么要配置成双主","slug":"为什么要配置成双主","link":"#为什么要配置成双主","children":[]},{"level":2,"title":"MySQL双主（主主）架构方案思路是","slug":"mysql双主-主主-架构方案思路是","link":"#mysql双主-主主-架构方案思路是","children":[]},{"level":2,"title":"主主环境搭建过程（这里只介绍两台主的配置方案）","slug":"主主环境搭建过程-这里只介绍两台主的配置方案","link":"#主主环境搭建过程-这里只介绍两台主的配置方案","children":[{"level":3,"title":"1.安装mysql服务","slug":"_1-安装mysql服务","link":"#_1-安装mysql服务","children":[]},{"level":3,"title":"2.配置主主同步","slug":"_2-配置主主同步","link":"#_2-配置主主同步","children":[]}]}],"git":{"createdTime":1717948070000,"updatedTime":1718005322000,"contributors":[{"name":"JDaXian","email":"81696676@qq.com","commits":2}]},"readingTime":{"minutes":3.77,"words":1130},"filePathRelative":"DB/MySql/Mysql-Dual-Machine-Configuration.md","localizedDate":"2024年6月9日","autoDesc":true}');export{g as comp,c as data};
