import{j as h,P as O,ag as k,ah as w,l as v,ɵ as y,w as d,ai as x,x as l,aj as P,ak as T,al as B,am as A,ac as S,a as o,e as u,b as s,d as a,I as r,y as e,W as b,G as _,ad as p,Q as j,R as I,T as z,V as m,af as L,M}from"./index-nZOzKHyg.js";import{S as F,a as D}from"./sticky-navigation.component-q32BHYhV.js";import{M as G}from"./meta.service-Dh6hi_P0.js";const R=n=>({keyword:n});function $(n,i){if(n&1&&u(0,"img",4),n&2){const t=_();r("src",t.attributes.thumbnail.header,p)}}function q(n,i){if(n&1&&(o(0,"span")(1,"time",15),s(2),x(3,"date"),a()()),n&2){const t=_(2);e(2),b(P(3,1,t.attributes.updated))}}function W(n,i){if(n&1&&(o(0,"span")(1,"button",16),s(2),a()()),n&2){const t=i.$implicit;e(),r("queryParams",L(3,R,t)),M("aria-label","Stichwort: "+t),e(),m(" ",t," ")}}function E(n,i){if(n&1&&u(0,"img",18),n&2){const t=_(3);r("src",t.attributes.publishedAt.logo,p)}}function H(n,i){if(n&1&&(o(0,"div",14)(1,"div")(2,"a",17),d(3,E,1,1,"img",18),a()(),o(4,"div"),s(5," Original veröffentlicht auf "),o(6,"a",19),s(7),a(),s(8,". "),a()()),n&2){const t=_(2);e(2),r("href",t.attributes.publishedAt.url,p)("lang",t.attributes.language||"de"),M("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),e(),l(t.attributes.publishedAt.logo?3:-1),e(3),r("href",t.attributes.publishedAt.url,p)("lang",t.attributes.language||"de"),e(),b(t.attributes.publishedAt.name)}}function N(n,i){if(n&1&&(o(0,"section",5)(1,"div",11),d(2,q,4,3,"span"),o(3,"h2",12),s(4,"Stichwörter"),a()(),o(5,"div",13),j(6,W,3,5,"span",null,I),a(),d(8,H,9,7,"div",14),a()),n&2){const t=_();e(2),l(t.attributes.updated?2:-1),e(4),z(t.attributes.keywords),e(2),l(t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?8:-1)}}function Q(n,i){if(n&1&&(o(0,"a",19),s(1,"Dev.to"),a()),n&2){const t=_(2);r("href",t.attributes.linked.devTo,p)("lang",t.attributes.language||"de")}}function U(n,i){n&1&&s(0," | ")}function V(n,i){if(n&1&&(o(0,"a",19),s(1,"Medium.com"),a()),n&2){const t=_(2);r("href",t.attributes.linked.medium,p)("lang",t.attributes.language||"de")}}function J(n,i){if(n&1&&(o(0,"section",6),d(1,Q,2,2,"a",19)(2,U,1,0)(3,V,2,2,"a",19),a()),n&2){const t=_();e(),l(t.attributes.linked.devTo?1:-1),e(),l(t.attributes.linked.devTo&&t.attributes.linked.medium?2:-1),e(),l(t.attributes.linked.medium?3:-1)}}function K(n,i){if(n&1&&u(0,"dk-series-list",7),n&2){const t=_();r("series",t.attributes.series)}}function X(n,i){n&1&&s(0," Read On: ")}function Y(n,i){n&1&&s(0," Weiterlesen auf ")}function Z(n,i){if(n&1&&(o(0,"div"),s(1),a(),o(2,"a",20),s(3,"→ "),d(4,X,1,0)(5,Y,1,0),s(6),a()),n&2){const t=_();e(),m(" ",t.attributes.description," "),e(),r("href",t.attributes.publishedAt.url,p)("lang",t.attributes.language||"de"),e(2),l(t.attributes.language==="en"?4:5),e(2),m(" ",t.attributes.publishedAt.name,"")}}function tt(n,i){if(n&1&&(o(0,"div",10)(1,"a",21),s(2," Auf GitHub bearbeiten "),a()()),n&2){const t=_(),g=_();e(),r("href",g.editOnGithubLink(t.filename),p)}}function nt(n,i){if(n&1&&(o(0,"article",0),u(1,"dk-sticky-navigation",1),o(2,"div",2)(3,"h1"),s(4),a(),o(5,"section",3),d(6,$,1,1,"img",4),a(),d(7,N,9,2,"section",5)(8,J,4,3,"section",6)(9,K,1,1,"dk-series-list",7),o(10,"section",8),u(11,"analog-markdown",9),d(12,Z,7,5)(13,tt,3,1,"div",10),a()()()),n&2){const t=i;r("lang",t.attributes.language),e(),r("content",t.content),e(3),b(t.attributes.title),e(2),l(t.attributes.thumbnail&&t.attributes.thumbnail.header?6:-1),e(),l(t.attributes.keywords?7:-1),e(),l(t.attributes.linked?8:-1),e(),l(t.attributes.series?9:-1),e(2),r("lang",t.attributes.language||"de")("content",t.content),e(),l(!t.content&&t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?12:13)}}const c=class c{constructor(){this.metaService=h(G),this.platformId=h(O),this.post$=k({param:"slug",subdirectory:"blog"}).pipe(w(i=>this.metaService.createMetaDataForPost("blog",i))),this.isBrowser=v(this.platformId)}editOnGithubLink(i){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${i}.md`}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=y({type:c,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt",3,"lang"],[3,"content"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","lang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","lang"],[1,"external-article",3,"href","lang"],["rel","noopener noreferrer",3,"href"]],template:function(t,g){if(t&1&&(d(0,nt,14,10,"article",0),x(1,"async")),t&2){let C;l((C=P(1,1,g.post$))?0:-1,C)}},dependencies:[T,B,A,S,F,D],styles:[`.wrapper[_ngcontent-%COMP%] {
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
  margin-top: 0.5rem;
  font-size: 1.25rem;
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
  max-height: 400px;
  object-fit: cover;
  border-radius: 1ch;
  overflow: hidden;
  box-shadow: 0 3px 2px hsla(0, 0%, 0%, 0.02), 0 7px 5px hsla(0, 0%, 0%, 0.03), 0 13px 10px hsla(0, 0%, 0%, 0.04), 0 22px 18px hsla(0, 0%, 0%, 0.05), 0 42px 33px hsla(0, 0%, 0%, 0.06), 0 100px 80px hsla(0, 0%, 0%, 0.07);
  margin-bottom: 1rem;
}`]});let f=c;export{f as default};
