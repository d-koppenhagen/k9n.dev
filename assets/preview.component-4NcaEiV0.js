import{a3 as u,ɵ as w,w as g,x as m,a4 as P,a as s,e as C,b as d,d as c,G as r,y as a,I as l,a5 as h,W as O,V as b,M as k,v as M,a6 as y,Q as v,T,a7 as L}from"./index-Be9IN4QR.js";function A(n,e){if(n&1&&(s(0,"a",5),d(1,"Weiterlesen..."),c()),n&2){const t=r(),i=r();l("href",i.externalUrl,h)("lang",t.attributes.language||"de")}}function F(n,e){if(n&1&&(s(0,"a",6),d(1,"Weiterlesen..."),c()),n&2){const t=r(),i=r();l("lang",t.attributes.language||"de")("routerLink",i.routeToPost)}}function j(n,e){if(n&1&&C(0,"img",8),n&2){const t=r(2);l("src",t.attributes.publishedAt.logo,h)}}function z(n,e){if(n&1&&d(0),n&2){const t=r(2);b(" Original veröffentlicht auf ",t.attributes.publishedAt.name," ")}}function E(n,e){if(n&1&&(s(0,"a",7),g(1,j,1,1,"img",8)(2,z,1,1),c()),n&2){const t=r();l("href",t.attributes.publishedAt.url,h)("lang",t.attributes.language||"de")("title","Original veröffentlicht auf "+t.attributes.publishedAt.name),k("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),a(),m(t.attributes.publishedAt.logo?1:2)}}function I(n,e){if(n&1&&(s(0,"article"),C(1,"img",0),s(2,"div",1)(3,"h3",2),d(4),c()(),s(5,"div",3)(6,"p"),d(7),c()(),s(8,"div",4),g(9,A,2,2,"a",5)(10,F,2,2,"a",6)(11,E,3,5,"a",7),c()()),n&2){const t=e,i=r();a(),l("src",t.attributes.thumbnail.card||t.attributes.thumbnail.header,h),a(3),O(t.attributes.title),a(),l("lang",t.attributes.language||"de"),a(2),b(" ",t.attributes.description," "),a(2),m(i.externalUrl?9:10),a(2),m(t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?11:-1)}}const p=class p{constructor(){this.post=u.required()}get routeToPost(){const e=this.post()?.filename?.match(/\/([^/]+)\/([^/.]+)\.md$/);let t=[];if(e&&e.length===3){const[,i,o]=e;t=["/",i,o]}return t}get externalUrl(){const e=this.post()?.attributes?.publishedAt;return e&&e.linkExternal&&e.url?e.url:void 0}};p.ɵfac=function(t){return new(t||p)},p.ɵcmp=w({type:p,selectors:[["dk-card"]],inputs:{post:[1,"post"]},decls:1,vars:1,consts:[["alt","",1,"card-image",3,"src"],[1,"card-header"],[1,"major"],[1,"card-content",3,"lang"],[1,"card-footer"],["target","_blank",1,"special","read-on",3,"href","lang"],[1,"special","read-on",3,"lang","routerLink"],["target","_blank",1,"published-at-link",3,"href","lang","title"],["alt","",1,"published-at-logo",3,"src"]],template:function(t,i){if(t&1&&g(0,I,12,6,"article"),t&2){let o;m((o=i.post())?0:-1,o)}},dependencies:[P],styles:[`article[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 0;
  padding: 0;
}
article[_ngcontent-%COMP%]:focus-within {
  outline: 2px solid #5e7959;
  outline-offset: 1px;
}
img.card-image[_ngcontent-%COMP%] {
  height: 180px;
  object-fit: cover;
}
.card-header[_ngcontent-%COMP%] {
  margin: 1.5rem 1.5rem 0;
}
.card-header[_ngcontent-%COMP%]   .major[_ngcontent-%COMP%] {
  min-height: 100px;
}
.card-content[_ngcontent-%COMP%] {
  align-self: flex-start;
  margin: 0 1.5rem;
}
.card-footer[_ngcontent-%COMP%] {
  margin: 1.5rem 1.5rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.card-footer[_ngcontent-%COMP%]   .read-on[_ngcontent-%COMP%] {
  white-space: nowrap;
  margin-right: 10px;
}
.card-footer[_ngcontent-%COMP%]   .published-at-link[_ngcontent-%COMP%] {
  text-decoration: none;
  border: none;
  float: right;
  width: 150px;
}
.card-footer[_ngcontent-%COMP%]   .published-at-link[_ngcontent-%COMP%]    > img.published-at-logo[_ngcontent-%COMP%] {
  float: right;
  max-height: 50px;
}


@media screen and (max-width: 980px) {
  img.card-image[_ngcontent-%COMP%] {
    height: 150px;
  }
  .read-on[_ngcontent-%COMP%] {
    font-size: 0.7em !important;
  }
}
@media screen and (max-width: 800px) {
  .read-on[_ngcontent-%COMP%] {
    font-size: 0.6em !important;
  }
}
@media screen and (max-width: 736px) {
  img.card-image[_ngcontent-%COMP%] {
    height: 120px;
  }
  .read-on[_ngcontent-%COMP%] {
    visibility: hidden;
  }
  .read-on[_ngcontent-%COMP%]::before {
    visibility: visible;
  }
}`]});let f=p;const U=(n,e)=>e.slug,$=n=>["/",n];function q(n,e){if(n&1&&C(0,"dk-card",2),n&2){const t=e.$implicit;l("post",t)}}function W(n,e){if(n&1&&v(0,q,1,1,"dk-card",2,U),n&2){const t=r();T(t.reducedPostList)}}function D(n,e){n&1&&d(0," Es wurden keine passenden Einträge gefunden. ")}function R(n,e){if(n&1&&(s(0,"ul",1)(1,"li")(2,"a",3),d(3),c()()()),n&2){const t=r();a(2),l("routerLink",L(2,$,t.content())),a(),b("Alle anzeigen (",t.postsFiltered.length,")")}}const _=class _{constructor(){this.content=u.required(),this.posts=u.required(),this.keyword=u(""),this.search=u(""),this.max=u(),this.postsFiltered=[],this.reducedPostList=[]}updatePosts(){this.postsFiltered=(this.posts()||[]).filter(e=>{const t=this.content();return t?e.filename.includes(`/${t}/`):!0}).filter(e=>e.attributes.published!==!1).filter(e=>{const t=this.keyword();return t?!!e.attributes.keywords?.includes(t):!0}).filter(e=>{const t=this.search().toLowerCase();return t?e.attributes.keywords?.includes(this.search())||e.attributes.title.toLowerCase().includes(t)||e.attributes.description.toLowerCase().includes(t)||e.attributes.author.name.toLowerCase().includes(t)||e.attributes.author.mail.toLowerCase().includes(t):!0}).sort((e,t)=>{const i=+new Date(e.attributes.created),o=+new Date(t.attributes.created);return i-o}).reverse(),this.reducedPostList=this.postsFiltered.slice(0,this.max())}ngOnInit(){this.updatePosts()}ngOnChanges(){this.updatePosts()}};_.ɵfac=function(t){return new(t||_)},_.ɵcmp=w({type:_,selectors:[["dk-preview"]],inputs:{content:[1,"content"],posts:[1,"posts"],keyword:[1,"keyword"],search:[1,"search"],max:[1,"max"]},features:[M],decls:5,vars:2,consts:[[1,"features"],[1,"actions"],[3,"post"],[1,"button",3,"routerLink"]],template:function(t,i){if(t&1&&(s(0,"section",0),g(1,W,2,0)(2,D,1,0),c(),y(3),g(4,R,4,4,"ul",1)),t&2){a(),m(i.reducedPostList.length?1:2);const o=i.max();a(3),m(o&&o<i.postsFiltered.length||i.keyword()||i.search()?4:-1)}},dependencies:[P,f],styles:[`.features[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 30px 1.75em;
  grid-auto-flow: row;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  margin-right: 1.7em;
}

@media screen and (max-width: 800px) {
  .features[_ngcontent-%COMP%] {
    grid-template-columns: 100%;
  }
}

@media screen and (max-width: 480px) {
  .features[_ngcontent-%COMP%] {
    margin-right: 0;
  }
}`]});let x=_;export{x as P};
