import{j as h,P,ag as v,ah as w,l as y,ɵ as A,w as d,ai as C,x as s,aj as k,ak as M,al as O,am as S,ac as I,a as i,e as p,b as l,d as o,y as n,I as r,W as m,G as _,ad as c,Q as j,R as z,T as L,V as x,af as B,M as T}from"./index-BbwBDzBm.js";import{S as F,a as D}from"./sticky-navigation.component-6kGdNhs2.js";import{M as G}from"./meta.service-iGQVW5XH.js";const $=e=>({keyword:e});function R(e,a){if(e&1&&p(0,"img",4),e&2){const t=_();r("src",t.attributes.thumbnail.header,c)}}function q(e,a){if(e&1&&(i(0,"span")(1,"time",16),l(2),C(3,"date"),o()()),e&2){const t=_(2);n(2),m(k(3,1,t.attributes.updated))}}function E(e,a){if(e&1&&(i(0,"span")(1,"button",17),l(2),o()()),e&2){const t=a.$implicit;n(),r("queryParams",B(3,$,t)),T("aria-label","Stichwort: "+t),n(),x(" ",t," ")}}function H(e,a){if(e&1&&p(0,"img",19),e&2){const t=_(3);r("src",t.attributes.publishedAt.logo,c)}}function N(e,a){if(e&1&&(i(0,"div",15)(1,"div")(2,"a",18),d(3,H,1,1,"img",19),o()(),i(4,"div"),l(5," Original veröffentlicht auf "),i(6,"a",20),l(7),o(),l(8,". "),o()()),e&2){const t=_(2);n(2),r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),T("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),n(),s(t.attributes.publishedAt.logo?3:-1),n(3),r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),n(),m(t.attributes.publishedAt.name)}}function Q(e,a){if(e&1&&(i(0,"section",5)(1,"div",12),d(2,q,4,3,"span"),i(3,"h2",13),l(4,"Stichwörter"),o()(),i(5,"div",14),j(6,E,3,5,"span",null,z),o(),d(8,N,9,7,"div",15),o()),e&2){const t=_();n(2),s(t.attributes.updated?2:-1),n(4),L(t.attributes.keywords),n(2),s(t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?8:-1)}}function U(e,a){if(e&1&&(i(0,"a",20),l(1,"Dev.to"),o()),e&2){const t=_(2);r("href",t.attributes.linked.devTo,c)("lang",t.attributes.language||"de")}}function V(e,a){e&1&&l(0," | ")}function W(e,a){if(e&1&&(i(0,"a",20),l(1,"Medium.com"),o()),e&2){const t=_(2);r("href",t.attributes.linked.medium,c)("lang",t.attributes.language||"de")}}function Z(e,a){if(e&1&&(i(0,"section",6),d(1,U,2,2,"a",20)(2,V,1,0)(3,W,2,2,"a",20),o()),e&2){const t=_();n(),s(t.attributes.linked.devTo?1:-1),n(),s(t.attributes.linked.devTo&&t.attributes.linked.medium?2:-1),n(),s(t.attributes.linked.medium?3:-1)}}function J(e,a){if(e&1&&p(0,"dk-series-list",7),e&2){const t=_();r("series",t.attributes.series)}}function K(e,a){if(e&1&&(i(0,"a",10),l(1),o()),e&2){const t=_();r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),n(),x("Zum externen Artikel auf ",t.attributes.publishedAt.name,"")}}function X(e,a){if(e&1&&(i(0,"div",11)(1,"a",21),l(2," Auf GitHub bearbeiten "),o()()),e&2){const t=_(),b=_();n(),r("href",b.editOnGithubLink(t.filename),c)}}function Y(e,a){if(e&1&&(i(0,"article",0),p(1,"dk-sticky-navigation",1),i(2,"div",2)(3,"h1"),l(4),o(),i(5,"section",3),d(6,R,1,1,"img",4),o(),d(7,Q,9,2,"section",5)(8,Z,4,3,"section",6)(9,J,1,1,"dk-series-list",7),i(10,"section",8),p(11,"analog-markdown",9),d(12,K,2,3,"a",10)(13,X,3,1,"div",11),o()()()),e&2){const t=a;n(),r("content",t.content),n(3),m(t.attributes.title),n(2),s(t.attributes.thumbnail&&t.attributes.thumbnail.header?6:-1),n(),s(t.attributes.keywords?7:-1),n(),s(t.attributes.linked?8:-1),n(),s(t.attributes.series?9:-1),n(2),r("lang",t.attributes.language||"de")("content",t.content),n(),s(!t.content&&t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?12:13)}}const u=class u{constructor(){this.metaService=h(G),this.platformId=h(P),this.post$=v({param:"slug",subdirectory:"talks"}).pipe(w(a=>this.metaService.createMetaDataForPost("talks",a))),this.isBrowser=!1,this.isBrowser=y(this.platformId)}editOnGithubLink(a){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${a}.md`}};u.ɵfac=function(t){return new(t||u)},u.ɵcmp=A({type:u,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt"],[3,"content"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],["target","_blank",1,"external-article",3,"href","lang"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","lang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","lang"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(t,b){if(t&1&&(d(0,Y,14,9,"article",0),C(1,"async")),t&2){let g;s((g=k(1,1,b.post$))?0:-1,g)}},dependencies:[M,O,S,I,F,D],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]});let f=u;export{f as default};
