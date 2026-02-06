const s=`---
title: 'Route based navigation menus in Vue'
description: 'Learn how to build a dynamic navigation menu based on the route configuration using Vue3 and Vue Router.'
published: true
author:
  name: 'Danny Koppenhagen'
  mail: mail@k9n.dev
created: 2022-12-19
updated: 2022-12-19
keywords:
  - Vue
  - Vue 3
  - Vue Router
language: en
thumbnail:
  header: images/blog/vue-route-menu/vue-route-menu.jpg
  card: images/blog/vue-route-menu/vue-route-menu-small.jpg
linked:
  devTo: 'https://dev.to/dkoppenhagen/route-based-navigation-menus-in-vue-od2'
---

<p>Recently while working on a <a href="https://vuejs.org/">Vue</a> app, I asked myself: Isn’t the main navigation menu somehow related to the configuration of the routes and routing tree? And can&#39;t it be built dynamically from the router configuration?</p><p>With this question in my mind, I started to work on a very simple but representative example of how to achieve this by enriching the route configuration using the <code>meta</code> option.</p><p>The following example allows you to easily place big parts of your app into a module that is self contained and only exposes a bit of route configuration which can be imported and included in the main router configuration.</p><p>The app has a simple navigation component that extracts all available routes provided by the <a href="https://router.vuejs.org/">Vue Router</a>.
These routes have all the information needed by a navigation item to build a menu point and define the routing target.</p><p>The following picture shows an high level overview of the architecture.</p><p><img src="images/blog/vue-route-menu/nav-structure.drawio.svg" alt="Planned structure"></p><h2 id="tldr-1">TL;DR</h2>
<p>You can check out the complete working example with the source code in the following Stackblitz project:</p><p><a href="https://stackblitz.com/edit/vue3-dynamic-menu">https://stackblitz.com/edit/vue3-dynamic-menu</a></p><h2 id="basic-app-setup">basic app setup</h2>
<p>Let&#39;s create a simple Vue project using Vue3 and Vue-Router.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> init</span><span style="color:#9ECBFF"> vue@latest</span></span>
<span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> i</span><span style="color:#9ECBFF"> vue-router@4</span></span></code></pre>
<h2 id="setup-the-router">Setup the router</h2>
<p>First we need the basic route configuration which represents the routing tree and in the end our menu structure.</p><p>We want to focus on the basic menu configuration and the initial page we are loading.
Therefore we will create the <code>MainPage</code> component which we can place in the <code>src/components</code> directory.
The component should simply display its name for demonstartion purpose:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">script</span><span style="color:#B392F0"> setup</span><span style="color:#B392F0"> lang</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ts"</span><span style="color:#E1E4E8">>&#x3C;/</span><span style="color:#85E89D">script</span><span style="color:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">>MainPage.vue&#x3C;/</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>The next thing we want to do is to setup the route for this component.
Therefore we are creating the <code>router.ts</code> file within the <code>src</code> directory.
We are importing the <code>MainPage</code> component and using it for the route <code>main</code>.
Furthermore we are adding a redirect to &quot;<code>/main</code>&quot; when the root-route &quot;<code>/</code>&quot; is opened.
To be able to get the displayble menu label later, we add the <code>meta</code> object to the route configuration containing the <code>label</code>.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { createRouter, createWebHistory, </span><span style="color:#F97583">type</span><span style="color:#E1E4E8"> RouteRecordRaw } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'vue-router'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> MainPage </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './components/MainPage.vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> const</span><span style="color:#79B8FF"> routes</span><span style="color:#F97583">:</span><span style="color:#B392F0"> RouteRecordRaw</span><span style="color:#E1E4E8">[] </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> [</span></span>
<span class="line"><span style="color:#6A737D">  //default route redirection</span></span>
<span class="line"><span style="color:#E1E4E8">  { path: </span><span style="color:#9ECBFF">'/'</span><span style="color:#E1E4E8">, redirect: { name: </span><span style="color:#9ECBFF">'main'</span><span style="color:#E1E4E8"> } },</span></span>
<span class="line"><span style="color:#6A737D">  // common app routes</span></span>
<span class="line"><span style="color:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#E1E4E8">    path: </span><span style="color:#9ECBFF">'/main'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">    name: </span><span style="color:#9ECBFF">'main'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">    component: MainPage,</span></span>
<span class="line"><span style="color:#E1E4E8">    meta: {</span></span>
<span class="line"><span style="color:#E1E4E8">      label: </span><span style="color:#9ECBFF">'Main Page'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> const</span><span style="color:#79B8FF"> router</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> createRouter</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">  history: </span><span style="color:#B392F0">createWebHistory</span><span style="color:#E1E4E8">(),</span></span>
<span class="line"><span style="color:#E1E4E8">  routes,</span></span>
<span class="line"><span style="color:#E1E4E8">});</span></span></code></pre>
<p>The exported router must now be used in the <code>main.ts</code> file:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { createApp } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#9ECBFF"> './style.css'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> App </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './App.vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { getRouter } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './router'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { routes } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './app-section-1/routes'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">const</span><span style="color:#79B8FF"> app</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> createApp</span><span style="color:#E1E4E8">(App);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">app.</span><span style="color:#B392F0">use</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">getRouter</span><span style="color:#E1E4E8">(routes));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">app.</span><span style="color:#B392F0">mount</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'#app'</span><span style="color:#E1E4E8">);</span></span></code></pre>
<p>Now we have to add the <code><router-view /></code> to our <code>App.vue</code> file to be able to render the correct component routed by the Vue Router.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">script</span><span style="color:#B392F0"> setup</span><span style="color:#B392F0"> lang</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ts"</span><span style="color:#E1E4E8">>&#x3C;/</span><span style="color:#85E89D">script</span><span style="color:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">router-view</span><span style="color:#E1E4E8"> /></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span></code></pre>
<h2 id="build-the-menu-items-based-on-route-meta">Build the menu items based on route <code>meta</code></h2>
<p>So far so good: we’ve configured our first route so that we can later build a single menu item using the route configuration.</p><p>The next step is to create the navigation component (<code>AppNav</code>) that extracts the <code>meta</code> information from the route for the menu item and renders it. Therefore we have to filter for the occurrence of our provided meta data as we only want to display menu items that have a <code>label</code> configured in the <code>meta</code> information.</p><p>The result is an array of all relevant routes.
We iterate over the items with <code>v-for</code> and pass each element to a new component <code>NavItem</code> that takes a route configuration object for rendering a single navigation menu item.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">script</span><span style="color:#B392F0"> setup</span><span style="color:#B392F0"> lang</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ts"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { useRouter, useRoute } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'vue-router'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> NavItem </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './NavItem.vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">const</span><span style="color:#79B8FF"> router</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> useRouter</span><span style="color:#E1E4E8">();</span></span>
<span class="line"><span style="color:#F97583">const</span><span style="color:#79B8FF"> filteredRoutes</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> router.options.routes.</span><span style="color:#B392F0">filter</span><span style="color:#E1E4E8">((</span><span style="color:#FFAB70">r</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> r.meta?.label);</span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">script</span><span style="color:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">nav</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;</span><span style="color:#85E89D">ul</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">      &#x3C;</span><span style="color:#FDAEB7;font-style:italic">NavItem</span></span>
<span class="line"><span style="color:#B392F0">        v-for</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(routeConfig, index) in filteredRoutes"</span></span>
<span class="line"><span style="color:#B392F0">        :key</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"index"</span></span>
<span class="line"><span style="color:#B392F0">        :route-config</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"routeConfig"</span></span>
<span class="line"><span style="color:#E1E4E8">      /></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;/</span><span style="color:#85E89D">ul</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;/</span><span style="color:#85E89D">nav</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Before we forget, let&#39;s add the <code>AppNav</code> component to our <code>App</code> component above the <code><router-view /></code>:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">script</span><span style="color:#B392F0"> setup</span><span style="color:#B392F0"> lang</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ts"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> AppNav </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './components/AppNav.vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">script</span><span style="color:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#FDAEB7;font-style:italic">AppNav</span><span style="color:#E1E4E8"> /></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">hr</span><span style="color:#E1E4E8"> /></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">router-view</span><span style="color:#E1E4E8"> /></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Next, we create the <code>NavItem</code> component.
We are defining a single prop which gets passed by the parent component called <code>routeConfig</code> which contains a whole route configuration record.
Now we can focus on the template:
Add a <code><router-link></code> and pass the route target using the unique <code>name</code>.
For the label of the link we can use the <code>label</code> from our <code>meta</code> information object which we defined in the router configuration.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">script</span><span style="color:#B392F0"> setup</span><span style="color:#B392F0"> lang</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ts"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { computed } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#F97583"> type</span><span style="color:#E1E4E8"> { RouteRecordRaw } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'vue-router'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">const</span><span style="color:#79B8FF"> props</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> defineProps</span><span style="color:#E1E4E8">&#x3C;{</span></span>
<span class="line"><span style="color:#FFAB70">  routeConfig</span><span style="color:#F97583">:</span><span style="color:#B392F0"> RouteRecordRaw</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">}>();</span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">script</span><span style="color:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">li</span><span style="color:#B392F0"> class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"nav-item"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;</span><span style="color:#85E89D">router-link</span><span style="color:#B392F0"> :to</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"{ name: routeConfig.name }"</span><span style="color:#B392F0"> aria-current-value</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"page"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">      {{ routeConfig.meta.label }}</span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;/</span><span style="color:#85E89D">router-link</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;/</span><span style="color:#85E89D">li</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Great! The hardest part is now done (wasn&#39;t that tricky right?) and probably this solution already fit&#39;s for the majority.
However there are two things I would like to describe in advance, as they may be relevant for you:</p><ol>
<li>How to make the navigation easily extensible</li>
<li>How to implement child menu items</li>
</ol>
<h2 id="make-the-navigation-extensible">Make the navigation extensible</h2>
<p>Let&#39;s assume we have an extensible app where we outsource some pages and its child route configurations and make them includable in our app.
This could for example be relevent when adding complete menus and pages for specific users with appropriate permissions.</p><p>Therefore we want to make our route configuration extensible, so we can pass additional routes and child routes linked with their components to our router.</p><p>To do this, we simply move the exported route into a function that accepts a list of route configurations as a Rest parameter.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> function</span><span style="color:#B392F0"> getConfiguredRouter</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">...</span><span style="color:#FFAB70">pluginRoutes</span><span style="color:#F97583">:</span><span style="color:#B392F0"> RouteRecordRaw</span><span style="color:#E1E4E8">[][]) {</span></span>
<span class="line"><span style="color:#F97583">  return</span><span style="color:#B392F0"> createRouter</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">    history: </span><span style="color:#B392F0">createWebHistory</span><span style="color:#E1E4E8">(),</span></span>
<span class="line"><span style="color:#E1E4E8">    routes: [</span><span style="color:#F97583">...</span><span style="color:#E1E4E8">routes, </span><span style="color:#F97583">...</span><span style="color:#E1E4E8">pluginRoutes.</span><span style="color:#B392F0">flat</span><span style="color:#E1E4E8">()],</span></span>
<span class="line"><span style="color:#E1E4E8">  });</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Next we need to adjust our <code>main.ts</code> file.
We pass the result received from <code>getConfiguredRouter()</code> containing the additional routes we want to add.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { getConfiguredRouter } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './router'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { routes } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './app-section-1/routes'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#6A737D">/* ... */</span></span>
<span class="line"><span style="color:#E1E4E8">app.</span><span style="color:#B392F0">use</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">getConfiguredRouter</span><span style="color:#E1E4E8">(routes));</span></span>
<span class="line"><span style="color:#6A737D">/* ... */</span></span></code></pre>
<p>Let&#39;s create a new folder <code>app-section-1</code> simulating this kind of app plugin or modules containing the extensible part for our app.
Here we create another <code>routes.ts</code> file that holds the route configuration for this app part.</p><p>The configuration defines a base route that represents the main navigation item and redirects to its first child route <code>page-1</code>.
Here, we configure two child routes linked to their corresponding components which are created in the next step.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#F97583"> type</span><span style="color:#E1E4E8"> { RouteRecordRaw } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> 'vue-router'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> Page1 </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './components/Page1.vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> Page2 </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './components/Page2.vue'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> const</span><span style="color:#79B8FF"> routes</span><span style="color:#F97583">:</span><span style="color:#B392F0"> RouteRecordRaw</span><span style="color:#E1E4E8">[] </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> [</span></span>
<span class="line"><span style="color:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#E1E4E8">    path: </span><span style="color:#9ECBFF">'/app-section-1'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">    name: </span><span style="color:#9ECBFF">'appSection1'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">    redirect: { name: </span><span style="color:#9ECBFF">'appSection1Page1'</span><span style="color:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#E1E4E8">    meta: { label: </span><span style="color:#9ECBFF">'App Section 1'</span><span style="color:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#E1E4E8">    children: [</span></span>
<span class="line"><span style="color:#E1E4E8">      {</span></span>
<span class="line"><span style="color:#E1E4E8">        path: </span><span style="color:#9ECBFF">'page-1'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">        name: </span><span style="color:#9ECBFF">'appSection1Page1'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">        component: Page1,</span></span>
<span class="line"><span style="color:#E1E4E8">        meta: { label: </span><span style="color:#9ECBFF">'Page 1'</span><span style="color:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#E1E4E8">      {</span></span>
<span class="line"><span style="color:#E1E4E8">        path: </span><span style="color:#9ECBFF">'page-2'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">        name: </span><span style="color:#9ECBFF">'appSection1Page2'</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E1E4E8">        component: Page2,</span></span>
<span class="line"><span style="color:#E1E4E8">        meta: { label: </span><span style="color:#9ECBFF">'Page 2'</span><span style="color:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#E1E4E8">    ],</span></span>
<span class="line"><span style="color:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#E1E4E8">];</span></span></code></pre>
<p>We are creating the components <code>Page1</code> and <code>Page2</code> wihtin the <code>/src/app-section-1/components</code> directory.</p><p>Their implementation follows the one of the <code>MainPage</code> component: They simply display their component names in the template for demo purposes.</p><h2 id="render-child-menu-items">Render child menu items</h2>
<p>With the current version, we will already see both main navigation menu entries.
But as we configured child elements with <code>label</code>s, we also want to display them in the menu too.
Therefore we simply add the appropriate template in the <code>NavItem</code> component, as we already have everything we need by receiving the route configuration of the parent which contains all the information to render the child items.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">&#x3C;!-- ... --></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">li</span><span style="color:#B392F0"> class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"nav-item"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;</span><span style="color:#85E89D">router-link</span><span style="color:#B392F0"> :to</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"{ name: routeConfig.name }"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">      {{ routeConfig.meta.label }}</span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;/</span><span style="color:#85E89D">router-link</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;</span><span style="color:#85E89D">ul</span><span style="color:#B392F0"> v-if</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"routeConfig.children"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">      &#x3C;</span><span style="color:#85E89D">li</span></span>
<span class="line"><span style="color:#B392F0">        class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"child-item"</span></span>
<span class="line"><span style="color:#B392F0">        v-for</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(r, index) in routeConfig.children"</span></span>
<span class="line"><span style="color:#B392F0">        :key</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"index"</span></span>
<span class="line"><span style="color:#E1E4E8">      ></span></span>
<span class="line"><span style="color:#E1E4E8">        &#x3C;</span><span style="color:#85E89D">router-link</span><span style="color:#B392F0"> :to</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"{ name: r.name }"</span><span style="color:#B392F0"> aria-current-value</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"page"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">          {{ r.meta.label }}</span></span>
<span class="line"><span style="color:#E1E4E8">        &#x3C;/</span><span style="color:#85E89D">router-link</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">      &#x3C;/</span><span style="color:#85E89D">li</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;/</span><span style="color:#85E89D">ul</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;/</span><span style="color:#85E89D">li</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">template</span><span style="color:#E1E4E8">></span></span></code></pre>
<h2 id="styling-active-links">Styling active links</h2>
<p>To highlight the active menu items, we can now use the two automatically created CSS classes <code>router-link-active</code> and <code>router-link-exact-active</code>.</p><ul>
<li><code>router-link-active</code>: Matches when a part of the URL matches the target route path of the <code><router-link></code></li>
<li><code>router-link-exact-active</code>: Matches when the whole route in the URL matches the exact target route path of the <code><router-link></code></li>
</ul>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#85E89D">a</span><span style="color:#B392F0">.router-link-active</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#79B8FF">  background-color</span><span style="color:#E1E4E8">: </span><span style="color:#79B8FF">lightblue</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span>
<span class="line"><span style="color:#85E89D">a</span><span style="color:#B392F0">.router-link-exact-active</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#79B8FF">  background-color</span><span style="color:#E1E4E8">: </span><span style="color:#79B8FF">#f3aff8</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<h2 id="conclusion-4">Conclusion</h2>
<p>Passing meta information like <code>label</code> to the vue router configuration lets us easily build dynamic generated menus.
We no longer have to manually adjust our main navigation when adding new sites to our page as the menu is automatically extended by accessing the routes <code>meta</code> information.
This approach can reduce some template boilerplate.</p><p>You can use this approach to loosely couple whole parts of your app by adding them as separate modules without the need to add internals like the navigation titles to the main app part.</p><p>The whole working example can be seen in the following Stackblitz project:</p><p><a href="https://stackblitz.com/edit/vue3-dynamic-menu">https://stackblitz.com/edit/vue3-dynamic-menu</a></p><blockquote>
<p>Thanks for <a href="https://github.com/dc7590/">Darren Cooper</a> and <a href="https://github.com/jschirrmacher/">Joachim Schirrmacher</a> for reviewing this article.</p></blockquote>
`;export{s as default};
