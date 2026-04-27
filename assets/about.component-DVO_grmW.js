var ee=Object.defineProperty;var te=(e,i,t)=>i in e?ee(e,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[i]=t;var a=(e,i,t)=>te(e,typeof i!="symbol"?i+"":i,t);import{$ as G,a0 as ne,aj as ie,ak as ae,i as _,al as re,am as oe,an as Y,ao as se,ap as le,aq as de,ar as ce,P as q,as as ue,f as j,at as he,au as pe,av as ge,ɵ as C,z as _e,aw as P,ax as E,v as B,h as s,k as g,j as l,w as L,p as h,ay as H,az as fe,aA as ye,aB as me,ac as be,ad as Z,af as we,r as z,ag as Pe,q as b,a as F,aC as ve,d as ke,c as Ce,M as Se,aD as Ae,aE as xe,B as Ie,N as Te,C as Ee,b as c,x as M,L as A,a3 as Be,F as Le,aF as ze,aG as Re,aH as De,u as Fe,a9 as Me,ae as x,aI as Oe,aa as Ue,ab as Ve,l as $,m as K,o as J}from"./index-CqhgQhz3.js";function Ne(e,i,t){return new G(function(d){var n=function(){for(var o=[],u=0;u<arguments.length;u++)o[u]=arguments[u];return d.next(o.length===1?o[0]:o)},r=e(n);return ne(i)?function(){return i(n,r)}:void 0})}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qe={};/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function v(e){return Object.isFrozen(e)&&Object.isFrozen(e.raw)}function k(e){return e.toString().indexOf("`")===-1}k(e=>e``)||k(e=>e`\0`)||k(e=>e`\n`)||k(e=>e`\u0000`);v``&&v`\0`&&v`\n`&&v`\u0000`;/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const We="google#safe";let Ge=We;const Ye=globalThis.trustedTypes;let O=Ye,I;function qe(){let e=null;if(!O)return e;try{const i=t=>t;e=O.createPolicy(Ge,{createHTML:i,createScript:i,createScriptURL:i})}catch{}return e}function je(){return I===void 0&&(I=qe()),I}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class X{constructor(i,t){this.privateDoNotAccessOrElseWrappedResourceUrl=t}toString(){return this.privateDoNotAccessOrElseWrappedResourceUrl+""}}const He=X;function Ze(e){return new He(Qe,e)}function U(e){const i=e,t=je();return Ze(t?t.createScriptURL(i):i)}function $e(e){return e instanceof X}function Ke(e){if($e(e))return e.privateDoNotAccessOrElseWrappedResourceUrl;{let i="";throw new Error(i)}}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Je(e,...i){if(i.length===0)return U(e[0]);e[0].toLowerCase();let t=e[0];for(let d=0;d<i.length;d++)t+=encodeURIComponent(i[d])+e[d+1];return U(t)}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Xe(e){return et("script",e)}function et(e,i=document){var t;const d=(t=i.querySelector)===null||t===void 0?void 0:t.call(i,`${e}[nonce]`);return d==null?"":d.nonce||d.getAttribute("nonce")||""}/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function tt(e){const i=Xe(e.ownerDocument);i&&e.setAttribute("nonce",i)}function nt(e,i,t){e.src=Ke(i),tt(e)}const it=["youtubeContainer"];function at(e,i){if(e&1){const t=be();s(0,"youtube-player-placeholder",2),Z("click",function(){we(t);const n=z();return Pe(n._load(!0))}),l()}if(e&2){const t=z();b("videoId",t.videoId)("width",t.width)("height",t.height)("isLoading",t._isLoading)("buttonLabel",t.placeholderButtonLabel)("quality",t.placeholderImageQuality)}}let rt=(()=>{const t=class t{constructor(){a(this,"videoId");a(this,"width");a(this,"height");a(this,"isLoading");a(this,"buttonLabel");a(this,"quality")}_getBackgroundImage(){let n;return this.quality==="low"?n=`https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`:this.quality==="high"?n=`https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`:n=`https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,`url(${n})`}};a(t,"ɵfac",function(r){return new(r||t)}),a(t,"ɵcmp",C({type:t,selectors:[["youtube-player-placeholder"]],hostAttrs:[1,"youtube-player-placeholder"],hostVars:8,hostBindings:function(r,o){r&2&&(H("background-image",o._getBackgroundImage())("width",o.width,"px")("height",o.height,"px"),Ae("youtube-player-placeholder-loading",o.isLoading))},inputs:{videoId:"videoId",width:"width",height:"height",isLoading:"isLoading",buttonLabel:"buttonLabel",quality:"quality"},decls:4,vars:1,consts:[["type","button",1,"youtube-player-placeholder-button"],["height","100%","version","1.1","viewBox","0 0 68 48","focusable","false","aria-hidden","true"],["d","M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z","fill","#f00"],["d","M 45,24 27,14 27,34","fill","#fff"]],template:function(r,o){r&1&&(F(0,"button",0),ve(),F(1,"svg",1),ke(2,"path",2)(3,"path",3),Ce()()),r&2&&Se("aria-label",o.buttonLabel)},styles:[`.youtube-player-placeholder{display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden;cursor:pointer;background-color:#000;background-position:center center;background-size:cover;transition:box-shadow 300ms ease;box-shadow:inset 0 120px 90px -90px rgba(0,0,0,.8)}:fullscreen .youtube-player-placeholder{min-width:100vw;min-height:100vh}.youtube-player-placeholder-button{transition:opacity 300ms ease;-moz-appearance:none;-webkit-appearance:none;background:none;border:none;padding:0;display:flex}.youtube-player-placeholder-button svg{width:68px;height:48px}.youtube-player-placeholder-loading{box-shadow:none}.youtube-player-placeholder-loading .youtube-player-placeholder-button{opacity:0}
`],encapsulation:2,changeDetection:0}));let i=t;return i})();const ot=new ue("YOUTUBE_PLAYER_CONFIG"),V=640,N=390;function Q(e){return e==null?e:E(e,0)}var p=(function(e){return e[e.UNSTARTED=-1]="UNSTARTED",e[e.ENDED=0]="ENDED",e[e.PLAYING=1]="PLAYING",e[e.PAUSED=2]="PAUSED",e[e.BUFFERING=3]="BUFFERING",e[e.CUED=5]="CUED",e})(p||{});let R=(()=>{const t=class t{constructor(){a(this,"_ngZone",_(re));a(this,"_nonce",_(oe,{optional:!0}));a(this,"_changeDetectorRef",_(Y));a(this,"_elementRef",_(se));a(this,"_player");a(this,"_pendingPlayer");a(this,"_existingApiReadyCallback");a(this,"_pendingPlayerState");a(this,"_destroyed",new le);a(this,"_playerChanges",new de(void 0));a(this,"_isLoading",!1);a(this,"_hasPlaceholder",!0);a(this,"_isBrowser");a(this,"videoId");a(this,"_height",N);a(this,"_width",V);a(this,"startSeconds");a(this,"endSeconds");a(this,"suggestedQuality");a(this,"playerVars");a(this,"disableCookies",!1);a(this,"loadApi");a(this,"disablePlaceholder",!1);a(this,"showBeforeIframeApiLoads",!1);a(this,"placeholderButtonLabel");a(this,"placeholderImageQuality");a(this,"ready",new ce);a(this,"stateChange",this._getLazyEmitter("onStateChange"));a(this,"error",this._getLazyEmitter("onError"));a(this,"apiChange",this._getLazyEmitter("onApiChange"));a(this,"playbackQualityChange",this._getLazyEmitter("onPlaybackQualityChange"));a(this,"playbackRateChange",this._getLazyEmitter("onPlaybackRateChange"));a(this,"youtubeContainer");const n=_(q),r=_(ot,{optional:!0});this.loadApi=r?.loadApi??!0,this.disablePlaceholder=!!r?.disablePlaceholder,this.placeholderButtonLabel=r?.placeholderButtonLabel||"Play video",this.placeholderImageQuality=r?.placeholderImageQuality||"standard",this._isBrowser=j(n)}get height(){return this._height}set height(n){this._height=n==null||isNaN(n)?N:n}get width(){return this._width}set width(n){this._width=n==null||isNaN(n)?V:n}ngAfterViewInit(){this._conditionallyLoad()}ngOnChanges(n){this._shouldRecreatePlayer(n)?this._conditionallyLoad():this._player&&((n.width||n.height)&&this._setSize(),n.suggestedQuality&&this._setQuality(),(n.startSeconds||n.endSeconds||n.suggestedQuality)&&this._cuePlayer())}ngOnDestroy(){this._pendingPlayer?.destroy(),this._player&&(this._player.destroy(),window.onYouTubeIframeAPIReady=this._existingApiReadyCallback),this._playerChanges.complete(),this._destroyed.next(),this._destroyed.complete()}playVideo(){this._player?this._player.playVideo():(this._getPendingState().playbackState=p.PLAYING,this._load(!0))}pauseVideo(){this._player?this._player.pauseVideo():this._getPendingState().playbackState=p.PAUSED}stopVideo(){this._player?this._player.stopVideo():this._getPendingState().playbackState=p.CUED}seekTo(n,r){this._player?this._player.seekTo(n,r):this._getPendingState().seek={seconds:n,allowSeekAhead:r}}mute(){this._player?this._player.mute():this._getPendingState().muted=!0}unMute(){this._player?this._player.unMute():this._getPendingState().muted=!1}isMuted(){return this._player?this._player.isMuted():this._pendingPlayerState?!!this._pendingPlayerState.muted:!1}setVolume(n){this._player?this._player.setVolume(n):this._getPendingState().volume=n}getVolume(){return this._player?this._player.getVolume():this._pendingPlayerState&&this._pendingPlayerState.volume!=null?this._pendingPlayerState.volume:0}setPlaybackRate(n){if(this._player)return this._player.setPlaybackRate(n);this._getPendingState().playbackRate=n}getPlaybackRate(){return this._player?this._player.getPlaybackRate():this._pendingPlayerState&&this._pendingPlayerState.playbackRate!=null?this._pendingPlayerState.playbackRate:0}getAvailablePlaybackRates(){return this._player?this._player.getAvailablePlaybackRates():[]}getVideoLoadedFraction(){return this._player?this._player.getVideoLoadedFraction():0}getPlayerState(){if(!(!this._isBrowser||!window.YT))return this._player?this._player.getPlayerState():this._pendingPlayerState&&this._pendingPlayerState.playbackState!=null?this._pendingPlayerState.playbackState:p.UNSTARTED}getCurrentTime(){return this._player?this._player.getCurrentTime():this._pendingPlayerState&&this._pendingPlayerState.seek?this._pendingPlayerState.seek.seconds:0}getPlaybackQuality(){return this._player?this._player.getPlaybackQuality():"default"}getAvailableQualityLevels(){return this._player?this._player.getAvailableQualityLevels():[]}getDuration(){return this._player?this._player.getDuration():0}getVideoUrl(){return this._player?this._player.getVideoUrl():""}getVideoEmbedCode(){return this._player?this._player.getVideoEmbedCode():""}async requestFullscreen(n){const r=this._elementRef.nativeElement;return r.requestFullscreen?r.requestFullscreen(n):Promise.reject(new Error("Fullscreen API not supported by browser."))}_load(n){this._isBrowser&&(!window.YT||!window.YT.Player?(this.loadApi?(this._isLoading=!0,st(this._nonce)):this.showBeforeIframeApiLoads,this._existingApiReadyCallback=window.onYouTubeIframeAPIReady,window.onYouTubeIframeAPIReady=()=>{this._existingApiReadyCallback?.(),this._ngZone.run(()=>this._createPlayer(n))}):this._createPlayer(n))}_conditionallyLoad(){this._shouldShowPlaceholder()?this.playerVars?.autoplay===1&&this._load(!0):this._load(!1)}_shouldShowPlaceholder(){return this.disablePlaceholder?!1:this._isBrowser?this._hasPlaceholder&&!!this.videoId&&!this._player:!0}_getPendingState(){return this._pendingPlayerState||(this._pendingPlayerState={}),this._pendingPlayerState}_shouldRecreatePlayer(n){const r=n.videoId||n.playerVars||n.disableCookies||n.disablePlaceholder;return!!r&&!r.isFirstChange()}_createPlayer(n){if(this._player?.destroy(),this._pendingPlayer?.destroy(),typeof YT>"u"||!this.videoId&&!this.playerVars?.list)return;const r={host:this.disableCookies?"https://www.youtube-nocookie.com":void 0,width:this.width,height:this.height,playerVars:n?{...this.playerVars||{},autoplay:1}:this.playerVars};this.videoId&&(r.videoId=this.videoId);const o=this._ngZone.runOutsideAngular(()=>new YT.Player(this.youtubeContainer.nativeElement,r)),u=w=>{this._ngZone.run(()=>{this._isLoading=!1,this._hasPlaceholder=!1,this._player=o,this._pendingPlayer=void 0,o.removeEventListener("onReady",u),this._playerChanges.next(o),this.ready.emit(w),this._setSize(),this._setQuality(),this._pendingPlayerState&&(this._applyPendingPlayerState(o,this._pendingPlayerState),this._pendingPlayerState=void 0);const f=o.getPlayerState();f===p.UNSTARTED||f===p.CUED||f==null?this._cuePlayer():n&&this.startSeconds&&this.startSeconds>0&&o.seekTo(this.startSeconds,!0),this._changeDetectorRef.markForCheck()})};this._pendingPlayer=o,o.addEventListener("onReady",u)}_applyPendingPlayerState(n,r){const{playbackState:o,playbackRate:u,volume:w,muted:f,seek:S}=r;switch(o){case p.PLAYING:n.playVideo();break;case p.PAUSED:n.pauseVideo();break;case p.CUED:n.stopVideo();break}u!=null&&n.setPlaybackRate(u),w!=null&&n.setVolume(w),f!=null&&(f?n.mute():n.unMute()),S!=null&&n.seekTo(S.seconds,S.allowSeekAhead)}_cuePlayer(){this._player&&this.videoId&&this._player.cueVideoById({videoId:this.videoId,startSeconds:this.startSeconds,endSeconds:this.endSeconds,suggestedQuality:this.suggestedQuality})}_setSize(){this._player?.setSize(this.width,this.height)}_setQuality(){this._player&&this.suggestedQuality&&this._player.setPlaybackQuality(this.suggestedQuality)}_getLazyEmitter(n){return this._playerChanges.pipe(he(r=>r?Ne(o=>{r.addEventListener(n,o)},o=>{try{r?.removeEventListener?.(n,o)}catch{}}):pe()),r=>new G(o=>r.subscribe({next:u=>this._ngZone.run(()=>o.next(u)),error:u=>o.error(u),complete:()=>o.complete()})),ge(this._destroyed))}};a(t,"ɵfac",function(r){return new(r||t)}),a(t,"ɵcmp",C({type:t,selectors:[["youtube-player"]],viewQuery:function(r,o){if(r&1&&fe(it,7),r&2){let u;ye(u=me())&&(o.youtubeContainer=u.first)}},inputs:{videoId:"videoId",height:[2,"height","height",E],width:[2,"width","width",E],startSeconds:[2,"startSeconds","startSeconds",Q],endSeconds:[2,"endSeconds","endSeconds",Q],suggestedQuality:"suggestedQuality",playerVars:"playerVars",disableCookies:[2,"disableCookies","disableCookies",P],loadApi:[2,"loadApi","loadApi",P],disablePlaceholder:[2,"disablePlaceholder","disablePlaceholder",P],showBeforeIframeApiLoads:[2,"showBeforeIframeApiLoads","showBeforeIframeApiLoads",P],placeholderButtonLabel:"placeholderButtonLabel",placeholderImageQuality:"placeholderImageQuality"},outputs:{ready:"ready",stateChange:"stateChange",error:"error",apiChange:"apiChange",playbackQualityChange:"playbackQualityChange",playbackRateChange:"playbackRateChange"},features:[_e],decls:4,vars:3,consts:[["youtubeContainer",""],[3,"videoId","width","height","isLoading","buttonLabel","quality"],[3,"click","videoId","width","height","isLoading","buttonLabel","quality"]],template:function(r,o){r&1&&(B(0,at,1,6,"youtube-player-placeholder",1),s(1,"div"),g(2,"div",null,0),l()),r&2&&(L(o._shouldShowPlaceholder()?0:-1),h(),H("display",o._shouldShowPlaceholder()?"none":""))},dependencies:[rt],styles:[`youtube-player:fullscreen,youtube-player:fullscreen iframe{min-width:100vw;min-height:100vh}
`],encapsulation:2,changeDetection:0}));let i=t;return i})(),T=!1;function st(e){if(T)return;const i=Je`https://www.youtube.com/iframe_api`,t=document.createElement("script"),d=n=>{t.removeEventListener("load",d),t.removeEventListener("error",d),n.type==="error"&&(T=!1)};t.addEventListener("load",d),t.addEventListener("error",d),nt(t,i),t.async=!0,e&&t.setAttribute("nonce",e),T=!0,document.body.appendChild(t)}let lt=(()=>{const t=class t{};a(t,"ɵfac",function(r){return new(r||t)}),a(t,"ɵmod",ie({type:t,imports:[R],exports:[R]})),a(t,"ɵinj",ae({}));let i=t;return i})();function dt(e,i){if(e&1&&(s(0,"li",1)(1,"div",2)(2,"div",3)(3,"span",4),c(4),l(),s(5,"span",5),c(6),l()(),s(7,"h4",6),c(8),l(),s(9,"span",7),c(10),l(),s(11,"p"),c(12),l()()()),e&2){const t=i.$implicit,d=i.$index;b("ngClass",d%2!==0?"right":"left"),h(4),M(" ",t.when," "),h(2),A(t.location),h(2),M(" ",t.what," "),h(2),A(t.where),h(2),A(t.info)}}const y=class y{constructor(){this.steps=[{location:"Frankfurt (Oder)",when:"2012",what:`🧰 Facharbeiter
IT-Systemelektroniker`,where:"Deutschen Telekom AG",info:"Informatik, Telekommunikationstechnik sowie Elektrotechnik"},{location:"Cottbus",when:"2012",what:"☎️ Sachbearbeiter Technische Kundenberatung",where:"Deutsche Telekom Technischer Service GmbH (Customer Competence Center)",info:"Second Level Support für VoIP und WLAN Produkte."},{location:"Leipzig",when:"2015",what:`🎓 Bachelor Of Engineering
Kommunikations- Und Medieninformatik`,where:"Deutsche Telekom Hochschule für Telekommunikation",info:"Netzwerk- und Übertragungstechnik, Software Engineering, IT-Architektur, Protokollengineering sowie Web und Medien-Technologien."},{location:"Berlin",when:"2015",what:"🚨 Entwickler TETRA Support Und Umsetzung",where:"Deutsche Telekom Healthcare & Security Solutions GmbH",info:"Umsetzung von Client- und Serversystemen im Bereich des TETRA-BOS. Administration, Konfiguration, Integration und Test von IT-Systemen."},{location:" ",when:"2017",what:"📕 Angular (1. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript"},{location:"Berlin",when:"2019",what:`💎 Spezialist
Entwickler Und IT-Berater`,where:"DB Systel GmbH",info:"Entwicklung nutzerzentrierter Webanwendungen im Enterprise-Umfeld. Beratung zur Umsetzung von Web-Anwendungen und -Architekturen sowie User Experience (UX) Consulting."},{location:" ",when:"2019",what:"📕 Angular (2. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive NativeScript und NgRx"},{location:" ",when:"2020",what:"📕 Angular (3. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive RxJS, NgRx und PWA"},{location:"Berlin",when:"2022",what:"💎 Seniorberater & Frontend Architect",where:"DB Systel GmbH",info:"Entwicklung von Enterprise-Webanwendungen"},{location:" ",when:"2023",what:"📕 Angular (4. Auflage)",where:"dpunkt.verlag",info:"Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices. Inklusive RxJS, NgRx und a11y."},{location:"Berlin",when:"2024",what:"💎 DevOps Engineer mit Spezialisierung in Frontend Architektur and Barrierefreiheit",where:"DB Systel GmbH",info:"Experte für Webtechnologien und barrierefreie Webanwendungen."},{location:" ",when:"2026",what:"📘 Angular: Das Praxisbuch (1. Auflage)",where:"dpunkt.verlag",info:"Von den Grundlagen bis zur professionellen Entwicklung mit Signals."}].reverse()}};y.ɵfac=function(t){return new(t||y)},y.ɵcmp=C({type:y,selectors:[["dk-personal-timeline"]],decls:3,vars:0,consts:[[1,"timeline"],[1,"container","hidden","list-item",3,"ngClass"],[1,"content"],[1,"timeline-heading-header"],[1,"timeline-heading-info","time"],[1,"timeline-heading-info","location"],[1,"timeline-heading"],[1,"timeline-heading-info"]],template:function(t,d){t&1&&(s(0,"ol",0),Ie(1,dt,13,6,"li",1,Te),l()),t&2&&(h(),Ee(d.steps))},dependencies:[xe],styles:[`

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
}`]});let D=y;const ct=["videoBox"],ut=()=>[R],ht=()=>["fab","spotify"],pt=()=>["fab","apple"],gt=()=>["fab","deezer"];function _t(e,i){if(e&1&&g(0,"youtube-player",22),e&2){const t=z(2);b("width",t.youtubePlayerWidth)}}function ft(e,i){e&1&&g(0,"div")}function yt(e,i){e&1&&(s(0,"div",18,0),$(2,_t,1,1)(3,ft,1,0),K(4,2,ut,null,3),J(0,-1),l())}function mt(e,i){e&1&&g(0,"img",23)}function bt(e,i){e&1&&g(0,"div")}function wt(e,i){e&1&&($(0,mt,1,0)(1,bt,1,0),K(2,0,null,null,1),J(0,-1))}const m=class m{constructor(){this.cdref=_(Y),this.platformId=_(q),this.videoBox=Be("videoBox"),this.youtubePlayerWidth=300,this.isBrowser=!1,this.faLib=_(Le),this.isBrowser=j(this.platformId),this.faLib.addIcons(ze,Re,De)}onResize(){const i=this.videoBox();i?.nativeElement?.clientWidth&&(this.youtubePlayerWidth=i.nativeElement.clientWidth)}ngOnInit(){if(this.isBrowser){const i=document.createElement("script");i.src="https://www.youtube.com/iframe_api",document.body.appendChild(i)}}ngAfterViewChecked(){this.onResize(),this.cdref.detectChanges()}};m.ɵfac=function(t){return new(t||m)},m.ɵcmp=C({type:m,selectors:[["dk-about"]],viewQuery:function(t,d){t&1&&Ue(d.videoBox,ct,5),t&2&&Ve()},hostBindings:function(t,d){t&1&&Z("resize",function(){return d.onResize()},Oe)},decls:57,vars:8,consts:[["videoBox",""],["id","about",1,"wrapper","style2"],[1,"inner"],[1,"major"],["id","about-k9n",1,"about"],[1,"interviews"],[1,"text-img"],["href","https://techstories.dbsystel.de/blog/profiles/Maximilian-Franzke.html","target","_blank"],["href","https://www.linkedin.com/in/jan-g%C3%B6tze-178516a6/","target","_blank"],[1,"button-group"],["href","https://open.spotify.com/episode/4n6qXpYtCZ9UQACbUPNMpG?si=fIldVBQhR_e8Vw4iStiBSw",1,"button","small"],[3,"icon"],["href","https://podcasts.apple.com/de/podcast/digitale-barrierefreiheit-danny-koppenhagen-und-maximilian/id1462447493?i=1000642092259",1,"button","small"],["href","https://deezer.page.link/MZaQ2c5YqQ28vcdn6",1,"button","small"],["src","images/it_at_db_podcast_a11y.jpeg","width","300","height","300","alt",'Ein lebendiger oranger Hintergrund bildet die Kulisse für kreative Würfel, die in geschickter Anordnung die Worte "Accessible" und "Possible" formen. Die Würfel sind tastbar, mit klaren Strukturen, um die Botschaft haptisch erfahrbar zu machen. Das Bild verweist auf Folge Nummer 73 der Podcastfolge von IT@DB zum Thema "Digitale Barrierefreiheit"'],[1,"grid-container"],[1,"grid-description-1"],[1,"grid-description-2"],[1,"grid-details-1","video-box"],[1,"grid-details-2"],["href","https://www.agiledrop.com/blog/interview-danny-koppenhagen-vuejs-angular-buch-scully-and-web-components",1,"button","small"],[1,"features"],["videoId","O3bYfZ8tcLc",3,"width"],["src","https://www.agiledrop.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F229922%2F400x500%2F5f11469228%2Frc-angular-interview-3.png&w=2048&q=80","alt","Ein roter Hintergrund mit einem großen Angular-Logo und dem Foto von Danny Koppenhagen auf der rechten Seite"]],template:function(t,d){t&1&&(s(0,"section",1)(1,"div",2)(2,"h2",3),c(3,"Über mich"),l(),s(4,"p"),c(5," Ich bin Danny Koppenhagen: Frontend Entwickler und -Architekt. Ich entwickle seit vielen Jahren nutzerzentrierte Enterprise Webanwendung und bevorzuge die Arbeit im DevOps-Produktionsmodell. Als technologische Basis setze ich auf moderne SPA-Frameworks wie Angular und Vue mit TypeScript. Weiterhin bin ich als Berater im Bereich der Webentwicklung tätig und Maintainer einiger Open Source Projekte. "),l(),s(6,"section",4)(7,"h3",3),c(8,"k9n.dev?"),l(),s(9,"p"),c(10," Warum k9n.dev? Hierbei handelt es sich um ein Numeronym, bei dem die Zahl zwischen den beiden Buchstaben für die Anzahl der ausgelassenen Buchstaben in meinem Nachnamen steht (Vgl.: a11y, i18n, l10n, ...). "),l()(),s(11,"h3",3),c(12,"Interviews"),l(),s(13,"section",5)(14,"article",6)(15,"div")(16,"h4"),c(17," IT@DB Podcast Folge #73 vom 18.01.2024: Digitale Barrierefreiheit "),l(),s(18,"p"),c(19," Zusammen mit meinem Kollegen "),s(20,"a",7),c(21,"Maximilian Franzke"),l(),c(22," von der DB Systel, war ich zu Gast beim IT@DB Podcast von "),s(23,"a",8),c(24,"Jan Götze"),l(),c(25,". Hier haben wir darüber gesprochen, warum es in unserer zunehmend digitalisierten Welt von entscheidender Bedeutung ist, dass wir die Prinzipien der digitalen Barrierefreiheit fest in unserer Gestaltung und Entwicklung von digitalen Produkten verankern. Barrierefreiheit geht weit über bloße Compliance hinaus – es ist die Grundlage für eine inklusive und gerechte Online-Erfahrung! Digitale Barrierefreiheit ermöglicht es Menschen mit unterschiedlichen Fähigkeiten, unabhängig von physischen oder kognitiven Einschränkungen, die gleichen Chancen im digitalen Raum zu nutzen. "),l(),s(26,"div",9)(27,"a",10),g(28,"fa-icon",11),c(29," Spotify "),l(),s(30,"a",12),g(31,"fa-icon",11),c(32," Apple Podcasts "),l(),s(33,"a",13),g(34,"fa-icon",11),c(35," Deezer "),l()()(),g(36,"img",14),l(),s(37,"div",15)(38,"article",16)(39,"h4"),c(40,"#000000 c0ffee Tech-Talk der DB Systel"),l(),s(41,"p"),c(42,' Im Mai war ich zu Gast beim #000000 c0ffee Tech-Talk der DB Systel, der Auf Grund der weltweiten Corona Pandemie remote stattfand.\\r\\n Im Interview spreche ich über meine Erfahrungen mit Vue.js und Angular und gehe darauf ein, welches Framework sich für welche Anwendungszwecke eignet. Außerdem erläutere ich, wie der aktuelle Stand der Technik für Progressive Webapps (PWA) ist. Im letzten Teil sprechen wir über die Anbindung von APIs und über das Architekturmuster "Backend For Frontends" (BFF). '),l()(),s(43,"article",17)(44,"h4"),c(45,"Interview mit Agiledrop"),l(),s(46,"p"),c(47,' Im Interview mit Agiledrop spreche ich über meinen Weg zur Webentwicklung und wie ich dazu kam Co-Autor des deutschsprachigen Angular Buchs zu sein. Weiterhin berichte ich von meinen praktischen Erfahrungen mit Angular und Vue.js und in welchem Fall ich auf Angular oder Vue.js setzen würde. Zum Abschluss gehe ich auf den Static-Site-Generator \\"Scully\\" und Webcomponents sowie auf meine Erwartungen an die zukünftige Entwicklung im Bereich Webtechnologien ein. '),l()(),B(48,yt,6,0,"div",18),s(49,"div",19),B(50,wt,4,0),s(51,"a",20),c(52,"Zum kompletten Interview"),l()()()(),s(53,"h3",3),c(54,"Mein Werdegang"),l(),s(55,"section",21),g(56,"dk-personal-timeline"),l()()()),t&2&&(h(28),b("icon",x(5,ht)),h(3),b("icon",x(6,pt)),h(3),b("icon",x(7,gt)),h(14),L(d.isBrowser?48:-1),h(2),L(d.isBrowser?50:-1))},dependencies:[lt,D,Fe,Me],styles:[`p[_ngcontent-%COMP%] {
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
}`],changeDetection:0});let W=m;export{W as AboutComponent};
