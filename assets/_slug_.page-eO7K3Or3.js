import{h as b,ai as x,aj as f,ɵ as C,ak as w,al as M,q as _,an as k,w as m,ao as v,r as o,b as l,v as c,u as g,H as h,J as s,x as i,Y as P,ag as u}from"./index-DPqAJY-c.js";import{M as j}from"./meta.service-BREMCqzZ.js";function O(a,t){if(a&1&&g(0,"img",3),a&2){const n=h();s("src",n.attributes.thumbnail.header,u)}}function y(a,t){if(a&1&&(o(0,"article",0)(1,"div",1)(2,"h1"),l(3),c(),o(4,"section",2),_(5,O,1,1,"img",3),c(),o(6,"section",4),g(7,"analog-markdown",5),o(8,"div",6)(9,"a",7),l(10," Auf GitHub bearbeiten "),c()()()()()),a&2){const n=t,r=h();s("lang",n.attributes.language),i(3),P(n.attributes.title),i(2),m(n.attributes.thumbnail&&n.attributes.thumbnail.header?5:-1),i(2),s("lang",n.attributes.language||"de")("content",n.content),i(2),s("href",r.editOnGithubLink(n.filename),u)}}const e=class e{constructor(){this.metaService=b(j),this.post$=x({param:"slug",subdirectory:"projects"}).pipe(f(t=>this.metaService.createMetaDataForPost("projects",t)))}editOnGithubLink(t){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${t}.md`}};e.ɵfac=function(n){return new(n||e)},e.ɵcmp=C({type:e,selectors:[["ng-component"]],decls:2,vars:3,consts:[[1,"wrapper","alt",3,"lang"],[1,"inner"],[1,"project-header"],["alt","",3,"src"],[1,"project-content"],["classes","markdown-content",3,"lang","content"],[1,"edit-on-github"],["rel","noopener noreferrer",3,"href"]],template:function(n,r){if(n&1&&(_(0,y,11,6,"article",0),k(1,"async")),n&2){let p;m((p=v(1,1,r.post$))?0:-1,p)}},dependencies:[w,M],styles:[`.wrapper[_ngcontent-%COMP%] {
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
