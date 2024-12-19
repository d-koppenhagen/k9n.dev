import{j as u,a8 as x,a9 as f,ɵ as C,a as o,w as _,aa as w,d as s,y as i,x as m,ab as M,ac as k,ad as P,b as l,e as h,G as g,W as j,I as c,a5 as b}from"./index-Be9IN4QR.js";import{M as v}from"./meta.service-T2YaP4d8.js";function y(a,t){if(a&1&&h(0,"img",3),a&2){const n=g();c("src",n.attributes.thumbnail.header,b)}}function O(a,t){if(a&1&&(o(0,"h1"),l(1),s(),o(2,"section",2),_(3,y,1,1,"img",3),s(),o(4,"section",4),h(5,"analog-markdown",5),o(6,"div",6)(7,"a",7),l(8," Auf GitHub bearbeiten "),s()()()),a&2){const n=t,r=g();i(),j(n.attributes.title),i(2),m(n.attributes.thumbnail&&n.attributes.thumbnail.header?3:-1),i(2),c("lang",n.attributes.language||"de")("content",n.content),i(2),c("href",r.editOnGithubLink(n.filename),b)}}const e=class e{constructor(){this.metaService=u(v),this.post$=x({param:"slug",subdirectory:"projects"}).pipe(f(t=>this.metaService.createMetaDataForPost("projects",t)))}editOnGithubLink(t){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${t}.md`}};e.ɵfac=function(n){return new(n||e)},e.ɵcmp=C({type:e,selectors:[["ng-component"]],decls:4,vars:3,consts:[[1,"wrapper","alt"],[1,"inner"],[1,"project-header"],["alt","",3,"src"],[1,"project-content"],["classes","markdown-content",3,"lang","content"],[1,"edit-on-github"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(n,r){if(n&1&&(o(0,"article",0)(1,"div",1),_(2,O,9,5),w(3,"async"),s()()),n&2){let p;i(2),m((p=M(3,1,r.post$))?2:-1,p)}},dependencies:[k,P],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]});let d=e;export{d as default};
