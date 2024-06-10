import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,e as n}from"./app-83hyy83m.js";const l={},e=n(`<h2 id="keepalived介绍" tabindex="-1"><a class="header-anchor" href="#keepalived介绍"><span>keepalived介绍</span></a></h2><h2 id="keepalived安装" tabindex="-1"><a class="header-anchor" href="#keepalived安装"><span>keepalived安装</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> keepalived</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="keepalived配置文件介绍" tabindex="-1"><a class="header-anchor" href="#keepalived配置文件介绍"><span>keepalived配置文件介绍</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">global_defs</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   notification_email</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">     acassen@firewall.loc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">     failover@firewall.loc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">     sysadmin@firewall.loc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">   }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   notification_email_from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Alexandre.Cassen@firewall.loc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   smtp_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   smtp_connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 30</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   router_id</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> LVS_DEVEL</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   vrrp_skip_check_adv_addr</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   vrrp_strict</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   vrrp_garp_interval</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">   vrrp_gna_interval</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">vrrp_instance</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> VI_1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> MASTER</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    interface</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> eth0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    virtual_router_id</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 51</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    priority</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    advert_int</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    authentication</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        auth_type</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> PASS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        auth_pass</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1111</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    virtual_ipaddress</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        192.168.200.16</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        192.168.200.17</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        192.168.200.18</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">virtual_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 443</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    delay_loop</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 6</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    lb_algo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> rr</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    lb_kind</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> NAT</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    persistence_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 50</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    protocol</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> TCP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    real_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.201.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 443</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        SSL_GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ff20ad2481f97b1754ef3e12ecd3a9cc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /mrtg/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 9b3a0c85a887a256d6939da88aabd8cd</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            nb_get_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            delay_before_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">virtual_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10.10.10.2</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    delay_loop</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 6</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    lb_algo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> rr</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    lb_kind</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> NAT</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    persistence_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 50</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    protocol</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> TCP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    sorry_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.200</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    real_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.2</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        HTTP_GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl2/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl3/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            nb_get_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            delay_before_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    real_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.3</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        HTTP_GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl2/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            nb_get_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            delay_before_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">virtual_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10.10.10.3</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    delay_loop</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    lb_algo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> rr</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    lb_kind</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> NAT</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    persistence_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 50</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    protocol</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> TCP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    real_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.4</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        HTTP_GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl2/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl3/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            nb_get_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            delay_before_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    real_server</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 192.168.200.5</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1358</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        weight</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        HTTP_GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl2/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> {</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              path</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /testurl3/test.jsp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">              digest</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 640205b7b0fc66c1ea91c463fac6334d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            nb_get_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">            delay_before_retry</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),p=[e];function h(k,t){return a(),i("div",null,p)}const c=s(l,[["render",h],["__file","keepalived.html.vue"]]),F=JSON.parse('{"path":"/Linux/keepalived/keepalived.html","title":"keepalived安装和介绍","lang":"zh-CN","frontmatter":{"title":"keepalived安装和介绍","category":"Linux","tag":["keepalived"],"description":"keepalived介绍 keepalived安装 keepalived配置文件介绍","head":[["meta",{"property":"og:url","content":"https://alittlecrazy.github.io/Linux/keepalived/keepalived.html"}],["meta",{"property":"og:site_name","content":"Code wins arguments"}],["meta",{"property":"og:title","content":"keepalived安装和介绍"}],["meta",{"property":"og:description","content":"keepalived介绍 keepalived安装 keepalived配置文件介绍"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-10T10:53:08.000Z"}],["meta",{"property":"article:author","content":"DaXian"}],["meta",{"property":"article:tag","content":"keepalived"}],["meta",{"property":"article:modified_time","content":"2024-06-10T10:53:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"keepalived安装和介绍\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-10T10:53:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DaXian\\"}]}"]]},"headers":[{"level":2,"title":"keepalived介绍","slug":"keepalived介绍","link":"#keepalived介绍","children":[]},{"level":2,"title":"keepalived安装","slug":"keepalived安装","link":"#keepalived安装","children":[]},{"level":2,"title":"keepalived配置文件介绍","slug":"keepalived配置文件介绍","link":"#keepalived配置文件介绍","children":[]}],"git":{"createdTime":1718016788000,"updatedTime":1718016788000,"contributors":[{"name":"JDaXian","email":"81696676@qq.com","commits":1}]},"readingTime":{"minutes":0.8,"words":239},"filePathRelative":"Linux/keepalived/keepalived.md","localizedDate":"2024年6月10日","autoDesc":true}');export{c as comp,F as data};
