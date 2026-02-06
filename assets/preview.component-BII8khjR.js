import{ad as r,h as O,$ as y,ae as k,ɵ as x,af as w,a3 as M,q as p,w as _,r as h,b as m,v as d,u as C,H as u,J as s,x as o,X as g,ag as P,m as v,U as L,W as T,ah as F}from"./index-DPqAJY-c.js";function A(n,e){if(n&1&&C(0,"img",5),n&2){const t=u(2);s("src",t.attributes.publishedAt.logo,P)}}function $(n,e){if(n&1&&m(0),n&2){const t=u(2);g(" Original veröffentlicht auf ",t.attributes.publishedAt.name," ")}}function q(n,e){if(n&1&&(h(0,"footer"),p(1,A,1,1,"img",5)(2,$,1,1),d()),n&2){const t=u();o(),_(t.attributes.publishedAt.logo?1:2)}}function z(n,e){if(n&1&&(h(0,"article",0)(1,"h3",1)(2,"a",2),m(3),d()(),h(4,"div",3)(5,"p"),m(6),d()(),p(7,q,3,1,"footer"),C(8,"img",4),d()),n&2){const t=e,i=u();s("lang",t.attributes.language),o(2),s("hreflang",t.attributes.language||"de")("routerLink",i.routeToPost),o(),g(" ",t.attributes.title," "),o(),s("lang",t.attributes.language||"de"),o(2),g(" ",t.attributes.description," "),o(),_(t.attributes.publishedAt?7:-1),o(),s("src",t.attributes.thumbnail.card||t.attributes.thumbnail.header,P)}}const c=class c{constructor(){this.post=r.required(),this.faLib=O(y),this.faLib.addIcons(k)}get routeToPost(){const e=this.post()?.filename?.match(/\/([^/]+)\/([^/.]+)\.md$/);let t=[];if(e&&e.length===3){const[,i,a]=e;t=["/",i,a]}return t}get externalUrl(){const e=this.post()?.attributes?.publishedAt;return e&&e.linkExternal&&e.url?e.url:void 0}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=x({type:c,selectors:[["dk-card"]],inputs:{post:[1,"post"]},decls:1,vars:1,consts:[[3,"lang"],[1,"card-header"],[3,"hreflang","routerLink"],[1,"card-content",3,"lang"],["alt","",1,"card-image",3,"src"],["alt","",1,"published-at-logo",3,"src"]],template:function(t,i){if(t&1&&p(0,z,9,8,"article",0),t&2){let a;_((a=i.post())?0:-1,a)}},dependencies:[w,M],styles:[`article[_ngcontent-%COMP%] {
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
}`]});let f=c;const E=n=>["/",n],I=(n,e)=>e.slug;function j(n,e){if(n&1&&C(0,"dk-card",2),n&2){const t=e.$implicit;s("post",t)}}function R(n,e){if(n&1&&L(0,j,1,1,"dk-card",2,I),n&2){const t=u();T(t.reducedPostList)}}function U(n,e){n&1&&m(0," Es wurden keine passenden Einträge gefunden. ")}function D(n,e){if(n&1&&(h(0,"ul",1)(1,"li")(2,"a",3),m(3),d()()()),n&2){const t=u();o(2),s("routerLink",F(2,E,t.content())),o(),g("Alle anzeigen (",t.postsFiltered.length,")")}}const l=class l{constructor(){this.content=r.required(),this.posts=r.required(),this.keyword=r(""),this.search=r(""),this.max=r(),this.postsFiltered=[],this.reducedPostList=[]}updatePosts(){this.postsFiltered=(this.posts()||[]).filter(e=>{const t=this.content();return t?e.filename.includes(`/${t}/`):!0}).filter(e=>e.attributes.published!==!1).filter(e=>{const t=this.keyword();return t?!!e.attributes.keywords?.includes(t):!0}).filter(e=>{const t=this.search().toLowerCase();return t?e.attributes.keywords?.includes(this.search())||e.attributes.title.toLowerCase().includes(t)||e.attributes.description.toLowerCase().includes(t)||e.attributes.author.name.toLowerCase().includes(t)||e.attributes.author.mail.toLowerCase().includes(t):!0}).sort((e,t)=>{const i=+new Date(e.attributes.created),a=+new Date(t.attributes.created);return i-a}).reverse(),this.reducedPostList=this.postsFiltered.slice(0,this.max())}ngOnInit(){this.updatePosts()}ngOnChanges(){this.updatePosts()}};l.ɵfac=function(t){return new(t||l)},l.ɵcmp=x({type:l,selectors:[["dk-preview"]],inputs:{content:[1,"content"],posts:[1,"posts"],keyword:[1,"keyword"],search:[1,"search"],max:[1,"max"]},features:[v],decls:4,vars:2,consts:[[1,"features"],[1,"actions"],[3,"post"],[1,"button",3,"routerLink"]],template:function(t,i){if(t&1&&(h(0,"section",0),p(1,R,2,0)(2,U,1,0),d(),p(3,D,4,4,"ul",1)),t&2){o(),_(i.reducedPostList.length?1:2);const a=i.max();o(2),_(a&&a<i.postsFiltered.length||i.keyword()||i.search()?3:-1)}},dependencies:[w,f],styles:[`.features[_ngcontent-%COMP%] {
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
}`]});let b=l;export{b as P};
