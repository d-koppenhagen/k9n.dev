import{aa as r,j as O,Y as y,ab as k,ɵ as x,w as p,x as _,ac as w,a7 as M,a as m,b as g,d,e as C,G as u,I as s,y as o,V as h,ad as P,v,ae as L,Q as T,T as F,af as A}from"./index-nZOzKHyg.js";function I(n,e){if(n&1&&C(0,"img",5),n&2){const t=u(2);s("src",t.attributes.publishedAt.logo,P)}}function j(n,e){if(n&1&&g(0),n&2){const t=u(2);h(" Original veröffentlicht auf ",t.attributes.publishedAt.name," ")}}function z(n,e){if(n&1&&(m(0,"footer"),p(1,I,1,1,"img",5)(2,j,1,1),d()),n&2){const t=u();o(),_(t.attributes.publishedAt.logo?1:2)}}function E(n,e){if(n&1&&(m(0,"article",0)(1,"h3",1)(2,"a",2),g(3),d()(),m(4,"div",3)(5,"p"),g(6),d()(),p(7,z,3,1,"footer"),C(8,"img",4),d()),n&2){const t=e,i=u();s("lang",t.attributes.language),o(2),s("lang",t.attributes.language||"de")("routerLink",i.routeToPost),o(),h(" ",t.attributes.title," "),o(),s("lang",t.attributes.language||"de"),o(2),h(" ",t.attributes.description," "),o(),_(t.attributes.publishedAt?7:-1),o(),s("src",t.attributes.thumbnail.card||t.attributes.thumbnail.header,P)}}const c=class c{constructor(){this.post=r.required(),this.faLib=O(y),this.faLib.addIcons(k)}get routeToPost(){const e=this.post()?.filename?.match(/\/([^/]+)\/([^/.]+)\.md$/);let t=[];if(e&&e.length===3){const[,i,a]=e;t=["/",i,a]}return t}get externalUrl(){const e=this.post()?.attributes?.publishedAt;return e&&e.linkExternal&&e.url?e.url:void 0}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=x({type:c,selectors:[["dk-card"]],inputs:{post:[1,"post"]},decls:1,vars:1,consts:[[3,"lang"],[1,"card-header"],[3,"lang","routerLink"],[1,"card-content",3,"lang"],["alt","",1,"card-image",3,"src"],["alt","",1,"published-at-logo",3,"src"]],template:function(t,i){if(t&1&&p(0,E,9,8,"article",0),t&2){let a;_((a=i.post())?0:-1,a)}},dependencies:[w,M],styles:[`article[_ngcontent-%COMP%] {
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
}`]});let f=c;const $=(n,e)=>e.slug,q=n=>["/",n];function R(n,e){if(n&1&&C(0,"dk-card",2),n&2){const t=e.$implicit;s("post",t)}}function D(n,e){if(n&1&&T(0,R,1,1,"dk-card",2,$),n&2){const t=u();F(t.reducedPostList)}}function U(n,e){n&1&&g(0," Es wurden keine passenden Einträge gefunden. ")}function B(n,e){if(n&1&&(m(0,"ul",1)(1,"li")(2,"a",3),g(3),d()()()),n&2){const t=u();o(2),s("routerLink",A(2,q,t.content())),o(),h("Alle anzeigen (",t.postsFiltered.length,")")}}const l=class l{constructor(){this.content=r.required(),this.posts=r.required(),this.keyword=r(""),this.search=r(""),this.max=r(),this.postsFiltered=[],this.reducedPostList=[]}updatePosts(){this.postsFiltered=(this.posts()||[]).filter(e=>{const t=this.content();return t?e.filename.includes(`/${t}/`):!0}).filter(e=>e.attributes.published!==!1).filter(e=>{const t=this.keyword();return t?!!e.attributes.keywords?.includes(t):!0}).filter(e=>{const t=this.search().toLowerCase();return t?e.attributes.keywords?.includes(this.search())||e.attributes.title.toLowerCase().includes(t)||e.attributes.description.toLowerCase().includes(t)||e.attributes.author.name.toLowerCase().includes(t)||e.attributes.author.mail.toLowerCase().includes(t):!0}).sort((e,t)=>{const i=+new Date(e.attributes.created),a=+new Date(t.attributes.created);return i-a}).reverse(),this.reducedPostList=this.postsFiltered.slice(0,this.max())}ngOnInit(){this.updatePosts()}ngOnChanges(){this.updatePosts()}};l.ɵfac=function(t){return new(t||l)},l.ɵcmp=x({type:l,selectors:[["dk-preview"]],inputs:{content:[1,"content"],posts:[1,"posts"],keyword:[1,"keyword"],search:[1,"search"],max:[1,"max"]},features:[v],decls:5,vars:2,consts:[[1,"features"],[1,"actions"],[3,"post"],[1,"button",3,"routerLink"]],template:function(t,i){if(t&1&&(m(0,"section",0),p(1,D,2,0)(2,U,1,0),d(),L(3),p(4,B,4,4,"ul",1)),t&2){o(),_(i.reducedPostList.length?1:2);const a=i.max();o(3),_(a&&a<i.postsFiltered.length||i.keyword()||i.search()?4:-1)}},dependencies:[w,f],styles:[`.features[_ngcontent-%COMP%] {
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
