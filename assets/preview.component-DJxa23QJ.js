import{a as C,d as b,l as r,m as h,n as d,o as s,e as p,p as o,q as l,u as m,r as P,y as f,h as u,R as x,s as c,B as w,aq as v,v as O,x as M,z as y}from"./index-DI8V-RFT.js";function k(t,i){if(t&1&&(r(0,"a",5),d(1,"Weiterlesen..."),s()),t&2){const n=c();l("href",n.externalUrl,m)("lang",n.post.attributes.language||"de")}}function T(t,i){if(t&1&&(r(0,"a",6),d(1,"Weiterlesen..."),s()),t&2){const n=c();l("lang",n.post.attributes.language||"de")("routerLink",n.routeToPost)}}function F(t,i){if(t&1&&h(0,"img",8),t&2){const n=c(2);l("src",n.post.attributes.publishedAt.logo,m)}}function L(t,i){if(t&1&&d(0),t&2){const n=c(2);f(" Original veröffentlicht auf ",n.post.attributes.publishedAt.name," ")}}function A(t,i){if(t&1&&(r(0,"a",7),p(1,F,1,1,"img",8)(2,L,1,1),s()),t&2){const n=c();l("href",n.post.attributes.publishedAt.url,m)("lang",n.post.attributes.language||"de")("title","Original veröffentlicht auf "+n.post.attributes.publishedAt.name),w("aria-label","Original veröffentlicht auf "+n.post.attributes.publishedAt.name),o(),u(n.post.attributes.publishedAt.logo?1:2)}}let D=(()=>{var t;class i{constructor(){}get routeToPost(){const e=this.post.filename.match(/\/([^/]+)\/([^/.]+)\.md$/);let a=[];if(e&&e.length===3){const[,_,g]=e;a=["/",_,g]}return a}get externalUrl(){const e=this.post.attributes.publishedAt;return e&&e.linkExternal&&e.url?e.url:void 0}}return t=i,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=C({type:t,selectors:[["dk-card"]],inputs:{post:"post"},standalone:!0,features:[b],decls:12,vars:6,consts:[["alt","",1,"card-image",3,"src"],[1,"card-header"],[1,"major"],[1,"card-content",3,"lang"],[1,"card-footer"],["target","_blank",1,"special","read-on",3,"href","lang"],[1,"special","read-on",3,"lang","routerLink"],["target","_blank",1,"published-at-link",3,"href","lang","title"],["alt","",1,"published-at-logo",3,"src"]],template:function(e,a){e&1&&(r(0,"article"),h(1,"img",0),r(2,"div",1)(3,"h3",2),d(4),s()(),r(5,"div",3)(6,"p"),d(7),s()(),r(8,"div",4),p(9,k,2,2,"a",5)(10,T,2,2,"a",6)(11,A,3,5,"a",7),s()()),e&2&&(o(),l("src",a.post.attributes.thumbnail.card||a.post.attributes.thumbnail.header,m),o(3),P(a.post.attributes.title),o(),l("lang",a.post.attributes.language||"de"),o(2),f(" ",a.post.attributes.description," "),o(2),u(a.externalUrl?9:10),o(2),u(a.post.attributes.publishedAt&&a.post.attributes.publishedAt.name&&a.post.attributes.publishedAt.url?11:-1))},dependencies:[x],styles:[`article[_ngcontent-%COMP%] {
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
}`]}),i})();const j=(t,i)=>i.slug,z=t=>["/",t];function E(t,i){if(t&1&&h(0,"dk-card",2),t&2){const n=i.$implicit;l("post",n)}}function U(t,i){if(t&1&&O(0,E,1,1,"dk-card",2,j),t&2){const n=c();M(n.reducedPostList)}}function $(t,i){t&1&&d(0," Es wurden keine passenden Einträge gefunden. ")}function I(t,i){if(t&1&&(r(0,"ul",1)(1,"li")(2,"a",3),d(3),s()()()),t&2){const n=c();o(2),l("routerLink",y(2,z,n.content)),o(),f("Alle anzeigen (",n.postsFiltered.length,")")}}let q=(()=>{var t;class i{constructor(){this.keyword="",this.search="",this.posts=[],this.postsFiltered=[],this.reducedPostList=[]}updatePosts(){this.postsFiltered=this.posts.filter(e=>this.content?e.filename.includes(`/${this.content}/`):!0).filter(e=>e.attributes.published!==!1).filter(e=>this.keyword?!!e.attributes.keywords?.includes(this.keyword):!0).filter(e=>{const a=this.search.toLowerCase();return a?e.attributes.keywords?.includes(this.search)||e.attributes.title.toLowerCase().includes(a)||e.attributes.description.toLowerCase().includes(a)||e.attributes.author.name.toLowerCase().includes(a)||e.attributes.author.mail.toLowerCase().includes(a):!0}).sort((e,a)=>{const _=+new Date(e.attributes.created),g=+new Date(a.attributes.created);return _-g}).reverse(),this.reducedPostList=this.postsFiltered.slice(0,this.max)}ngOnInit(){this.updatePosts()}ngOnChanges(){this.updatePosts()}}return t=i,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=C({type:t,selectors:[["dk-preview"]],inputs:{content:"content",max:"max",keyword:"keyword",search:"search",posts:"posts"},standalone:!0,features:[v,b],decls:4,vars:2,consts:[[1,"features"],[1,"actions"],[3,"post"],[1,"button",3,"routerLink"]],template:function(e,a){e&1&&(r(0,"section",0),p(1,U,2,0)(2,$,1,0),s(),p(3,I,4,4,"ul",1)),e&2&&(o(),u(a.reducedPostList.length?1:2),o(2),u(a.max&&a.max<a.postsFiltered.length||a.keyword||a.search?3:-1))},dependencies:[x,D],styles:[`.features[_ngcontent-%COMP%] {
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
}`]}),i})();export{q as P};
