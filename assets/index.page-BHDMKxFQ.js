var de=Object.defineProperty;var ce=(t,n,e)=>n in t?de(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var r=(t,n,e)=>ce(t,typeof n!="symbol"?n+"":n,e);import{O as X,i as ue,e as he,f as ge,h as m,N as pe,C as me,j as ee,E as fe,S as ye,B as _e,k as be,P as W,I as we,l as G,s as Pe,o as ke,t as ve,ɵ as b,m as Ce,n as x,p as D,q as te,r as c,u as h,v as s,w as ne,x as g,y as ie,z as Ae,A as Se,D as xe,F as Ie,G as re,H as R,J as _,a as f,K as Be,d as Y,c as y,L as Te,M as Ee,Q as Me,R as Oe,T as Le,U as ze,V as De,W as Re,b as l,X as j,Y as E,Z as Fe,$ as Ue,a0 as Ve,a1 as Ne,a2 as Qe,a3 as We,a4 as Ge,a5 as ae,a6 as oe,a7 as se,a8 as M,a9 as Ye,aa as je,ab as qe,ac as O}from"./index-DPqAJY-c.js";import{P as He}from"./preview.component-BII8khjR.js";function Ze(t,n,e){return new X(function(d){var i=function(){for(var o=[],u=0;u<arguments.length;u++)o[u]=arguments[u];return d.next(o.length===1?o[0]:o)},a=t(i);return ue(n)?function(){return n(i,a)}:void 0})}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $e={};/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function I(t){return Object.isFrozen(t)&&Object.isFrozen(t.raw)}function B(t){return t.toString().indexOf("`")===-1}B(t=>t``)||B(t=>t`\0`)||B(t=>t`\n`)||B(t=>t`\u0000`);I``&&I`\0`&&I`\n`&&I`\u0000`;/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ke="google#safe";let Je=Ke;const Xe=globalThis.trustedTypes;let q=Xe,L;function et(){let t=null;if(!q)return t;try{const n=e=>e;t=q.createPolicy(Je,{createHTML:n,createScript:n,createScriptURL:n})}catch{}return t}function tt(){return L===void 0&&(L=et()),L}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class le{constructor(n,e){this.privateDoNotAccessOrElseWrappedResourceUrl=e}toString(){return this.privateDoNotAccessOrElseWrappedResourceUrl+""}}const nt=le;function it(t){return new nt($e,t)}function H(t){const n=t,e=tt();return it(e?e.createScriptURL(n):n)}function rt(t){return t instanceof le}function at(t){if(rt(t))return t.privateDoNotAccessOrElseWrappedResourceUrl;{let n="";throw new Error(n)}}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ot(t,...n){if(n.length===0)return H(t[0]);t[0].toLowerCase();let e=t[0];for(let d=0;d<n.length;d++)e+=encodeURIComponent(n[d])+t[d+1];return H(e)}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function st(t){return lt("script",t)}function lt(t,n=document){var e;const d=(e=n.querySelector)===null||e===void 0?void 0:e.call(n,`${t}[nonce]`);return d==null?"":d.nonce||d.getAttribute("nonce")||""}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function dt(t){const n=st(t.ownerDocument);n&&t.setAttribute("nonce",n)}function ct(t,n,e){t.src=at(n),dt(t)}const ut=["youtubeContainer"];function ht(t,n){if(t&1){const e=Ie();c(0,"youtube-player-placeholder",2),re("click",function(){Me(e);const i=R();return Oe(i._load(!0))}),s()}if(t&2){const e=R();_("videoId",e.videoId)("width",e.width)("height",e.height)("isLoading",e._isLoading)("buttonLabel",e.placeholderButtonLabel)("quality",e.placeholderImageQuality)}}let gt=(()=>{const e=class e{constructor(){r(this,"videoId");r(this,"width");r(this,"height");r(this,"isLoading");r(this,"buttonLabel");r(this,"quality")}_getBackgroundImage(){let i;return this.quality==="low"?i=`https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`:this.quality==="high"?i=`https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`:i=`https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,`url(${i})`}};r(e,"ɵfac",function(a){return new(a||e)}),r(e,"ɵcmp",b({type:e,selectors:[["youtube-player-placeholder"]],hostAttrs:[1,"youtube-player-placeholder"],hostVars:8,hostBindings:function(a,o){a&2&&(ie("background-image",o._getBackgroundImage())("width",o.width,"px")("height",o.height,"px"),Ee("youtube-player-placeholder-loading",o.isLoading))},inputs:{videoId:"videoId",width:"width",height:"height",isLoading:"isLoading",buttonLabel:"buttonLabel",quality:"quality"},decls:4,vars:1,consts:[["type","button",1,"youtube-player-placeholder-button"],["height","100%","version","1.1","viewBox","0 0 68 48","focusable","false","aria-hidden","true"],["d","M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z","fill","#f00"],["d","M 45,24 27,14 27,34","fill","#fff"]],template:function(a,o){a&1&&(f(0,"button",0),Be(),f(1,"svg",1),Y(2,"path",2)(3,"path",3),y()()),a&2&&Te("aria-label",o.buttonLabel)},styles:[`.youtube-player-placeholder{display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden;cursor:pointer;background-color:#000;background-position:center center;background-size:cover;transition:box-shadow 300ms ease;box-shadow:inset 0 120px 90px -90px rgba(0,0,0,.8)}:fullscreen .youtube-player-placeholder{min-width:100vw;min-height:100vh}.youtube-player-placeholder-button{transition:opacity 300ms ease;-moz-appearance:none;-webkit-appearance:none;background:none;border:none;padding:0;display:flex}.youtube-player-placeholder-button svg{width:68px;height:48px}.youtube-player-placeholder-loading{box-shadow:none}.youtube-player-placeholder-loading .youtube-player-placeholder-button{opacity:0}
`],encapsulation:2,changeDetection:0}));let n=e;return n})();const pt=new we("YOUTUBE_PLAYER_CONFIG"),Z=640,$=390;function K(t){return t==null?t:D(t,0)}var p=(function(t){return t[t.UNSTARTED=-1]="UNSTARTED",t[t.ENDED=0]="ENDED",t[t.PLAYING=1]="PLAYING",t[t.PAUSED=2]="PAUSED",t[t.BUFFERING=3]="BUFFERING",t[t.CUED=5]="CUED",t})(p||{});let F=(()=>{const e=class e{constructor(){r(this,"_ngZone",m(pe));r(this,"_nonce",m(me,{optional:!0}));r(this,"_changeDetectorRef",m(ee));r(this,"_elementRef",m(fe));r(this,"_player");r(this,"_pendingPlayer");r(this,"_existingApiReadyCallback");r(this,"_pendingPlayerState");r(this,"_destroyed",new ye);r(this,"_playerChanges",new _e(void 0));r(this,"_isLoading",!1);r(this,"_hasPlaceholder",!0);r(this,"_isBrowser");r(this,"videoId");r(this,"_height",$);r(this,"_width",Z);r(this,"startSeconds");r(this,"endSeconds");r(this,"suggestedQuality");r(this,"playerVars");r(this,"disableCookies",!1);r(this,"loadApi");r(this,"disablePlaceholder",!1);r(this,"showBeforeIframeApiLoads",!1);r(this,"placeholderButtonLabel");r(this,"placeholderImageQuality");r(this,"ready",new be);r(this,"stateChange",this._getLazyEmitter("onStateChange"));r(this,"error",this._getLazyEmitter("onError"));r(this,"apiChange",this._getLazyEmitter("onApiChange"));r(this,"playbackQualityChange",this._getLazyEmitter("onPlaybackQualityChange"));r(this,"playbackRateChange",this._getLazyEmitter("onPlaybackRateChange"));r(this,"youtubeContainer");const i=m(W),a=m(pt,{optional:!0});this.loadApi=a?.loadApi??!0,this.disablePlaceholder=!!a?.disablePlaceholder,this.placeholderButtonLabel=a?.placeholderButtonLabel||"Play video",this.placeholderImageQuality=a?.placeholderImageQuality||"standard",this._isBrowser=G(i)}get height(){return this._height}set height(i){this._height=i==null||isNaN(i)?$:i}get width(){return this._width}set width(i){this._width=i==null||isNaN(i)?Z:i}ngAfterViewInit(){this._conditionallyLoad()}ngOnChanges(i){this._shouldRecreatePlayer(i)?this._conditionallyLoad():this._player&&((i.width||i.height)&&this._setSize(),i.suggestedQuality&&this._setQuality(),(i.startSeconds||i.endSeconds||i.suggestedQuality)&&this._cuePlayer())}ngOnDestroy(){this._pendingPlayer?.destroy(),this._player&&(this._player.destroy(),window.onYouTubeIframeAPIReady=this._existingApiReadyCallback),this._playerChanges.complete(),this._destroyed.next(),this._destroyed.complete()}playVideo(){this._player?this._player.playVideo():(this._getPendingState().playbackState=p.PLAYING,this._load(!0))}pauseVideo(){this._player?this._player.pauseVideo():this._getPendingState().playbackState=p.PAUSED}stopVideo(){this._player?this._player.stopVideo():this._getPendingState().playbackState=p.CUED}seekTo(i,a){this._player?this._player.seekTo(i,a):this._getPendingState().seek={seconds:i,allowSeekAhead:a}}mute(){this._player?this._player.mute():this._getPendingState().muted=!0}unMute(){this._player?this._player.unMute():this._getPendingState().muted=!1}isMuted(){return this._player?this._player.isMuted():this._pendingPlayerState?!!this._pendingPlayerState.muted:!1}setVolume(i){this._player?this._player.setVolume(i):this._getPendingState().volume=i}getVolume(){return this._player?this._player.getVolume():this._pendingPlayerState&&this._pendingPlayerState.volume!=null?this._pendingPlayerState.volume:0}setPlaybackRate(i){if(this._player)return this._player.setPlaybackRate(i);this._getPendingState().playbackRate=i}getPlaybackRate(){return this._player?this._player.getPlaybackRate():this._pendingPlayerState&&this._pendingPlayerState.playbackRate!=null?this._pendingPlayerState.playbackRate:0}getAvailablePlaybackRates(){return this._player?this._player.getAvailablePlaybackRates():[]}getVideoLoadedFraction(){return this._player?this._player.getVideoLoadedFraction():0}getPlayerState(){if(!(!this._isBrowser||!window.YT))return this._player?this._player.getPlayerState():this._pendingPlayerState&&this._pendingPlayerState.playbackState!=null?this._pendingPlayerState.playbackState:p.UNSTARTED}getCurrentTime(){return this._player?this._player.getCurrentTime():this._pendingPlayerState&&this._pendingPlayerState.seek?this._pendingPlayerState.seek.seconds:0}getPlaybackQuality(){return this._player?this._player.getPlaybackQuality():"default"}getAvailableQualityLevels(){return this._player?this._player.getAvailableQualityLevels():[]}getDuration(){return this._player?this._player.getDuration():0}getVideoUrl(){return this._player?this._player.getVideoUrl():""}getVideoEmbedCode(){return this._player?this._player.getVideoEmbedCode():""}async requestFullscreen(i){const a=this._elementRef.nativeElement;return a.requestFullscreen?a.requestFullscreen(i):Promise.reject(new Error("Fullscreen API not supported by browser."))}_load(i){this._isBrowser&&(!window.YT||!window.YT.Player?(this.loadApi?(this._isLoading=!0,mt(this._nonce)):this.showBeforeIframeApiLoads,this._existingApiReadyCallback=window.onYouTubeIframeAPIReady,window.onYouTubeIframeAPIReady=()=>{this._existingApiReadyCallback?.(),this._ngZone.run(()=>this._createPlayer(i))}):this._createPlayer(i))}_conditionallyLoad(){this._shouldShowPlaceholder()?this.playerVars?.autoplay===1&&this._load(!0):this._load(!1)}_shouldShowPlaceholder(){return this.disablePlaceholder?!1:this._isBrowser?this._hasPlaceholder&&!!this.videoId&&!this._player:!0}_getPendingState(){return this._pendingPlayerState||(this._pendingPlayerState={}),this._pendingPlayerState}_shouldRecreatePlayer(i){const a=i.videoId||i.playerVars||i.disableCookies||i.disablePlaceholder;return!!a&&!a.isFirstChange()}_createPlayer(i){if(this._player?.destroy(),this._pendingPlayer?.destroy(),typeof YT>"u"||!this.videoId&&!this.playerVars?.list)return;const a={host:this.disableCookies?"https://www.youtube-nocookie.com":void 0,width:this.width,height:this.height,playerVars:i?{...this.playerVars||{},autoplay:1}:this.playerVars};this.videoId&&(a.videoId=this.videoId);const o=this._ngZone.runOutsideAngular(()=>new YT.Player(this.youtubeContainer.nativeElement,a)),u=S=>{this._ngZone.run(()=>{this._isLoading=!1,this._hasPlaceholder=!1,this._player=o,this._pendingPlayer=void 0,o.removeEventListener("onReady",u),this._playerChanges.next(o),this.ready.emit(S),this._setSize(),this._setQuality(),this._pendingPlayerState&&(this._applyPendingPlayerState(o,this._pendingPlayerState),this._pendingPlayerState=void 0);const w=o.getPlayerState();w===p.UNSTARTED||w===p.CUED||w==null?this._cuePlayer():i&&this.startSeconds&&this.startSeconds>0&&o.seekTo(this.startSeconds,!0),this._changeDetectorRef.markForCheck()})};this._pendingPlayer=o,o.addEventListener("onReady",u)}_applyPendingPlayerState(i,a){const{playbackState:o,playbackRate:u,volume:S,muted:w,seek:T}=a;switch(o){case p.PLAYING:i.playVideo();break;case p.PAUSED:i.pauseVideo();break;case p.CUED:i.stopVideo();break}u!=null&&i.setPlaybackRate(u),S!=null&&i.setVolume(S),w!=null&&(w?i.mute():i.unMute()),T!=null&&i.seekTo(T.seconds,T.allowSeekAhead)}_cuePlayer(){this._player&&this.videoId&&this._player.cueVideoById({videoId:this.videoId,startSeconds:this.startSeconds,endSeconds:this.endSeconds,suggestedQuality:this.suggestedQuality})}_setSize(){this._player?.setSize(this.width,this.height)}_setQuality(){this._player&&this.suggestedQuality&&this._player.setPlaybackQuality(this.suggestedQuality)}_getLazyEmitter(i){return this._playerChanges.pipe(Pe(a=>a?Ze(o=>{a.addEventListener(i,o)},o=>{try{a?.removeEventListener?.(i,o)}catch{}}):ke()),a=>new X(o=>a.subscribe({next:u=>this._ngZone.run(()=>o.next(u)),error:u=>o.error(u),complete:()=>o.complete()})),ve(this._destroyed))}};r(e,"ɵfac",function(a){return new(a||e)}),r(e,"ɵcmp",b({type:e,selectors:[["youtube-player"]],viewQuery:function(a,o){if(a&1&&Ae(ut,7),a&2){let u;Se(u=xe())&&(o.youtubeContainer=u.first)}},inputs:{videoId:"videoId",height:[2,"height","height",D],width:[2,"width","width",D],startSeconds:[2,"startSeconds","startSeconds",K],endSeconds:[2,"endSeconds","endSeconds",K],suggestedQuality:"suggestedQuality",playerVars:"playerVars",disableCookies:[2,"disableCookies","disableCookies",x],loadApi:[2,"loadApi","loadApi",x],disablePlaceholder:[2,"disablePlaceholder","disablePlaceholder",x],showBeforeIframeApiLoads:[2,"showBeforeIframeApiLoads","showBeforeIframeApiLoads",x],placeholderButtonLabel:"placeholderButtonLabel",placeholderImageQuality:"placeholderImageQuality"},outputs:{ready:"ready",stateChange:"stateChange",error:"error",apiChange:"apiChange",playbackQualityChange:"playbackQualityChange",playbackRateChange:"playbackRateChange"},features:[Ce],decls:4,vars:3,consts:[["youtubeContainer",""],[3,"videoId","width","height","isLoading","buttonLabel","quality"],[3,"click","videoId","width","height","isLoading","buttonLabel","quality"]],template:function(a,o){a&1&&(te(0,ht,1,6,"youtube-player-placeholder",1),c(1,"div"),h(2,"div",null,0),s()),a&2&&(ne(o._shouldShowPlaceholder()?0:-1),g(),ie("display",o._shouldShowPlaceholder()?"none":""))},dependencies:[gt],styles:[`youtube-player:fullscreen,youtube-player:fullscreen iframe{min-width:100vw;min-height:100vh}
`],encapsulation:2,changeDetection:0}));let n=e;return n})(),z=!1;function mt(t){if(z)return;const n=ot`https://www.youtube.com/iframe_api`,e=document.createElement("script"),d=i=>{e.removeEventListener("load",d),e.removeEventListener("error",d),i.type==="error"&&(z=!1)};e.addEventListener("load",d),e.addEventListener("error",d),ct(e,n),e.async=!0,t&&e.setAttribute("nonce",t),z=!0,document.body.appendChild(e)}let ft=(()=>{const e=class e{};r(e,"ɵfac",function(a){return new(a||e)}),r(e,"ɵmod",he({type:e,imports:[F],exports:[F]})),r(e,"ɵinj",ge({}));let n=e;return n})();function yt(t,n){if(t&1&&(c(0,"li",1)(1,"div",2)(2,"div",3)(3,"span",4),l(4),s(),c(5,"span",5),l(6),s()(),c(7,"h4",6),l(8),s(),c(9,"span",7),l(10),s(),c(11,"p"),l(12),s()()()),t&2){const e=n.$implicit,d=n.$index;_("ngClass",d%2!==0?"right":"left"),g(4),j(" ",e.when," "),g(2),E(e.location),g(2),j(" ",e.what," "),g(2),E(e.where),g(2),E(e.info)}}const P=class P{constructor(){this.steps=[{location:"Frankfurt (Oder)",when:"2012",what:`🧰 Facharbeiter
IT-Systemelektroniker`,where:"Deutschen Telekom AG",info:"Informatik, Telekommunikationstechnik sowie Elektrotechnik"},{location:"Cottbus",when:"2012",what:"☎️ Sachbearbeiter Technische Kundenberatung",where:"Deutsche Telekom Technischer Service GmbH (Customer Competence Center)",info:"Second Level Support für VoIP und WLAN Produkte."},{location:"Leipzig",when:"2015",what:`🎓 Bachelor Of Engineering
Kommunikations- Und Medieninformatik`,where:"Deutsche Telekom Hochschule für Telekommunikation",info:"Netzwerk- und Übertragungstechnik, Software Engineering, IT-Architektur, Protokollengineering sowie Web und Medien-Technologien."},{location:"Berlin",when:"2015",what:"🚨 Entwickler TETRA Support Und Umsetzung",where:"Deutsche Telekom Healthcare & Security Solutions GmbH",info:"Umsetzung von Client- und Serversystemen im Bereich des TETRA-BOS. Administration, Konfiguration, Integration und Test von IT-Systemen."},{location:" ",when:"2017",what:"📕 Angular (1. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript"},{location:"Berlin",when:"2019",what:`💎 Spezialist
Entwickler Und IT-Berater`,where:"DB Systel GmbH",info:"Entwicklung nutzerzentrierter Webanwendungen im Enterprise-Umfeld. Beratung zur Umsetzung von Web-Anwendungen und -Architekturen sowie User Experience (UX) Consulting."},{location:" ",when:"2019",what:"📕 Angular (2. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive NativeScript und NgRx"},{location:" ",when:"2020",what:"📕 Angular (3. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive RxJS, NgRx und PWA"},{location:"Berlin",when:"2022",what:"💎 Seniorberater & Frontend Architect",where:"DB Systel GmbH",info:"Entwicklung von Enterprise-Webanwendungen"},{location:" ",when:"2023",what:"📕 Angular (4. Auflage)",where:"dpunkt.verlag",info:"Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices. Inklusive RxJS, NgRx und a11y."},{location:"Berlin",when:"2024",what:"💎 DevOps Engineer mit Spezialisierung in Frontend Architektur and Barrierefreiheit",where:"DB Systel GmbH",info:"Experte für Webtechnologien und barrierefreie Webanwendungen."},{location:" ",when:"2026",what:"📘 Angular: Das Praxisbuch (1. Auflage)",where:"dpunkt.verlag",info:"Von den Grundlagen bis zur professionellen Entwicklung mit Signals."}].reverse()}};P.ɵfac=function(e){return new(e||P)},P.ɵcmp=b({type:P,selectors:[["dk-personal-timeline"]],decls:3,vars:0,consts:[[1,"timeline"],[1,"container","hidden","list-item",3,"ngClass"],[1,"content"],[1,"timeline-heading-header"],[1,"timeline-heading-info","time"],[1,"timeline-heading-info","location"],[1,"timeline-heading"],[1,"timeline-heading-info"]],template:function(e,d){e&1&&(c(0,"ol",0),ze(1,yt,13,6,"li",1,De),s()),e&2&&(g(),Re(d.steps))},dependencies:[Le],styles:[`

.timeline[_ngcontent-%COMP%] {
  position: relative;
  margin: 0 auto;
  padding: 0;
}



.timeline[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: rgb(156.2926829268, 155.4268292683, 140.7073170732);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}



.timeline-heading-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.timeline-heading-info[_ngcontent-%COMP%] {
  font-size: 0.9em;
  text-transform: none;
  font-weight: bold;
  line-height: 1.1;
}

.timeline-heading-info.time[_ngcontent-%COMP%] {
  font-size: 1.3em;
}

.timeline-heading[_ngcontent-%COMP%] {
  font-size: 1.1em;
  text-transform: none;
  padding-top: 0.7em;
}



.container[_ngcontent-%COMP%] {
  padding: 10px;
  position: relative;
  background-color: inherit;
  width: 50%;
  max-height: 200px;
  list-style: none;
}



.container[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  width: 29px;
  height: 29px;
  right: -14px;
  background-color: white;
  border: 4px solid #848372;
  top: 25px;
  border-radius: 50%;
  z-index: 1;
}



.left[_ngcontent-%COMP%] {
  left: 0;
}



.right[_ngcontent-%COMP%] {
  left: 50%;
}



.left[_ngcontent-%COMP%]::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
}



.right[_ngcontent-%COMP%]::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
}



.right[_ngcontent-%COMP%]::after {
  left: -14px;
}



.content[_ngcontent-%COMP%] {
  padding: 0.8em 1em;
  position: relative;
  border-radius: 6px;
}



@media screen and (max-width: 800px) {
  

  .timeline[_ngcontent-%COMP%]::after {
    left: 20px;
  }
  .content[_ngcontent-%COMP%] {
    padding-right: 0px;
  }
  

  .container[_ngcontent-%COMP%] {
    width: 100%;
    padding-left: 30px;
    padding-right: 0px;
    max-height: unset;
  }
  

  .left[_ngcontent-%COMP%]::after, 
   .right[_ngcontent-%COMP%]::after {
    left: 6px;
  }
  

  .right[_ngcontent-%COMP%] {
    left: 0%;
  }
}`]});let U=P;const _t=["videoBox"],bt=()=>[F],wt=()=>["fab","spotify"],Pt=()=>["fab","apple"],kt=()=>["fab","deezer"];function vt(t,n){if(t&1&&h(0,"youtube-player",22),t&2){const e=R(2);_("width",e.youtubePlayerWidth)}}function Ct(t,n){t&1&&h(0,"div")}function At(t,n){t&1&&(c(0,"div",18,0),ae(2,vt,1,1)(3,Ct,1,0),oe(4,2,bt,null,3),se(0,-1),s())}function St(t,n){t&1&&h(0,"img",23)}function xt(t,n){t&1&&h(0,"div")}const k=class k{constructor(){this.cdref=m(ee),this.platformId=m(W),this.videoBox=Fe("videoBox"),this.youtubePlayerWidth=300,this.isBrowser=!1,this.faLib=m(Ue),this.isBrowser=G(this.platformId),this.faLib.addIcons(Ve,Ne,Qe)}onResize(){const n=this.videoBox();n?.nativeElement?.clientWidth&&(this.youtubePlayerWidth=n.nativeElement.clientWidth)}ngOnInit(){if(this.isBrowser){const n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",document.body.appendChild(n)}}ngAfterViewChecked(){this.onResize(),this.cdref.detectChanges()}};k.ɵfac=function(e){return new(e||k)},k.ɵcmp=b({type:k,selectors:[["dk-about"]],viewQuery:function(e,d){e&1&&Ye(d.videoBox,_t,5),e&2&&je()},hostBindings:function(e,d){e&1&&re("resize",function(){return d.onResize()},qe)},decls:60,vars:7,consts:[["videoBox",""],["id","about",1,"wrapper","style2"],[1,"inner"],[1,"major"],["id","about-k9n",1,"about"],[1,"interviews"],[1,"text-img"],["href","https://techstories.dbsystel.de/blog/profiles/Maximilian-Franzke.html","target","_blank"],["href","https://www.linkedin.com/in/jan-g%C3%B6tze-178516a6/","target","_blank"],[1,"button-group"],["href","https://open.spotify.com/episode/4n6qXpYtCZ9UQACbUPNMpG?si=fIldVBQhR_e8Vw4iStiBSw",1,"button","small"],[3,"icon"],["href","https://podcasts.apple.com/de/podcast/digitale-barrierefreiheit-danny-koppenhagen-und-maximilian/id1462447493?i=1000642092259",1,"button","small"],["href","https://deezer.page.link/MZaQ2c5YqQ28vcdn6",1,"button","small"],["src","images/it_at_db_podcast_a11y.jpeg","width","300","height","300","alt",'Ein lebendiger oranger Hintergrund bildet die Kulisse für kreative Würfel, die in geschickter Anordnung die Worte "Accessible" und "Possible" formen. Die Würfel sind tastbar, mit klaren Strukturen, um die Botschaft haptisch erfahrbar zu machen. Das Bild verweist auf Folge Nummer 73 der Podcastfolge von IT@DB zum Thema "Digitale Barrierefreiheit"'],[1,"grid-container"],[1,"grid-description-1"],[1,"grid-description-2"],[1,"grid-details-1","video-box"],[1,"grid-details-2"],["href","https://www.agiledrop.com/blog/interview-danny-koppenhagen-vuejs-angular-buch-scully-and-web-components",1,"button","small"],[1,"features"],["videoId","O3bYfZ8tcLc",3,"width"],["src","https://www.agiledrop.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F229922%2F400x500%2F5f11469228%2Frc-angular-interview-3.png&w=2048&q=80","alt","Ein roter Hintergrund mit einem großen Angular-Logo und dem Foto von Danny Koppenhagen auf der rechten Seite"]],template:function(e,d){e&1&&(c(0,"section",1)(1,"div",2)(2,"h2",3),l(3,"Über mich"),s(),c(4,"p"),l(5," Ich bin Danny Koppenhagen: Frontend Entwickler und -Architekt. Ich entwickle seit vielen Jahren nutzerzentrierte Enterprise Webanwendung und bevorzuge die Arbeit im DevOps-Produktionsmodell. Als technologische Basis setze ich auf moderne SPA-Frameworks wie Angular und Vue mit TypeScript. Weiterhin bin ich als Berater im Bereich der Webentwicklung tätig und Maintainer einiger Open Source Projekte. "),s(),c(6,"section",4)(7,"h3",3),l(8,"k9n.dev?"),s(),c(9,"p"),l(10," Warum k9n.dev? Hierbei handelt es sich um ein Numeronym, bei dem die Zahl zwischen den beiden Buchstaben für die Anzahl der ausgelassenen Buchstaben in meinem Nachnamen steht (Vgl.: a11y, i18n, l10n, ...). "),s()(),c(11,"h3",3),l(12,"Interviews"),s(),c(13,"section",5)(14,"article",6)(15,"div")(16,"h4"),l(17," IT@DB Podcast Folge #73 vom 18.01.2024: Digitale Barrierefreiheit "),s(),c(18,"p"),l(19," Zusammen mit meinem Kollegen "),c(20,"a",7),l(21,"Maximilian Franzke"),s(),l(22," von der DB Systel, war ich zu Gast beim IT@DB Podcast von "),c(23,"a",8),l(24,"Jan Götze"),s(),l(25,". Hier haben wir darüber gesprochen, warum es in unserer zunehmend digitalisierten Welt von entscheidender Bedeutung ist, dass wir die Prinzipien der digitalen Barrierefreiheit fest in unserer Gestaltung und Entwicklung von digitalen Produkten verankern. Barrierefreiheit geht weit über bloße Compliance hinaus – es ist die Grundlage für eine inklusive und gerechte Online-Erfahrung! Digitale Barrierefreiheit ermöglicht es Menschen mit unterschiedlichen Fähigkeiten, unabhängig von physischen oder kognitiven Einschränkungen, die gleichen Chancen im digitalen Raum zu nutzen. "),s(),c(26,"div",9)(27,"a",10),h(28,"fa-icon",11),l(29," Spotify "),s(),c(30,"a",12),h(31,"fa-icon",11),l(32," Apple Podcasts "),s(),c(33,"a",13),h(34,"fa-icon",11),l(35," Deezer "),s()()(),h(36,"img",14),s(),c(37,"div",15)(38,"article",16)(39,"h4"),l(40,"#000000 c0ffee Tech-Talk der DB Systel"),s(),c(41,"p"),l(42,' Im Mai war ich zu Gast beim #000000 c0ffee Tech-Talk der DB Systel, der Auf Grund der weltweiten Corona Pandemie remote stattfand.\\r\\n Im Interview spreche ich über meine Erfahrungen mit Vue.js und Angular und gehe darauf ein, welches Framework sich für welche Anwendungszwecke eignet. Außerdem erläutere ich, wie der aktuelle Stand der Technik für Progressive Webapps (PWA) ist. Im letzten Teil sprechen wir über die Anbindung von APIs und über das Architekturmuster "Backend For Frontends" (BFF). '),s()(),c(43,"article",17)(44,"h4"),l(45,"Interview mit Agiledrop"),s(),c(46,"p"),l(47,' Im Interview mit Agiledrop spreche ich über meinen Weg zur Webentwicklung und wie ich dazu kam Co-Autor des deutschsprachigen Angular Buchs zu sein. Weiterhin berichte ich von meinen praktischen Erfahrungen mit Angular und Vue.js und in welchem Fall ich auf Angular oder Vue.js setzen würde. Zum Abschluss gehe ich auf den Static-Site-Generator \\"Scully\\" und Webcomponents sowie auf meine Erwartungen an die zukünftige Entwicklung im Bereich Webtechnologien ein. '),s()(),te(48,At,6,0,"div",18),c(49,"div",19),ae(50,St,1,0)(51,xt,1,0),oe(52,50,null,null,51),se(0,-1),c(54,"a",20),l(55,"Zum kompletten Interview"),s()()()(),c(56,"h3",3),l(57,"Mein Werdegang"),s(),c(58,"section",21),h(59,"dk-personal-timeline"),s()()()),e&2&&(g(28),_("icon",M(4,wt)),g(3),_("icon",M(5,Pt)),g(3),_("icon",M(6,kt)),g(14),ne(d.isBrowser?48:-1))},dependencies:[ft,U,We,Ge],styles:[`p[_ngcontent-%COMP%] {
  white-space: pre-wrap;
}

.about[_ngcontent-%COMP%], 
.interviews[_ngcontent-%COMP%] {
  padding-bottom: 30px;
}
.about[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%], 
.interviews[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%] {
  display: flex;
  gap: 1rem;
}

.text-img[_ngcontent-%COMP%] {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}
.text-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  max-width: 300px;
  height: fit-content;
}



.grid-container[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 30px 1.75em;
  grid-auto-flow: row;
  grid-template-areas: "grid-description-1 grid-description-2" "grid-details-1 grid-details-2";
  margin-bottom: 1.2em;
}

.grid-description-1[_ngcontent-%COMP%] {
  grid-area: grid-description-1;
}

.grid-details-1[_ngcontent-%COMP%] {
  grid-area: grid-details-1;
}

.grid-description-2[_ngcontent-%COMP%] {
  grid-area: grid-description-2;
}

.grid-details-2[_ngcontent-%COMP%] {
  grid-area: grid-details-2;
}

@media screen and (max-width: 800px) {
  .grid-container[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas: "grid-description-1" "grid-details-1" "grid-description-2" "grid-details-2";
  }
}


@media screen and (max-width: 800px) {
  .button.small[_ngcontent-%COMP%] {
    padding: 0px 10px;
  }
}
@media screen and (max-width: 736px) {
  .text-img[_ngcontent-%COMP%] {
    flex-wrap: wrap;
  }
}`],changeDetection:0});let V=k;const v=class v{};v.ɵfac=function(e){return new(e||v)},v.ɵcmp=b({type:v,selectors:[["dk-meetups"]],decls:11,vars:0,consts:[[1,"wrapper","alt","spotlight"],[1,"inner"],["href","https://www.meetup.com/de-DE/Angular-Meetup-Berlin",1,"image"],["src","images/Angular-Berlin_Icon.png","alt","Angular Berlin Logo"],[1,"content"],[1,"major"],["href","https://www.meetup.com/de-DE/Angular-Meetup-Berlin",1,"special"]],template:function(e,d){e&1&&(f(0,"section",0)(1,"div",1)(2,"a",2),Y(3,"img",3),y(),f(4,"div",4)(5,"h2",5),l(6,"Angular Berlin Meetup"),y(),f(7,"p"),l(8," Ich bin Co-Organisator des Angular Meetup in Berlin. Dieses findet ca. alle 4-6 Wochen an wechselnden Standorten statt. Neben zwei Talks am Abend steht der Austausch und die Vernetzung mit anderen Entwickler:innen im Vordergrund. "),y(),f(9,"a",6),l(10,"Meetup.com: Angular Berlin"),y()()()())},styles:[`.image[_ngcontent-%COMP%], 
.image[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%], 
.wrapper.spotlight[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  border-radius: 0%;
  max-width: 200px;
}

.wrapper.spotlight[_ngcontent-%COMP%]:nth-child(2n-1)   .inner[_ngcontent-%COMP%] {
  text-align: left;
}`]});let N=v;const C=class C{};C.ɵfac=function(e){return new(e||C)},C.ɵcmp=b({type:C,selectors:[["dk-publications"]],decls:12,vars:0,consts:[["id","wrapper"],["id","one",1,"wrapper","spotlight","style1"],[1,"inner"],["href","https://angular-buch.com","aria-label","Zur Buchwebsite (angular-buch.com)",1,"image"],["src","images/book-cover-v1m.png","alt","Buchcover: angular-buch.com"],[1,"content"],[1,"major"],["href","https://angular-buch.com",1,"special"]],template:function(e,d){e&1&&(f(0,"section",0)(1,"section",1)(2,"div",2)(3,"a",3),Y(4,"img",4),y(),f(5,"div",5)(6,"h2",6),l(7," Angular: Das Praxisbuch – von den Grundlagen bis zur professionellen Entwicklung mit Signals – ab Angular 22 "),y(),f(8,"p"),l(9," In diesem Praxiseinstieg lernst du Angular inklusive der modernen APIs und Konzepte kennen. Mit einem durchgängigen Beispielprojekt führen die Autoren dich durch die Welt von Angular. Du entwickelst und testest Schritt für Schritt eine professionelle, modulare und barrierefreie Single-Page-Anwendung und lernst Angular im praktischen Einsatz kennen. Auf jeden Umsetzungsschritt folgen außerdem umfangreiche Unit- und Integrationstests. Ausführliche Theorieteile runden das Buch ab und machen es zu deinem praktischen Begleiter im Entwicklungsalltag. "),y(),f(10,"a",7),l(11,"angular-buch.com"),y()()()()())},styles:[`.image[_ngcontent-%COMP%], 
.image[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%], 
.wrapper.spotlight[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  border-radius: 0%;
}

.wrapper.spotlight[_ngcontent-%COMP%]:before {
  background-color: #3d4051;
}`]});let Q=C;const A=class A{constructor(){this.platformId=m(W),this.isBrowser=!1,this.blogPosts=O(n=>n.filename.includes("/src/content/blog/")),this.projectPosts=O(n=>n.filename.includes("/src/content/projects/")),this.talkPosts=O(n=>n.filename.includes("/src/content/talks/")),this.isBrowser=G(this.platformId)}};A.ɵfac=function(e){return new(e||A)},A.ɵcmp=b({type:A,selectors:[["ng-component"]],decls:18,vars:6,consts:[[1,"wrapper","alt","style1","m0"],[1,"inner"],[1,"major"],["content","blog",3,"posts","max"],[1,"wrapper","style3"],["content","talks",3,"posts","max"],[1,"wrapper","alt","style1"],["content","projects",3,"posts","max"]],template:function(e,d){e&1&&(c(0,"section",0)(1,"div",1)(2,"h2",2),l(3,"Aktuelle Blog Posts"),s(),h(4,"dk-preview",3),s()(),c(5,"section",4)(6,"div",1)(7,"h2",2),l(8,"Meine Talks & Slides"),s(),h(9,"dk-preview",5),s()(),h(10,"dk-publications"),c(11,"section",6)(12,"div",1)(13,"h2",2),l(14,"Meine Projekte"),s(),h(15,"dk-preview",7),s()(),h(16,"dk-about")(17,"dk-meetups")),e&2&&(g(4),_("posts",d.blogPosts)("max",4),g(5),_("posts",d.talkPosts)("max",4),g(6),_("posts",d.projectPosts)("max",4))},dependencies:[He,Q,V,N],styles:[`.m0[_ngcontent-%COMP%] {
      margin: 0;
    }`]});let J=A;export{J as default};
