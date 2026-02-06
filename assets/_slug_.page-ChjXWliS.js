import{h,P as O,ai as k,aj as w,l as v,ɵ as y,ak as T,af as B,al as A,am as S,q as s,an as x,w as r,ao as P,r as o,b as l,v as a,u,J as _,x as e,Y as b,H as d,U as L,V as j,W as z,X as m,ah as I,L as M,ag as p}from"./index-DPqAJY-c.js";import{S as F}from"./series-list.component-CE0qIxVe.js";import{M as D}from"./meta.service-BREMCqzZ.js";const $=n=>({keyword:n});function q(n,i){if(n&1&&u(0,"img",3),n&2){const t=d();_("src",t.attributes.thumbnail.header,p)}}function G(n,i){if(n&1&&(o(0,"span")(1,"time",14),l(2),x(3,"date"),a()()),n&2){const t=d(2);e(2),b(P(3,1,t.attributes.updated))}}function R(n,i){if(n&1&&(o(0,"span")(1,"button",15),l(2),a()()),n&2){const t=i.$implicit;e(),_("queryParams",I(3,$,t)),M("aria-label","Stichwort: "+t),e(),m(" ",t," ")}}function H(n,i){if(n&1&&u(0,"img",17),n&2){const t=d(3);_("src",t.attributes.publishedAt.logo,p)}}function U(n,i){if(n&1&&(o(0,"div",13)(1,"div")(2,"a",16),s(3,H,1,1,"img",17),a()(),o(4,"div"),l(5," Original veröffentlicht auf "),o(6,"a",18),l(7),a(),l(8,". "),a()()),n&2){const t=d(2);e(2),_("href",t.attributes.publishedAt.url,p)("hreflang",t.attributes.language||"de"),M("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),e(),r(t.attributes.publishedAt.logo?3:-1),e(3),_("href",t.attributes.publishedAt.url,p)("hreflang",t.attributes.language||"de"),e(),b(t.attributes.publishedAt.name)}}function W(n,i){if(n&1&&(o(0,"section",4)(1,"div",10),s(2,G,4,3,"span"),o(3,"p",11),l(4,"Stichwörter"),a()(),o(5,"div",12),L(6,R,3,5,"span",null,j),a(),s(8,U,9,7,"div",13),a()),n&2){const t=d();e(2),r(t.attributes.updated?2:-1),e(4),z(t.attributes.keywords),e(2),r(t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?8:-1)}}function E(n,i){if(n&1&&(o(0,"a",18),l(1,"Dev.to"),a()),n&2){const t=d(2);_("href",t.attributes.linked.devTo,p)("hreflang",t.attributes.language||"de")}}function J(n,i){n&1&&l(0," | ")}function V(n,i){if(n&1&&(o(0,"a",18),l(1,"Medium.com"),a()),n&2){const t=d(2);_("href",t.attributes.linked.medium,p)("hreflang",t.attributes.language||"de")}}function X(n,i){if(n&1&&(o(0,"section",5),s(1,E,2,2,"a",18),s(2,J,1,0),s(3,V,2,2,"a",18),a()),n&2){const t=d();e(),r(t.attributes.linked.devTo?1:-1),e(),r(t.attributes.linked.devTo&&t.attributes.linked.medium?2:-1),e(),r(t.attributes.linked.medium?3:-1)}}function Y(n,i){if(n&1&&u(0,"dk-series-list",6),n&2){const t=d();_("series",t.attributes.series)}}function K(n,i){n&1&&l(0," Read On: ")}function N(n,i){n&1&&l(0," Weiterlesen auf ")}function Q(n,i){if(n&1&&(o(0,"div"),l(1),a(),o(2,"a",19),l(3,"→ "),s(4,K,1,0)(5,N,1,0),l(6),a()),n&2){const t=d();e(),m(" ",t.attributes.description," "),e(),_("href",t.attributes.publishedAt.url,p)("hreflang",t.attributes.language||"de"),e(2),r(t.attributes.language==="en"?4:5),e(2),m(" ",t.attributes.publishedAt.name)}}function Z(n,i){if(n&1&&(o(0,"div",9)(1,"a",20),l(2," Auf GitHub bearbeiten "),a()()),n&2){const t=d(),g=d();e(),_("href",g.editOnGithubLink(t.filename),p)}}function tt(n,i){if(n&1&&(o(0,"article",0)(1,"div",1)(2,"h1"),l(3),a(),o(4,"section",2),s(5,q,1,1,"img",3),a(),s(6,W,9,2,"section",4),s(7,X,4,3,"section",5),s(8,Y,1,1,"dk-series-list",6),o(9,"section",7),u(10,"analog-markdown",8),s(11,Q,7,5)(12,Z,3,1,"div",9),a()()()),n&2){const t=i;_("lang",t.attributes.language),e(3),b(t.attributes.title),e(2),r(t.attributes.thumbnail&&t.attributes.thumbnail.header?5:-1),e(),r(t.attributes.keywords?6:-1),e(),r(t.attributes.linked?7:-1),e(),r(t.attributes.series?8:-1),e(2),_("lang",t.attributes.language||"de")("content",t.content),e(),r(!t.content&&t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?11:12)}}const c=class c{constructor(){this.metaService=h(D),this.platformId=h(O),this.post$=k({param:"slug",subdirectory:"blog"}).pipe(w(i=>this.metaService.createMetaDataForPost("blog",i))),this.isBrowser=v(this.platformId)}editOnGithubLink(i){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${i}.md`}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=y({type:c,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt",3,"lang"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","hreflang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","hreflang"],[1,"external-article",3,"href","hreflang"],["rel","noopener noreferrer",3,"href"]],template:function(t,g){if(t&1&&(s(0,tt,13,9,"article",0),x(1,"async")),t&2){let C;r((C=P(1,1,g.post$))?0:-1,C)}},dependencies:[T,B,F,A,S],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]});let f=c;export{f as default};
