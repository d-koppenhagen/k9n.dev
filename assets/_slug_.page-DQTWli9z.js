import{ɵ as C,a as P,i as k,t as O,b as v,P as w,d as y,e as p,f as h,h as l,j as f,A as B,k as A,D as T,R as S,l as i,m as u,n as s,o as a,p as e,q as r,r as b,s as _,u as c,v as F,w as z,x as D,y as x,z as I,B as M}from"./index-mMuXI6oy.js";import{S as j,a as L}from"./sticky-navigation.component-CO2v_jMY.js";import{M as $}from"./meta.service-CowikIAg.js";const q=n=>({keyword:n});function G(n,o){if(n&1&&u(0,"img",10),n&2){const t=_();r("src",t.attributes.thumbnail.header,c)}}function R(n,o){if(n&1&&(i(0,"span")(1,"time",15),s(2),h(3,"date"),a()()),n&2){const t=_(2);e(2),b(f(3,1,t.attributes.updated))}}function E(n,o){if(n&1&&(i(0,"span")(1,"button",16),s(2),a()()),n&2){const t=o.$implicit;e(),r("queryParams",I(3,q,t)),M("aria-label","Stichwort: "+t),e(),x(" ",t," ")}}function H(n,o){if(n&1&&u(0,"img",20),n&2){const t=_(3);r("src",t.attributes.publishedAt.logo,c)}}function N(n,o){if(n&1&&(i(0,"div",14)(1,"div")(2,"a",17),p(3,H,1,1,"img",18),a()(),i(4,"div"),s(5," Original veröffentlicht auf "),i(6,"a",19),s(7),a(),s(8,". "),a()()),n&2){const t=_(2);e(2),r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),M("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),e(),l(3,t.attributes.publishedAt.logo?3:-1),e(3),r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),e(),b(t.attributes.publishedAt.name)}}function U(n,o){if(n&1&&(i(0,"section",5)(1,"div",11),p(2,R,4,3,"span"),i(3,"h2",12),s(4,"Stichwörter"),a()(),i(5,"div",13),F(6,E,3,5,"span",null,z),a(),p(8,N,9,7,"div",14),a()),n&2){const t=_();e(2),l(2,t.attributes.updated?2:-1),e(4),D(t.attributes.keywords),e(2),l(8,t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?8:-1)}}function Z(n,o){if(n&1&&(i(0,"a",19),s(1,"Dev.to"),a()),n&2){const t=_(2);r("href",t.attributes.linked.devTo,c)("lang",t.attributes.language||"de")}}function J(n,o){n&1&&s(0," | ")}function K(n,o){if(n&1&&(i(0,"a",19),s(1,"Medium.com"),a()),n&2){const t=_(2);r("href",t.attributes.linked.medium,c)("lang",t.attributes.language||"de")}}function Q(n,o){if(n&1&&(i(0,"section",6),p(1,Z,2,2,"a")(2,J,1,0)(3,K,2,2,"a"),a()),n&2){const t=_();e(),l(1,t.attributes.linked.devTo?1:-1),e(),l(2,t.attributes.linked.devTo&&t.attributes.linked.medium?2:-1),e(),l(3,t.attributes.linked.medium?3:-1)}}function V(n,o){if(n&1&&u(0,"dk-series-list",21),n&2){const t=_();r("series",t.attributes.series)}}function W(n,o){if(n&1&&(i(0,"a",22),s(1),a()),n&2){const t=_();r("href",t.attributes.publishedAt.url,c)("lang",t.attributes.language||"de"),e(),x("Zum externen Artikel auf ",t.attributes.publishedAt.name,"")}}function X(n,o){if(n&1&&(i(0,"div",23)(1,"a",24),s(2," Auf GitHub bearbeiten "),a()()),n&2){const t=_(),d=_();e(),r("href",d.editOnGithubLink(t.filename),c)}}function Y(n,o){if(n&1&&(i(0,"article",0),u(1,"dk-sticky-navigation",1),i(2,"div",2)(3,"h1"),s(4),a(),i(5,"section",3),p(6,G,1,1,"img",4),a(),p(7,U,9,2,"section",5)(8,Q,4,3,"section",6)(9,V,1,1,"dk-series-list"),i(10,"section",7),u(11,"analog-markdown",8),p(12,W,2,3,"a",9)(13,X,3,1),a()()()),n&2){const t=o;e(),r("content",t.content),e(3),b(t.attributes.title),e(2),l(6,t.attributes.thumbnail&&t.attributes.thumbnail.header?6:-1),e(),l(7,t.attributes.keywords?7:-1),e(),l(8,t.attributes.linked?8:-1),e(),l(9,t.attributes.series?9:-1),e(2),r("lang",t.attributes.language||"de")("content",t.content),e(),l(12,!t.content&&t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?12:13)}}let ot=(()=>{var n;class o{constructor(d,m){this.metaService=d,this.platformId=m,this.post$=k({param:"slug",subdirectory:"blog"}).pipe(O(g=>this.metaService.createMetaDataForPost("blog",g))),this.isBrowser=!1,this.isBrowser=v(this.platformId)}editOnGithubLink(d){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${d}`}}return n=o,n.ɵfac=function(d){return new(d||n)(C($),C(w))},n.ɵcmp=P({type:n,selectors:[["ng-component"]],standalone:!0,features:[y],decls:2,vars:3,consts:[[1,"wrapper","alt"],[3,"content"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass"],[1,"extra-section"],[1,"external-links"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],["target","_blank",1,"external-article"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","lang"],["alt","",1,"published-at-logo"],[3,"href","lang"],["alt","",1,"published-at-logo",3,"src"],[3,"series"],["target","_blank",1,"external-article",3,"href","lang"],[1,"edit-on-github"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(d,m){if(d&1&&(p(0,Y,14,9,"article",0),h(1,"async")),d&2){let g;l(0,(g=f(1,1,m.post$))?0:-1,g)}},dependencies:[B,A,T,S,j,L],styles:[`.wrapper[_ngcontent-%COMP%] {
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

.published-at[_ngcontent-%COMP%], .external-links[_ngcontent-%COMP%], .edit-on-github[_ngcontent-%COMP%] {
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
  .blog-footer[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%], .blog-footer[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
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
}`]}),o})();export{ot as default};
