import{j as b,P as k,ag as O,ah as w,l as y,ɵ as v,w as d,ai as f,x as l,aj as x,ak as T,al as A,am as B,ac as S,a as o,e as u,b as _,d as a,G as s,y as e,I as r,W as C,ad as p,Q as j,R as I,T as z,V as P,af as L,M}from"./index-DVCeWGdg.js";import{S as F,a as D}from"./sticky-navigation.component-wkgpe0yI.js";import{M as G}from"./meta.service-BregHdo5.js";const $=t=>({keyword:t});function R(t,i){if(t&1&&u(0,"img",4),t&2){const n=s(2);r("src",n.attributes.thumbnail.header,p)}}function q(t,i){if(t&1&&(o(0,"span")(1,"time",16),_(2),f(3,"date"),a()()),t&2){const n=s(3);e(2),C(x(3,1,n.attributes.updated))}}function E(t,i){if(t&1&&(o(0,"span")(1,"button",17),_(2),a()()),t&2){const n=i.$implicit;e(),r("queryParams",L(3,$,n)),M("aria-label","Stichwort: "+n),e(),P(" ",n," ")}}function H(t,i){if(t&1&&u(0,"img",19),t&2){const n=s(4);r("src",n.attributes.publishedAt.logo,p)}}function N(t,i){if(t&1&&(o(0,"div",15)(1,"div")(2,"a",18),d(3,H,1,1,"img",19),a()(),o(4,"div"),_(5," Original veröffentlicht auf "),o(6,"a",20),_(7),a(),_(8,". "),a()()),t&2){const n=s(3);e(2),r("href",n.attributes.publishedAt.url,p)("lang",n.attributes.language||"de"),M("aria-label","Original veröffentlicht auf "+n.attributes.publishedAt.name),e(),l(n.attributes.publishedAt.logo?3:-1),e(3),r("href",n.attributes.publishedAt.url,p)("lang",n.attributes.language||"de"),e(),C(n.attributes.publishedAt.name)}}function Q(t,i){if(t&1&&(o(0,"section",5)(1,"div",12),d(2,q,4,3,"span"),o(3,"h2",13),_(4,"Stichwörter"),a()(),o(5,"div",14),j(6,E,3,5,"span",null,I),a(),d(8,N,9,7,"div",15),a()),t&2){const n=s(2);e(2),l(n.attributes.updated?2:-1),e(4),z(n.attributes.keywords),e(2),l(n.attributes.publishedAt&&n.attributes.publishedAt.name&&n.attributes.publishedAt.url?8:-1)}}function U(t,i){if(t&1&&(o(0,"a",20),_(1,"Dev.to"),a()),t&2){const n=s(3);r("href",n.attributes.linked.devTo,p)("lang",n.attributes.language||"de")}}function V(t,i){t&1&&_(0," | ")}function W(t,i){if(t&1&&(o(0,"a",20),_(1,"Medium.com"),a()),t&2){const n=s(3);r("href",n.attributes.linked.medium,p)("lang",n.attributes.language||"de")}}function Z(t,i){if(t&1&&(o(0,"section",6),d(1,U,2,2,"a",20)(2,V,1,0)(3,W,2,2,"a",20),a()),t&2){const n=s(2);e(),l(n.attributes.linked.devTo?1:-1),e(),l(n.attributes.linked.devTo&&n.attributes.linked.medium?2:-1),e(),l(n.attributes.linked.medium?3:-1)}}function J(t,i){if(t&1&&u(0,"dk-series-list",7),t&2){const n=s(2);r("series",n.attributes.series)}}function K(t,i){if(t&1&&(o(0,"a",10),_(1),a()),t&2){const n=s(2);r("href",n.attributes.publishedAt.url,p)("lang",n.attributes.language||"de"),e(),P("Zum externen Artikel auf ",n.attributes.publishedAt.name,"")}}function X(t,i){if(t&1&&(o(0,"div",11)(1,"a",21),_(2," Auf GitHub bearbeiten "),a()()),t&2){const n=s(2),g=s();e(),r("href",g.editOnGithubLink(n.filename),p)}}function Y(t,i){if(t&1&&(o(0,"article",0),u(1,"dk-sticky-navigation",1),o(2,"div",2)(3,"h1"),_(4),a(),o(5,"section",3),d(6,R,1,1,"img",4),a(),d(7,Q,9,2,"section",5)(8,Z,4,3,"section",6)(9,J,1,1,"dk-series-list",7),o(10,"section",8),u(11,"analog-markdown",9),d(12,K,2,3,"a",10)(13,X,3,1,"div",11),a()()()),t&2){const n=s();e(),r("content",n.content),e(3),C(n.attributes.title),e(2),l(n.attributes.thumbnail&&n.attributes.thumbnail.header?6:-1),e(),l(n.attributes.keywords?7:-1),e(),l(n.attributes.linked?8:-1),e(),l(n.attributes.series?9:-1),e(2),r("lang",n.attributes.language||"de")("content",n.content),e(),l(!n.content&&n.attributes.publishedAt&&n.attributes.publishedAt.name&&n.attributes.publishedAt.url?12:13)}}function nn(t,i){if(t&1&&d(0,Y,14,9,"article",0),t&2){const n=i;l(n.attributes&&n.content?0:-1)}}const c=class c{constructor(){this.metaService=b(G),this.platformId=b(k),this.post$=O({param:"slug",subdirectory:"blog"}).pipe(w(i=>this.metaService.createMetaDataForPost("blog",i))),this.isBrowser=y(this.platformId)}editOnGithubLink(i){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${i}.md`}};c.ɵfac=function(n){return new(n||c)},c.ɵcmp=v({type:c,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt"],[3,"content"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],["target","_blank",1,"external-article",3,"href","lang"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","lang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","lang"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(n,g){if(n&1&&(d(0,nn,1,1),f(1,"async")),n&2){let m;l((m=x(1,1,g.post$))?0:-1,m)}},dependencies:[T,A,B,S,F,D],styles:[`.wrapper[_ngcontent-%COMP%] {
  margin-top: 0;
}

h1[_ngcontent-%COMP%] {
  font-size: 1.4em;
}

.extra-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-content: baseline;
}

.actions[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.published-at[_ngcontent-%COMP%], 
.external-links[_ngcontent-%COMP%], 
.edit-on-github[_ngcontent-%COMP%] {
  margin: 30px 0;
}

.published-at[_ngcontent-%COMP%] {
  height: 50px;
}

.published-at[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  line-height: 1.2em;
}

.published-at[_ngcontent-%COMP%]   .published-at-link[_ngcontent-%COMP%] {
  text-decoration: none;
  border: none;
  min-width: 120px;
}

.published-at[_ngcontent-%COMP%]   .published-at-link[_ngcontent-%COMP%]   .published-at-logo[_ngcontent-%COMP%] {
  padding-right: 20px;
  max-height: 60px;
}

.external-article[_ngcontent-%COMP%] {
  font-weight: bold;
  font-size: 1.2rem;
}

.extra-section[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {
  padding-bottom: 10px;
}

span.image[_ngcontent-%COMP%]    > img.thumbnail[_ngcontent-%COMP%] {
  max-width: 80px;
}

@media screen and (max-width: 560px) {
  .blog-footer[_ngcontent-%COMP%] {
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    background: #2e3141;
    opacity: 0.9;
    z-index: 1;
    padding: 0 35px;
  }
  .blog-footer[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%], 
   .blog-footer[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    display: none;
  }
  .blog-footer[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%] {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
  .blog-footer[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%] {
    padding-left: 0px;
  }
}

@media screen and (max-width: 460px) {
  .extra-info[_ngcontent-%COMP%] {
    display: block;
  }
}

@media screen and (max-width: 360px) {
  .blog-footer[_ngcontent-%COMP%] {
    padding: 0 24px;
  }
}

.blog-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  display: block;
  inline-size: 100%;
  block-size: auto;
  object-fit: cover;
  border-radius: 1ch;
  overflow: hidden;
  box-shadow: 0 3px 2px hsla(0, 0%, 0%, 0.02), 0 7px 5px hsla(0, 0%, 0%, 0.03), 0 13px 10px hsla(0, 0%, 0%, 0.04), 0 22px 18px hsla(0, 0%, 0%, 0.05), 0 42px 33px hsla(0, 0%, 0%, 0.06), 0 100px 80px hsla(0, 0%, 0%, 0.07);
  margin-bottom: 1rem;
}`]});let h=c;export{h as default};
