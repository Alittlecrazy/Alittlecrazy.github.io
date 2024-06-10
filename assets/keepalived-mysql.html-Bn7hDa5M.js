import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,e as n}from"./app-83hyy83m.js";const l={},e=n(`<h2 id="前提条件" tabindex="-1"><a class="header-anchor" href="#前提条件"><span>前提条件</span></a></h2><ol><li>mysql双主集群搭建完毕,并启动</li><li>keepalived安装完成</li></ol><h2 id="mysql是否存活脚本" tabindex="-1"><a class="header-anchor" href="#mysql是否存活脚本"><span>mysql是否存活脚本</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#目录随意</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /usr/local/scripts</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#创建脚本文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> chk_mysql_alived.sh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#授予执行权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> u+x</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /usr/local/scripts/chk_mysql_alived.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>chk_mysql_alived.sh内容</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#!bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ss</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -tnl</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3306</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/dev/null</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> 2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">$?</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -eq</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">then</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot; mysql is alived &quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">    exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">else</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot; mysql is dead &quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> keepalived</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">    exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="keepalived-conf配置" tabindex="-1"><a class="header-anchor" href="#keepalived-conf配置"><span>keepalived.conf配置</span></a></h2><p>keepalived.conf配置文件在/etc/keepalived目录下<br> 主机配置</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Configuration</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> File</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">global_defs</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   router_id</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> LVS_DEVEL_1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">vrrp_script</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> chk_mysql_alived</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    script</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;/usr/local/scripts/chk_mysql_alived.sh&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    interval</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">vrrp_instance</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> VI_1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> BACKUP</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    interface</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ens33</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    track_interface</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        ens33</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    virtual_router_id</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 51</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    priority</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    advert_int</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    nopreempt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    authentication</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        auth_type</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> PASS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        auth_pass</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1111</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    track_script</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        chk_mysql_alived</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    virtual_ipaddress</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        192.168.152.131</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>备机配置</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Configuration</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> File</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">global_defs</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   router_id</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> LVS_DEVEL_2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">vrrp_script</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> chk_mysql_alived{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    script</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;/usr/local/scripts/chk_mysql_alived.sh&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    interval</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">vrrp_instance</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> VI_1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> BACKUP</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    interface</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ens33</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    track_interface</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        ens33</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    virtual_router_id</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 51</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    priority</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 99</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    advert_int</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    nopreempt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    authentication</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        auth_type</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> PASS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        auth_pass</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1111</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    virtual_ipaddress</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        192.168.152.131</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   track_script</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">     chk_mysql_alived</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动keepalived" tabindex="-1"><a class="header-anchor" href="#启动keepalived"><span>启动keepalived</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> keepalived</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> keepalived</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,13),h=[e];function t(p,k){return a(),i("div",null,h)}const c=s(l,[["render",t],["__file","keepalived-mysql.html.vue"]]),v=JSON.parse('{"path":"/Linux/keepalived/keepalived-mysql.html","title":"keepalived配置mysql双主热备","lang":"zh-CN","frontmatter":{"title":"keepalived配置mysql双主热备","category":"Linux","tag":["keepalived"],"description":"前提条件 mysql双主集群搭建完毕,并启动 keepalived安装完成 mysql是否存活脚本 chk_mysql_alived.sh内容 keepalived.conf配置 keepalived.conf配置文件在/etc/keepalived目录下 主机配置 备机配置 启动keepalived","head":[["meta",{"property":"og:url","content":"https://alittlecrazy.github.io/Linux/keepalived/keepalived-mysql.html"}],["meta",{"property":"og:site_name","content":"Code wins arguments"}],["meta",{"property":"og:title","content":"keepalived配置mysql双主热备"}],["meta",{"property":"og:description","content":"前提条件 mysql双主集群搭建完毕,并启动 keepalived安装完成 mysql是否存活脚本 chk_mysql_alived.sh内容 keepalived.conf配置 keepalived.conf配置文件在/etc/keepalived目录下 主机配置 备机配置 启动keepalived"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-10T10:53:08.000Z"}],["meta",{"property":"article:author","content":"DaXian"}],["meta",{"property":"article:tag","content":"keepalived"}],["meta",{"property":"article:modified_time","content":"2024-06-10T10:53:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"keepalived配置mysql双主热备\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-10T10:53:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DaXian\\"}]}"]]},"headers":[{"level":2,"title":"前提条件","slug":"前提条件","link":"#前提条件","children":[]},{"level":2,"title":"mysql是否存活脚本","slug":"mysql是否存活脚本","link":"#mysql是否存活脚本","children":[]},{"level":2,"title":"keepalived.conf配置","slug":"keepalived-conf配置","link":"#keepalived-conf配置","children":[]},{"level":2,"title":"启动keepalived","slug":"启动keepalived","link":"#启动keepalived","children":[]}],"git":{"createdTime":1718016788000,"updatedTime":1718016788000,"contributors":[{"name":"JDaXian","email":"81696676@qq.com","commits":1}]},"readingTime":{"minutes":0.72,"words":215},"filePathRelative":"Linux/keepalived/keepalived-mysql.md","localizedDate":"2024年6月10日","autoDesc":true}');export{c as comp,v as data};
