import{ɵ as f,a as T,i as P,t as v,b as w,P as y,d as A,e as u,f as h,h as s,j as C,A as M,k as O,D as S,R as F,l as i,m as p,n as l,o,p as n,q as r,r as m,s as _,u as c,v as z,w as D,x as I,y as k,z as B,B as x}from"./index-mMuXI6oy.js";import{S as L,a as j}from"./sticky-navigation.component-CO2v_jMY.js";import{M as $}from"./meta.service-CowikIAg.js";const q=e=>({keyword:e});function G(e,a){if(e&1&&p(0,"img",10),e&2){const t=_();r("src",t.attributes.thumbnail.header,c)}}function R(e,a){if(e&1&&(i(0,"span")(1,"time",15),l(2),h(3,"date"),o()()),e&2){const t=_(2);n(2),m(C(3,1,t.attributes.updated))}}function E(e,a){if(e&1&&(i(0,"span")(1,"button",16),l(2),o()()),e&2){const t=a.$implicit;n(),r("queryParams",B(3,q,t)),x("aria-label","Stichwort: "+t),n(),k(" ",t," ")}}function H(e,a){if(e&1&&p(0,"img",20),e&2){const t=_(3);r("src",t.attributes.publishedAt.logo,c)}}function N(e,a){if(e&1&&(i(0,"div",14)(1,"div")(2,"a",17),u(3,H,1,1,"img",18),o()(),i(4,"div"),l(5," Original veröffentlicht auf "),i(6,"a",19),l(7),o(),l(8,". "),o()()),e&2){const t=_(2);n(2),r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),x("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),n(),s(3,t.attributes.publishedAt.logo?3:-1),n(3),r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),n(),m(t.attributes.publishedAt.name)}}function U(e,a){if(e&1&&(i(0,"section",5)(1,"div",11),u(2,R,4,3,"span"),i(3,"h2",12),l(4,"Stichwörter"),o()(),i(5,"div",13),z(6,E,3,5,"span",null,D),o(),u(8,N,9,7,"div",14),o()),e&2){const t=_();n(2),s(2,t.attributes.updated?2:-1),n(4),I(t.attributes.keywords),n(2),s(8,t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?8:-1)}}function Z(e,a){if(e&1&&(i(0,"a",19),l(1,"Dev.to"),o()),e&2){const t=_(2);r("href",t.attributes.linked.devTo,c)("lang",t.attributes.language||"de")}}function J(e,a){e&1&&l(0," | ")}function K(e,a){if(e&1&&(i(0,"a",19),l(1,"Medium.com"),o()),e&2){const t=_(2);r("href",t.attributes.linked.medium,c)("lang",t.attributes.language||"de")}}function Q(e,a){if(e&1&&(i(0,"section",6),u(1,Z,2,2,"a")(2,J,1,0)(3,K,2,2,"a"),o()),e&2){const t=_();n(),s(1,t.attributes.linked.devTo?1:-1),n(),s(2,t.attributes.linked.devTo&&t.attributes.linked.medium?2:-1),n(),s(3,t.attributes.linked.medium?3:-1)}}function V(e,a){if(e&1&&p(0,"dk-series-list",21),e&2){const t=_();r("series",t.attributes.series)}}function W(e,a){if(e&1&&(i(0,"a",22),l(1),o()),e&2){const t=_();r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),n(),k("Zum externen Artikel auf ",t.attributes.publishedAt.name,"")}}function X(e,a){if(e&1&&(i(0,"div",23)(1,"a",24),l(2," Auf GitHub bearbeiten "),o()()),e&2){const t=_(),d=_();n(),r("href",d.editOnGithubLink(t.filename),c)}}function Y(e,a){if(e&1&&(i(0,"article",0),p(1,"dk-sticky-navigation",1),i(2,"div",2)(3,"h1"),l(4),o(),i(5,"section",3),u(6,G,1,1,"img",4),o(),u(7,U,9,2,"section",5)(8,Q,4,3,"section",6)(9,V,1,1,"dk-series-list"),i(10,"section",7),p(11,"analog-markdown",8),u(12,W,2,3,"a",9)(13,X,3,1),o()()()),e&2){const t=a;n(),r("content",t.content),n(3),m(t.attributes.title),n(2),s(6,t.attributes.thumbnail&&t.attributes.thumbnail.header?6:-1),n(),s(7,t.attributes.keywords?7:-1),n(),s(8,t.attributes.linked?8:-1),n(),s(9,t.attributes.series?9:-1),n(2),r("lang",t.attributes.language||"de")("content",t.content),n(),s(12,!t.content&&t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?12:13)}}let at=(()=>{var e;class a{constructor(d,g){this.metaService=d,this.platformId=g,this.post$=P({param:"slug",subdirectory:"talks"}).pipe(v(b=>this.metaService.createMetaDataForPost("talks",b))),this.isBrowser=!1,this.isBrowser=w(this.platformId)}editOnGithubLink(d){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${d}`}}return e=a,e.ɵfac=function(d){return new(d||e)(f($),f(y))},e.ɵcmp=T({type:e,selectors:[["ng-component"]],standalone:!0,features:[A],decls:2,vars:3,consts:[[1,"wrapper","alt"],[3,"content"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass"],[1,"extra-section"],[1,"external-links"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],["target","_blank",1,"external-article"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","lang"],["alt","",1,"published-at-logo"],[3,"href","lang"],["alt","",1,"published-at-logo",3,"src"],[3,"series"],["target","_blank",1,"external-article",3,"href","lang"],[1,"edit-on-github"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(d,g){if(d&1&&(u(0,Y,14,9,"article",0),h(1,"async")),d&2){let b;s(0,(b=C(1,1,g.post$))?0:-1,b)}},dependencies:[M,O,S,F,L,j],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]}),a})();export{at as default};
