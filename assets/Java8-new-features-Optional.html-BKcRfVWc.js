import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,e as t}from"./app-Bt2uoH6Y.js";const n={},e=t(`<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1.简介</span></a></h2><p>为了防止空指针异常的出现，Java8中引入了一个新类Optional，对于它之前我们已经进行了简单的实现。其本质就是通过Optional类对值进行封装，当有值的时候，会把该值封装到Optional类中。如果没有值的话，则会在该类封装一个Empty。</p><h3 id="_1-1-创建optional对象" tabindex="-1"><a class="header-anchor" href="#_1-1-创建optional对象"><span>1.1 创建Optional对象</span></a></h3><p>要创建Optional，该类提供了三种方法操作，分别为：empty()、of()、ofNullable()。使用方式如下所示：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Student</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> student </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Student</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 18</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;M&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;zhangsan&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Optional</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Student</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> optional </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Optional</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">empty</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Optional</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Student</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> optional2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Optional</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">of</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(student);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Optional</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Student</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> optional3 </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Optional</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ofNullable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(student);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[e];function p(h,k){return s(),a("div",null,l)}const d=i(n,[["render",p],["__file","Java8-new-features-Optional.html.vue"]]),g=JSON.parse('{"path":"/Java/Java8/Java8-new-features-Optional.html","title":"Optional","lang":"zh-CN","frontmatter":{"title":"Optional","category":"Java","tag":["Java8"],"description":"1.简介 为了防止空指针异常的出现，Java8中引入了一个新类Optional，对于它之前我们已经进行了简单的实现。其本质就是通过Optional类对值进行封装，当有值的时候，会把该值封装到Optional类中。如果没有值的话，则会在该类封装一个Empty。 1.1 创建Optional对象 要创建Optional，该类提供了三种方法操作，分别为：em...","head":[["meta",{"property":"og:url","content":"https://alittlecrazy.github.io/Java/Java8/Java8-new-features-Optional.html"}],["meta",{"property":"og:site_name","content":"Code wins arguments"}],["meta",{"property":"og:title","content":"Optional"}],["meta",{"property":"og:description","content":"1.简介 为了防止空指针异常的出现，Java8中引入了一个新类Optional，对于它之前我们已经进行了简单的实现。其本质就是通过Optional类对值进行封装，当有值的时候，会把该值封装到Optional类中。如果没有值的话，则会在该类封装一个Empty。 1.1 创建Optional对象 要创建Optional，该类提供了三种方法操作，分别为：em..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T15:21:01.000Z"}],["meta",{"property":"article:author","content":"DaXian"}],["meta",{"property":"article:tag","content":"Java8"}],["meta",{"property":"article:modified_time","content":"2024-06-30T15:21:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Optional\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-30T15:21:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DaXian\\"}]}"]]},"headers":[{"level":2,"title":"1.简介","slug":"_1-简介","link":"#_1-简介","children":[{"level":3,"title":"1.1 创建Optional对象","slug":"_1-1-创建optional对象","link":"#_1-1-创建optional对象","children":[]}]}],"git":{"createdTime":1719760861000,"updatedTime":1719760861000,"contributors":[{"name":"JDaXian","email":"81696676@qq.com","commits":1}]},"readingTime":{"minutes":0.52,"words":156},"filePathRelative":"Java/Java8/Java8-new-features-Optional.md","localizedDate":"2024年6月30日","autoDesc":true}');export{d as comp,g as data};