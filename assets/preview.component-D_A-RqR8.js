import{aa as d,j as O,Y as y,ab as k,ɵ as w,w as p,x as m,ac as P,a7 as M,a as c,d as r,b as h,e as C,G as a,y as o,I as l,V as g,ad as b,v,ae as L,Q as T,T as F,af as A}from"./index-BbwBDzBm.js";function I(n,e){if(n&1&&(c(0,"a",1),h(1),r()),n&2){const t=a(),i=a();l("href",i.externalUrl,b)("lang",t.attributes.language||"de"),o(),g(" ",t.attributes.title," ")}}function j(n,e){if(n&1&&(c(0,"a",2),h(1),r()),n&2){const t=a(),i=a();l("lang",t.attributes.language||"de")("routerLink",i.routeToPost),o(),g(" ",t.attributes.title," ")}}function z(n,e){if(n&1&&C(0,"img",5),n&2){const t=a(2);l("src",t.attributes.publishedAt.logo,b)}}function E(n,e){if(n&1&&h(0),n&2){const t=a(2);g(" Original veröffentlicht auf ",t.attributes.publishedAt.name," ")}}function U(n,e){if(n&1&&(c(0,"footer"),p(1,z,1,1,"img",5)(2,E,1,1),r()),n&2){const t=a();o(),m(t.attributes.publishedAt.logo?1:2)}}function $(n,e){if(n&1&&(c(0,"article")(1,"h3",0),p(2,I,2,3,"a",1)(3,j,2,3,"a",2),r(),c(4,"div",3)(5,"p"),h(6),r()(),p(7,U,3,1,"footer"),C(8,"img",4),r()),n&2){const t=e,i=a();o(2),m(i.externalUrl?2:3),o(2),l("lang",t.attributes.language||"de"),o(2),g(" ",t.attributes.description," "),o(),m(t.attributes.publishedAt?7:-1),o(),l("src",t.attributes.thumbnail.card||t.attributes.thumbnail.header,b)}}const u=class u{constructor(){this.post=d.required(),this.faLib=O(y),this.faLib.addIcons(k)}get routeToPost(){const e=this.post()?.filename?.match(/\/([^/]+)\/([^/.]+)\.md$/);let t=[];if(e&&e.length===3){const[,i,s]=e;t=["/",i,s]}return t}get externalUrl(){const e=this.post()?.attributes?.publishedAt;return e&&e.linkExternal&&e.url?e.url:void 0}};u.ɵfac=function(t){return new(t||u)},u.ɵcmp=w({type:u,selectors:[["dk-card"]],inputs:{post:[1,"post"]},decls:1,vars:1,consts:[[1,"card-header"],["target","_blank",3,"href","lang"],[3,"lang","routerLink"],[1,"card-content",3,"lang"],["alt","",1,"card-image",3,"src"],["alt","",1,"published-at-logo",3,"src"]],template:function(t,i){if(t&1&&p(0,$,9,5,"article"),t&2){let s;m((s=i.post())?0:-1,s)}},dependencies:[P,M],styles:[`article[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}
article[_ngcontent-%COMP%]:focus-within   [_ngcontent-%COMP%]:focus {
  box-shadow: none;
  outline: none;
  border: none;
}
article[_ngcontent-%COMP%]:focus-within:not(:hover) {
  outline: 1px solid rgb(227, 227, 227);
  outline-offset: 0;
}
article[_ngcontent-%COMP%]:hover {
  outline: 1px solid #ffffff;
  outline-offset: 0;
}
img.card-image[_ngcontent-%COMP%] {
  height: 180px;
  object-fit: cover;
  order: -1;
}
.card-header[_ngcontent-%COMP%] {
  margin: 1.5rem 1.5rem 0;
  min-height: 100px;
}
.card-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
}
.card-header[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
}
.card-content[_ngcontent-%COMP%] {
  align-self: flex-start;
  margin: 0 1.5rem;
  flex-grow: 1;
}
footer[_ngcontent-%COMP%] {
  margin: 1.5rem 1.5rem 0;
  display: flex;
  flex-direction: row-reverse;
}
footer[_ngcontent-%COMP%]    > img.published-at-logo[_ngcontent-%COMP%] {
  max-width: 150px;
  max-height: 50px;
  padding-bottom: 0.75rem;
}


@media screen and (max-width: 980px) {
  img.card-image[_ngcontent-%COMP%] {
    height: 150px;
  }
}
@media screen and (max-width: 736px) {
  img.card-image[_ngcontent-%COMP%] {
    height: 120px;
  }
}`]});let f=u;const q=(n,e)=>e.slug,R=n=>["/",n];function D(n,e){if(n&1&&C(0,"dk-card",2),n&2){const t=e.$implicit;l("post",t)}}function B(n,e){if(n&1&&T(0,D,1,1,"dk-card",2,q),n&2){const t=a();F(t.reducedPostList)}}function G(n,e){n&1&&h(0," Es wurden keine passenden Einträge gefunden. ")}function N(n,e){if(n&1&&(c(0,"ul",1)(1,"li")(2,"a",3),h(3),r()()()),n&2){const t=a();o(2),l("routerLink",A(2,R,t.content())),o(),g("Alle anzeigen (",t.postsFiltered.length,")")}}const _=class _{constructor(){this.content=d.required(),this.posts=d.required(),this.keyword=d(""),this.search=d(""),this.max=d(),this.postsFiltered=[],this.reducedPostList=[]}updatePosts(){this.postsFiltered=(this.posts()||[]).filter(e=>{const t=this.content();return t?e.filename.includes(`/${t}/`):!0}).filter(e=>e.attributes.published!==!1).filter(e=>{const t=this.keyword();return t?!!e.attributes.keywords?.includes(t):!0}).filter(e=>{const t=this.search().toLowerCase();return t?e.attributes.keywords?.includes(this.search())||e.attributes.title.toLowerCase().includes(t)||e.attributes.description.toLowerCase().includes(t)||e.attributes.author.name.toLowerCase().includes(t)||e.attributes.author.mail.toLowerCase().includes(t):!0}).sort((e,t)=>{const i=+new Date(e.attributes.created),s=+new Date(t.attributes.created);return i-s}).reverse(),this.reducedPostList=this.postsFiltered.slice(0,this.max())}ngOnInit(){this.updatePosts()}ngOnChanges(){this.updatePosts()}};_.ɵfac=function(t){return new(t||_)},_.ɵcmp=w({type:_,selectors:[["dk-preview"]],inputs:{content:[1,"content"],posts:[1,"posts"],keyword:[1,"keyword"],search:[1,"search"],max:[1,"max"]},features:[v],decls:5,vars:2,consts:[[1,"features"],[1,"actions"],[3,"post"],[1,"button",3,"routerLink"]],template:function(t,i){if(t&1&&(c(0,"section",0),p(1,B,2,0)(2,G,1,0),r(),L(3),p(4,N,4,4,"ul",1)),t&2){o(),m(i.reducedPostList.length?1:2);const s=i.max();o(3),m(s&&s<i.postsFiltered.length||i.keyword()||i.search()?4:-1)}},dependencies:[P,f],styles:[`.features[_ngcontent-%COMP%] {
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
