import{ɵ as g,a as f,i as C,t as b,O as x,M as P,N as j,d as v,l as i,e as l,f as y,o as c,p as s,h as d,j as M,A as w,k,n as _,m,s as u,r as O,q as p,u as h}from"./index-BjtsTuMn.js";import{M as z}from"./meta.service-Db8VkgF3.js";const B=["shareBtnBox"];function S(e,o){if(e&1&&m(0,"img",3),e&2){const t=u();p("src",t.attributes.thumbnail.header,h)}}function A(e,o){if(e&1&&(i(0,"h1"),_(1),c(),i(2,"section",2),l(3,S,1,1,"img",3),c(),i(4,"section",4),m(5,"analog-markdown",5),i(6,"div",6)(7,"a",7),_(8," Auf GitHub bearbeiten "),c()()()),e&2){const t=o,n=u();s(),O(t.attributes.title),s(2),d(t.attributes.thumbnail&&t.attributes.thumbnail.header?3:-1),s(2),p("lang",t.attributes.language||"de")("content",t.content),s(2),p("href",n.editOnGithubLink(t.filename),h)}}let F=(()=>{var e;class o{constructor(n){this.metaService=n,this.post$=C({param:"slug",subdirectory:"projects"}).pipe(b(a=>this.metaService.createMetaDataForPost("projects",a)))}editOnGithubLink(n){return`https://github.com/d-koppenhagen/k9n.dev/edit/main${n}`}}return e=o,e.ɵfac=function(n){return new(n||e)(g(z))},e.ɵcmp=f({type:e,selectors:[["ng-component"]],viewQuery:function(n,a){if(n&1&&x(B,5),n&2){let r;P(r=j())&&(a.shareBtnBox=r.first)}},standalone:!0,features:[v],decls:4,vars:3,consts:[[1,"wrapper","alt"],[1,"inner"],[1,"project-header"],["alt","",3,"src"],[1,"project-content"],["classes","markdown-content",3,"lang","content"],[1,"edit-on-github"],["target","_blank","rel","noopener noreferrer",3,"href"]],template:function(n,a){if(n&1&&(i(0,"article",0)(1,"div",1),l(2,A,9,5),y(3,"async"),c()()),n&2){let r;s(2),d((r=M(3,1,a.post$))?2:-1,r)}},dependencies:[w,k],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]}),o})();export{F as default};
