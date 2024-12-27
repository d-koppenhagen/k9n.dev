import{aa as u,j as M,Y as k,ab as v,ɵ as w,w as g,x as m,ac as P,a7 as L,a8 as T,a as c,e as h,b as d,d as l,G as o,y as a,I as r,ad as f,W as A,V as C,a6 as O,M as F,v as j,ae as I,Q as $,T as z,af as E}from"./index-DVCeWGdg.js";const y=()=>["fas","chevron-right"];function U(n,e){if(n&1&&(c(0,"a",5),h(1,"fa-icon",8),d(2," Weiterlesen... "),l()),n&2){const t=o(),i=o();r("href",i.externalUrl,f)("lang",t.attributes.language||"de"),a(),r("icon",O(3,y))}}function q(n,e){if(n&1&&(c(0,"a",6),h(1,"fa-icon",8),d(2," Weiterlesen... "),l()),n&2){const t=o(),i=o();r("lang",t.attributes.language||"de")("routerLink",i.routeToPost),a(),r("icon",O(3,y))}}function R(n,e){if(n&1&&h(0,"img",9),n&2){const t=o(2);r("src",t.attributes.publishedAt.logo,f)}}function W(n,e){if(n&1&&d(0),n&2){const t=o(2);C(" Original veröffentlicht auf ",t.attributes.publishedAt.name," ")}}function D(n,e){if(n&1&&(c(0,"a",7),g(1,R,1,1,"img",9)(2,W,1,1),l()),n&2){const t=o();r("href",t.attributes.publishedAt.url,f)("lang",t.attributes.language||"de")("title","Original veröffentlicht auf "+t.attributes.publishedAt.name),F("aria-label","Original veröffentlicht auf "+t.attributes.publishedAt.name),a(),m(t.attributes.publishedAt.logo?1:2)}}function B(n,e){if(n&1&&(c(0,"article"),h(1,"img",0),c(2,"div",1)(3,"h3",2),d(4),l()(),c(5,"div",3)(6,"p"),d(7),l()(),c(8,"div",4),g(9,U,3,4,"a",5)(10,q,3,4,"a",6)(11,D,3,5,"a",7),l()()),n&2){const t=e,i=o();a(),r("src",t.attributes.thumbnail.card||t.attributes.thumbnail.header,f),a(3),A(t.attributes.title),a(),r("lang",t.attributes.language||"de"),a(2),C(" ",t.attributes.description," "),a(2),m(i.externalUrl?9:10),a(2),m(t.attributes.publishedAt&&t.attributes.publishedAt.name&&t.attributes.publishedAt.url?11:-1)}}const p=class p{constructor(){this.post=u.required(),this.faLib=M(k),this.faLib.addIcons(v)}get routeToPost(){const e=this.post()?.filename?.match(/\/([^/]+)\/([^/.]+)\.md$/);let t=[];if(e&&e.length===3){const[,i,s]=e;t=["/",i,s]}return t}get externalUrl(){const e=this.post()?.attributes?.publishedAt;return e&&e.linkExternal&&e.url?e.url:void 0}};p.ɵfac=function(t){return new(t||p)},p.ɵcmp=w({type:p,selectors:[["dk-card"]],inputs:{post:[1,"post"]},decls:1,vars:1,consts:[["alt","",1,"card-image",3,"src"],[1,"card-header"],[1,"major"],[1,"card-content",3,"lang"],[1,"card-footer"],["target","_blank",1,"special","read-on",3,"href","lang"],[1,"special","read-on",3,"lang","routerLink"],["target","_blank",1,"published-at-link",3,"href","lang","title"],[3,"icon"],["alt","",1,"published-at-logo",3,"src"]],template:function(t,i){if(t&1&&g(0,B,12,6,"article"),t&2){let s;m((s=i.post())?0:-1,s)}},dependencies:[P,L,T],styles:[`article[_ngcontent-%COMP%] {
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
  display: flex;
  gap: 0.75rem;
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
  padding-bottom: 0.75rem;
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
}`]});let b=p;const G=(n,e)=>e.slug,N=n=>["/",n];function Q(n,e){if(n&1&&h(0,"dk-card",2),n&2){const t=e.$implicit;r("post",t)}}function S(n,e){if(n&1&&$(0,Q,1,1,"dk-card",2,G),n&2){const t=o();z(t.reducedPostList)}}function V(n,e){n&1&&d(0," Es wurden keine passenden Einträge gefunden. ")}function Y(n,e){if(n&1&&(c(0,"ul",1)(1,"li")(2,"a",3),d(3),l()()()),n&2){const t=o();a(2),r("routerLink",E(2,N,t.content())),a(),C("Alle anzeigen (",t.postsFiltered.length,")")}}const _=class _{constructor(){this.content=u.required(),this.posts=u.required(),this.keyword=u(""),this.search=u(""),this.max=u(),this.postsFiltered=[],this.reducedPostList=[]}updatePosts(){this.postsFiltered=(this.posts()||[]).filter(e=>{const t=this.content();return t?e.filename.includes(`/${t}/`):!0}).filter(e=>e.attributes.published!==!1).filter(e=>{const t=this.keyword();return t?!!e.attributes.keywords?.includes(t):!0}).filter(e=>{const t=this.search().toLowerCase();return t?e.attributes.keywords?.includes(this.search())||e.attributes.title.toLowerCase().includes(t)||e.attributes.description.toLowerCase().includes(t)||e.attributes.author.name.toLowerCase().includes(t)||e.attributes.author.mail.toLowerCase().includes(t):!0}).sort((e,t)=>{const i=+new Date(e.attributes.created),s=+new Date(t.attributes.created);return i-s}).reverse(),this.reducedPostList=this.postsFiltered.slice(0,this.max())}ngOnInit(){this.updatePosts()}ngOnChanges(){this.updatePosts()}};_.ɵfac=function(t){return new(t||_)},_.ɵcmp=w({type:_,selectors:[["dk-preview"]],inputs:{content:[1,"content"],posts:[1,"posts"],keyword:[1,"keyword"],search:[1,"search"],max:[1,"max"]},features:[j],decls:5,vars:2,consts:[[1,"features"],[1,"actions"],[3,"post"],[1,"button",3,"routerLink"]],template:function(t,i){if(t&1&&(c(0,"section",0),g(1,S,2,0)(2,V,1,0),l(),I(3),g(4,Y,4,4,"ul",1)),t&2){a(),m(i.reducedPostList.length?1:2);const s=i.max();a(3),m(s&&s<i.postsFiltered.length||i.keyword()||i.search()?4:-1)}},dependencies:[P,b],styles:[`.features[_ngcontent-%COMP%] {
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
