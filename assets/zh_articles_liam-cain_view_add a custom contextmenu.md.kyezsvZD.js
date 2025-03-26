import{_ as s,c as a,o as i,V as n}from"./chunks/framework.qP9-rlTe.js";const u=JSON.parse('{"title":"添加自定义上下文菜单","description":"","frontmatter":{"title":"添加自定义上下文菜单","source":"https://liamca.in/Obsidian/API+FAQ/views/add+a+custom+contextmenu","created":"2025-03-26T00:00:00.000Z","tags":["clippings"]},"headers":[],"relativePath":"zh/articles/liam-cain/view/add a custom contextmenu.md","filePath":"zh/articles/liam-cain/view/add a custom contextmenu.md","lastUpdated":1742991136000}'),e={name:"zh/articles/liam-cain/view/add a custom contextmenu.md"},l=n(`<h1 id="如何为视图添加上下文菜单" tabindex="-1">如何为视图添加上下文菜单？ <a class="header-anchor" href="#如何为视图添加上下文菜单" aria-label="Permalink to &quot;如何为视图添加上下文菜单？&quot;">​</a></h1><p><a href="https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq" target="_blank" rel="noreferrer">#obsidian/api/faq</a></p><h2 id="文件感知型上下文菜单" tabindex="-1">文件感知型上下文菜单 <a class="header-anchor" href="#文件感知型上下文菜单" aria-label="Permalink to &quot;文件感知型上下文菜单&quot;">​</a></h2><p>如果要为视图添加上下文菜单，可以在<a href="https://liamca.in/Obsidian/Workspace" target="_blank" rel="noreferrer">Workspace</a>上触发<code>file-menu</code>事件。</p><p>触发<code>file-menu</code>意味着所有监听该事件的插件都有机会在菜单通过<code>.showAtPosition()</code>显示前添加<code>MenuItem</code>。默认情况下，这会添加一些文件相关选项，如&quot;复制链接&quot;、&quot;在文件管理器中显示&quot;等。其他插件也可以监听此事件并添加自己的条目。</p><h3 id="示例代码" tabindex="-1">示例代码 <a class="header-anchor" href="#示例代码" aria-label="Permalink to &quot;示例代码&quot;">​</a></h3><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> fileMenu</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Menu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 创建空文件菜单</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 钩子函数让插件可以添加&quot;文件感知&quot;菜单项</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.app.workspace.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;file-menu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  fileMenu, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  file, </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;my-context-menu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fileMenu.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">showAtPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ x: event.pageX, y: event.pageY }); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 实际打开菜单</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="完全自定义的上下文菜单" tabindex="-1">完全自定义的上下文菜单 <a class="header-anchor" href="#完全自定义的上下文菜单" aria-label="Permalink to &quot;完全自定义的上下文菜单&quot;">​</a></h2><p>如果不想在上下文菜单中包含这些默认条目，可以不触发<code>file-menu</code>事件，而是直接添加自己的<code>MenuItem</code>。</p><h3 id="示例代码-1" tabindex="-1">示例代码 <a class="header-anchor" href="#示例代码-1" aria-label="Permalink to &quot;示例代码&quot;">​</a></h3><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> myMenu</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Menu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  myMenu.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    item</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;我的自定义操作&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;trash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        myCustomFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  );</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,11),t=[l];function p(h,k,r,d,c,o){return i(),a("div",null,t)}const g=s(e,[["render",p]]);export{u as __pageData,g as default};
