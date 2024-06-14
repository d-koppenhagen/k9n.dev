import{ɵ as b,a as P,i as k,t as O,b as v,P as w,d as y,e as p,f as h,h as s,j as f,A as B,k as A,D as T,R as S,l as i,m as u,n as l,o as a,p as e,q as r,r as C,s as _,u as c,v as F,w as z,x as D,y as x,z as I,B as M}from"./index-4p3sWu3W.js";import{S as j,a as L}from"./sticky-navigation.component-C1JlcmxQ.js";import{M as $}from"./meta.service-uY1SMIj_.js";const q=t=>({keyword:t});function G(t,o){if(t&1&&u(0,"img",4),t&2){const n=_();r("src",n.attributes.thumbnail.header,c)}}function R(t,o){if(t&1&&(i(0,"span")(1,"time",16),l(2),h(3,"date"),a()()),t&2){const n=_(2);e(2),C(f(3,1,n.attributes.updated))}}function E(t,o){if(t&1&&(i(0,"span")(1,"button",17),l(2),a()()),t&2){const n=o.$implicit;e(),r("queryParams",I(3,q,n)),M("aria-label","Stichwort: "+n),e(),x(" ",n," ")}}function H(t,o){if(t&1&&u(0,"img",19),t&2){const n=_(3);r("src",n.attributes.publishedAt.logo,c)}}function N(t,o){if(t&1&&(i(0,"div",15)(1,"div")(2,"a",18),p(3,H,1,1,"img",19),a()(),i(4,"div"),l(5," Original veröffentlicht auf "),i(6,"a",20),l(7),a(),l(8,". "),a()()),t&2){const n=_(2);e(2),r("href",n.attributes.publishedAt.url,c)("lang",n.attributes.language||"de"),M("aria-label","Original veröffentlicht auf "+n.attributes.publishedAt.name),e(),s(n.attributes.publishedAt.logo?3:-1),e(3),r("href",n.attributes.publishedAt.url,c)("lang",n.attributes.language||"de"),e(),C(n.attributes.publishedAt.name)}}function U(t,o){if(t&1&&(i(0,"section",5)(1,"div",12),p(2,R,4,3,"span"),i(3,"h2",13),l(4,"Stichwörter"),a()(),i(5,"div",14),F(6,E,3,5,"span",null,z),a(),p(8,N,9,7,"div",15),a()),t&2){const n=_();e(2),s(n.attributes.updated?2:-1),e(4),D(n.attributes.keywords),e(2),s(n.attributes.publishedAt&&n.attributes.publishedAt.name&&n.attributes.publishedAt.url?8:-1)}}function Z(t,o){if(t&1&&(i(0,"a",20),l(1,"Dev.to"),a()),t&2){const n=_(2);r("href",n.attributes.linked.devTo,c)("lang",n.attributes.language||"de")}}function J(t,o){t&1&&l(0," | ")}function K(t,o){if(t&1&&(i(0,"a",20),l(1,"Medium.com"),a()),t&2){const n=_(2);r("href",n.attributes.linked.medium,c)("lang",n.attributes.language||"de")}}function Q(t,o){if(t&1&&(i(0,"section",6),p(1,Z,2,2,"a",20)(2,J,1,0)(3,K,2,2,"a",20),a()),t&2){const n=_();e(),s(n.attributes.linked.devTo?1:-1),e(),s(n.attributes.linked.devTo&&n.attributes.linked.medium?2:-1),e(),s(n.attributes.linked.medium?3:-1)}}function V(t,o){if(t&1&&u(0,"dk-series-list",7),t&2){const n=_();r("series",n.attributes.series)}}function W(t,o){if(t&1&&(i(0,"a",10),l(1),a()),t&2){const n=_();r("href",n.attributes.publishedAt.url,c)("lang",n.attributes.language||"de"),e(),x("Zum externen Artikel auf ",n.attributes.publishedAt.name,"")}}function X(t,o){if(t&1&&(i(0,"div",11)(1,"a",21),l(2," Auf GitHub bearbeiten "),a()()),t&2){const n=_(),d=_();e(),r("href",d.editOnGithubLink(n.filename),c)}}function Y(t,o){if(t&1&&(i(0,"article",0),u(1,"dk-sticky-navigation",1),i(2,"div",2)(3,"h1"),l(4),a(),i(5,"section",3),p(6,G,1,1,"img",4),a(),p(7,U,9,2,"section",5)(8,Q,4,3,"section",6)(9,V,1,1,"dk-series-list",7),i(10,"section",8),u(11,"analog-markdown",9),p(12,W,2,3,"a",10)(13,X,3,1,"div",11),a()()()),t&2){const n=o;e(),r("content",n.content),e(3),C(n.attributes.title),e(2),s(n.attributes.thumbnail&&n.attributes.thumbnail.header?6:-1),e(),s(n.attributes.keywords?7:-1),e(),s(n.attributes.linked?8:-1),e(),s(n.attributes.series?9:-1),e(2),r("lang",n.attributes.language||"de")("content",n.content),e(),s(!n.content&&n.attributes.publishedAt&&n.attributes.publishedAt.name&&n.attributes.publishedAt.url?12:13)}}let on=(()=>{var t;class o{constructor(d,m){this.metaService=d,this.platformId=m,this.post$=k({param:"slug",subdirectory:"blog"}).pipe(O(g=>this.metaService.createMetaDataForPost("blog",g))),this.isBrowser=!1,this.isBrowser=v(this.platformId)}editOnGithubLink(d){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${d}`}}return t=o,t.ɵfac=function(d){return new(d||t)(b($),b(w))},t.ɵcmp=P({type:t,selectors:[["ng-component"]],standalone:!0,features:[y],decls:2,vars:3,consts:[[1,"wrapper","alt"],[3,"content"],[1,"inner"],[1,"blog-header"],["alt","",1,"adaptive-glass",3,"src"],[1,"extra-section"],[1,"external-links"],[3,"series"],[1,"blog-content"],["classes","markdown-content",3,"lang","content"],["target","_blank",1,"external-article",3,"href","lang"],[1,"edit-on-github"],[1,"extra-info"],[1,"sub-heading"],[1,"actions"],[1,"published-at"],["datetime","2001-05-15 19:00"],["routerLink","/blog",1,"button","xs",3,"queryParams"],[1,"published-at-link",3,"href","lang"],["alt","",1,"published-at-logo",3,"src"],[3,"href","lang"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(d,m){if(d&1&&(p(0,Y,14,9,"article",0),h(1,"async")),d&2){let g;s((g=f(1,1,m.post$))?0:-1,g)}},dependencies:[B,A,T,S,j,L],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]}),o})();export{on as default};
