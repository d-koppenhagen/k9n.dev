import{i as h,P as O,D as k,E as w,f as v,ɵ as y,G as T,R as B,H as A,I as S,v as l,J as x,w as r,K as P,h as o,b as s,j as a,k as u,q as _,p as e,L as b,r as d,B as I,C as L,A as j,M,x as m,N as z,y as p}from"./index-CqhgQhz3.js";import{S as D}from"./series-list.component-CKD6pWue.js";import{M as F}from"./meta.service-DiX2RShP.js";const G=t=>({keyword:t});function R(t,i){if(t&1&&u(0,"img",3),t&2){const n=d();_("src",n.attributes.thumbnail.header,p)}}function $(t,i){if(t&1&&(o(0,"span")(1,"time",14),s(2),x(3,"date"),a()()),t&2){const n=d(2);e(2),b(P(3,1,n.attributes.updated))}}function q(t,i){if(t&1&&(o(0,"span")(1,"button",15),s(2),a()()),t&2){const n=i.$implicit;e(),_("queryParams",j(3,G,n)),M("aria-label","Stichwort: "+n),e(),m(" ",n," ")}}function E(t,i){if(t&1&&u(0,"img",17),t&2){const n=d(3);_("src",n.attributes.publishedAt.logo,p)}}function H(t,i){if(t&1&&(o(0,"div",13)(1,"div")(2,"a",16),l(3,E,1,1,"img",17),a()(),o(4,"div"),s(5," Original veröffentlicht auf "),o(6,"a",18),s(7),a(),s(8,". "),a()()),t&2){const n=d(2);e(2),_("href",n.attributes.publishedAt.url,p)("hreflang",n.attributes.language||"de"),M("aria-label","Original veröffentlicht auf "+n.attributes.publishedAt.name),e(),r(n.attributes.publishedAt.logo?3:-1),e(3),_("href",n.attributes.publishedAt.url,p)("hreflang",n.attributes.language||"de"),e(),b(n.attributes.publishedAt.name)}}function J(t,i){if(t&1&&(o(0,"section",4)(1,"div",10),l(2,$,4,3,"span"),o(3,"p",11),s(4,"Stichwörter"),a()(),o(5,"div",12),I(6,q,3,5,"span",null,z),a(),l(8,H,9,7,"div",13),a()),t&2){const n=d();e(2),r(n.attributes.updated?2:-1),e(4),L(n.attributes.keywords),e(2),r(n.attributes.publishedAt&&n.attributes.publishedAt.name&&n.attributes.publishedAt.url?8:-1)}}function K(t,i){if(t&1&&(o(0,"a",18),s(1,"Dev.to"),a()),t&2){const n=d(2);_("href",n.attributes.linked.devTo,p)("hreflang",n.attributes.language||"de")}}function N(t,i){t&1&&s(0," | ")}function U(t,i){if(t&1&&(o(0,"a",18),s(1,"Medium.com"),a()),t&2){const n=d(2);_("href",n.attributes.linked.medium,p)("hreflang",n.attributes.language||"de")}}function W(t,i){if(t&1&&(o(0,"section",5),l(1,K,2,2,"a",18),l(2,N,1,0),l(3,U,2,2,"a",18),a()),t&2){const n=d();e(),r(n.attributes.linked.devTo?1:-1),e(),r(n.attributes.linked.devTo&&n.attributes.linked.medium?2:-1),e(),r(n.attributes.linked.medium?3:-1)}}function Q(t,i){if(t&1&&u(0,"dk-series-list",6),t&2){const n=d();_("series",n.attributes.series)}}function V(t,i){t&1&&s(0," Read On: ")}function X(t,i){t&1&&s(0," Weiterlesen auf ")}function Y(t,i){if(t&1&&(o(0,"div"),s(1),a(),o(2,"a",19),l(3,V,1,0)(4,X,1,0),s(5),a()),t&2){const n=d();e(),m(" ",n.attributes.description," "),e(),_("href",n.attributes.publishedAt.url,p)("hreflang",n.attributes.language||"de"),e(),r(n.attributes.language==="en"?3:4),e(2),m(" ",n.attributes.publishedAt.name)}}function Z(t,i){if(t&1&&(o(0,"div",9)(1,"a",20),s(2," Auf GitHub bearbeiten "),a()()),t&2){const n=d(),g=d();e(),_("href",g.editOnGithubLink(n.filename),p)}}function nn(t,i){if(t&1&&(o(0,"article",0)(1,"div",1)(2,"h1"),s(3),a(),o(4,"section",2),l(5,R,1,1,"img",3),a(),l(6,J,9,2,"section",4),l(7,W,4,3,"section",5),l(8,Q,1,1,"dk-series-list",6),o(9,"section",7),u(10,"analog-markdown",8),l(11,Y,6,5)(12,Z,3,1,"div",9),a()()()),t&2){const n=i;_("lang",n.attributes.language),e(3),b(n.attributes.title),e(2),r(n.attributes.thumbnail&&n.attributes.thumbnail.header?5:-1),e(),r(n.attributes.keywords?6:-1),e(),r(n.attributes.linked?7:-1),e(),r(n.attributes.series?8:-1),e(2),_("lang",n.attributes.language||"de")("content",n.content),e(),r(!n.content&&n.attributes.publishedAt&&n.attributes.publishedAt.name&&n.attributes.publishedAt.url?11:12)}}const c=class c{constructor(){this.metaService=h(F),this.platformId=h(O),this.post$=k({param:"slug",subdirectory:"blog"}).pipe(w(i=>this.metaService.createMetaDataForPost("blog",i))),this.isBrowser=v(this.platformId)}editOnGithubLink(i){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${i}.md`}};c.ɵfac=function(n){return new(n||c)},c.ɵcmp=y({type:c,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt",3,"lang"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","hreflang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","hreflang"],[1,"button","read-on",3,"href","hreflang"],["rel","noopener noreferrer",3,"href"]],template:function(n,g){if(n&1&&(l(0,nn,13,9,"article",0),x(1,"async")),n&2){let C;r((C=P(1,1,g.post$))?0:-1,C)}},dependencies:[T,B,D,A,S],styles:[`.wrapper[_ngcontent-%COMP%] {
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
  padding-bottom: 2rem;
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
}

.read-on[_ngcontent-%COMP%] {
  margin-top: 1.5rem;
  text-wrap: auto;
  height: auto;
  line-height: 1.5rem;
  padding: 1em;
}`]});let f=c;export{f as default};
