import{i as h,P,D as v,E as w,f as A,ɵ as y,G as M,R as O,H as S,I,v as s,J as C,w as r,K as k,h as a,b as l,j as o,k as p,q as _,p as n,L as f,r as d,B as L,C as z,x,A as B,M as T,N as j,y as u}from"./index-CqhgQhz3.js";import{S as D}from"./series-list.component-CKD6pWue.js";import{M as F}from"./meta.service-DiX2RShP.js";const G=e=>({keyword:e});function $(e,i){if(e&1&&p(0,"img",3),e&2){const t=d();_("src",t.attributes.thumbnail.header,u)}}function q(e,i){if(e&1&&(a(0,"span")(1,"time",15),l(2),C(3,"date"),o()()),e&2){const t=d(2);n(2),f(k(3,1,t.attributes.updated))}}function R(e,i){if(e&1&&(a(0,"span")(1,"button",16),l(2),o()()),e&2){const t=i.$implicit;n(),_("queryParams",B(3,G,t)),T("aria-label","Stichwort: "+t),n(),x(" ",t," ")}}function E(e,i){if(e&1&&p(0,"img",18),e&2){const t=d(3);_("src",t.attributes.publishedAt.logo,u)}}function H(e,i){if(e&1&&(a(0,"div",14)(1,"div")(2,"a",17),s(3,E,1,1,"img",18),o()(),a(4,"div"),l(5," Original veröffentlicht auf "),a(6,"a",19),l(7),o(),l(8,". "),o()()),e&2){const t=d(2);n(2),_("href",t.attributes.publishedAt.url,u)("hreflang",t.attributes.language||"de"),T("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),n(),r(t.attributes.publishedAt.logo?3:-1),n(3),_("href",t.attributes.publishedAt.url,u)("hreflang",t.attributes.language||"de"),n(),f(t.attributes.publishedAt.name)}}function J(e,i){if(e&1&&(a(0,"section",4)(1,"div",11),s(2,q,4,3,"span"),a(3,"p",12),l(4,"Stichwörter"),o()(),a(5,"div",13),L(6,R,3,5,"span",null,j),o(),s(8,H,9,7,"div",14),o()),e&2){const t=d();n(2),r(t.attributes.updated?2:-1),n(4),z(t.attributes.keywords),n(2),r(t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?8:-1)}}function K(e,i){if(e&1&&(a(0,"a",19),l(1,"Dev.to"),o()),e&2){const t=d(2);_("href",t.attributes.linked.devTo,u)("hreflang",t.attributes.language||"de")}}function N(e,i){e&1&&l(0," | ")}function U(e,i){if(e&1&&(a(0,"a",19),l(1,"Medium.com"),o()),e&2){const t=d(2);_("href",t.attributes.linked.medium,u)("hreflang",t.attributes.language||"de")}}function Z(e,i){if(e&1&&(a(0,"section",5),s(1,K,2,2,"a",19),s(2,N,1,0),s(3,U,2,2,"a",19),o()),e&2){const t=d();n(),r(t.attributes.linked.devTo?1:-1),n(),r(t.attributes.linked.devTo&&t.attributes.linked.medium?2:-1),n(),r(t.attributes.linked.medium?3:-1)}}function Q(e,i){if(e&1&&p(0,"dk-series-list",6),e&2){const t=d();_("series",t.attributes.series)}}function V(e,i){if(e&1&&(a(0,"a",9),l(1),o()),e&2){const t=d();_("href",t.attributes.publishedAt.url,u)("hreflang",t.attributes.language||"de"),n(),x("Zum externen Artikel auf ",t.attributes.publishedAt.name)}}function W(e,i){if(e&1&&(a(0,"div",10)(1,"a",20),l(2," Auf GitHub bearbeiten "),o()()),e&2){const t=d(),b=d();n(),_("href",b.editOnGithubLink(t.filename),u)}}function X(e,i){if(e&1&&(a(0,"article",0)(1,"div",1)(2,"h1"),l(3),o(),a(4,"section",2),s(5,$,1,1,"img",3),o(),s(6,J,9,2,"section",4),s(7,Z,4,3,"section",5),s(8,Q,1,1,"dk-series-list",6),a(9,"section",7),p(10,"analog-markdown",8),s(11,V,2,3,"a",9)(12,W,3,1,"div",10),o()()()),e&2){const t=i;_("lang",t.attributes.language),n(3),f(t.attributes.title),n(2),r(t.attributes.thumbnail&&t.attributes.thumbnail.header?5:-1),n(),r(t.attributes.keywords?6:-1),n(),r(t.attributes.linked?7:-1),n(),r(t.attributes.series?8:-1),n(2),_("lang",t.attributes.language||"de")("content",t.content),n(),r(!t.content&&t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?11:12)}}const c=class c{constructor(){this.metaService=h(F),this.platformId=h(P),this.post$=v({param:"slug",subdirectory:"talks"}).pipe(w(i=>this.metaService.createMetaDataForPost("talks",i))),this.isBrowser=!1,this.isBrowser=A(this.platformId)}editOnGithubLink(i){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${i}.md`}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=y({type:c,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt",3,"lang"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],[1,"external-article",3,"href","hreflang"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","hreflang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","hreflang"],["rel","noopener noreferrer",3,"href"]],template:function(t,b){if(t&1&&(s(0,X,13,9,"article",0),C(1,"async")),t&2){let g;r((g=k(1,1,b.post$))?0:-1,g)}},dependencies:[M,O,D,S,I],styles:[`.wrapper[_ngcontent-%COMP%] {
  margin-top: 0;
}

h1[_ngcontent-%COMP%] {
  font-size: 1.4em;
}

h2.sub-heading[_ngcontent-%COMP%] {
  font-size: 0.9em;
}

.actions[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.edit-on-github[_ngcontent-%COMP%] {
  margin: 30px 0;
}

[_ngcontent-%COMP%]::slotted(h1) {
  color: rgb(51, 6, 37);
  background-color: rgb(248, 211, 236);
  padding: 5px;
  border-radius: 5px;
  font-size: 1.4em;
  width: fit-content;
}

.project-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  display: block;
  inline-size: 100%;
  block-size: auto;
  object-fit: cover;
  border-radius: 1ch;
  overflow: hidden;
  box-shadow: 0 3px 2px hsla(0, 0%, 0%, 0.02), 0 7px 5px hsla(0, 0%, 0%, 0.03), 0 13px 10px hsla(0, 0%, 0%, 0.04), 0 22px 18px hsla(0, 0%, 0%, 0.05), 0 42px 33px hsla(0, 0%, 0%, 0.06), 0 100px 80px hsla(0, 0%, 0%, 0.07);
  margin-bottom: 1rem;
}`]});let m=c;export{m as default};
