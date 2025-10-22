var X=Object.defineProperty;var ee=(i,n,e)=>n in i?X(i,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[n]=e;var r=(i,n,e)=>ee(i,typeof n!="symbol"?n+"":n,e);import{O as j,i as te,f as ne,h as ie,j as m,N as ae,C as re,k as H,S as se,B as oe,E as le,P as R,l as V,s as de,o as ce,t as he,ɵ as _,m as ue,n as ge,p as pe,q as E,r as C,u as me,v as fe,w as A,a as o,e as h,d as s,x as q,y as g,z as Z,A as _e,D as $,F as ye,G as M,H as be,I as f,J as we,K as Pe,L as ke,M as ve,Q as Ce,R as Ae,T as xe,U as Se,b as l,V as N,W as S,X as Be,Y as Ie,Z as Te,$ as Ee,a0 as Me,a1 as Oe,a2 as Le,a3 as ze,a4 as K,a5 as J,a6 as B,a7 as De,a8 as Fe,a9 as I}from"./index-nZOzKHyg.js";import{P as Re}from"./preview.component-xdLAGqcp.js";function Ve(i,n,e){return new j(function(c){var t=function(){for(var d=[],u=0;u<arguments.length;u++)d[u]=arguments[u];return c.next(d.length===1?d[0]:d)},a=i(t);return te(n)?function(){return n(t,a)}:void 0})}const Qe=["youtubeContainer"];function Ne(i,n){if(i&1){const e=_e();o(0,"youtube-player-placeholder",2),$("click",function(){ye(e);const t=M();return be(t._load(!0))}),s()}if(i&2){const e=M();f("videoId",e.videoId)("width",e.width)("height",e.height)("isLoading",e._isLoading)("buttonLabel",e.placeholderButtonLabel)("quality",e.placeholderImageQuality)}}let Ue=(()=>{const e=class e{constructor(){r(this,"videoId");r(this,"width");r(this,"height");r(this,"isLoading");r(this,"buttonLabel");r(this,"quality")}_getBackgroundImage(){let t;return this.quality==="low"?t=`https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`:this.quality==="high"?t=`https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`:t=`https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,`url(${t})`}};r(e,"ɵfac",function(a){return new(a||e)}),r(e,"ɵcmp",_({type:e,selectors:[["youtube-player-placeholder"]],hostAttrs:[1,"youtube-player-placeholder"],hostVars:8,hostBindings:function(a,d){a&2&&(Z("background-image",d._getBackgroundImage())("width",d.width,"px")("height",d.height,"px"),Pe("youtube-player-placeholder-loading",d.isLoading))},inputs:{videoId:"videoId",width:"width",height:"height",isLoading:"isLoading",buttonLabel:"buttonLabel",quality:"quality"},decls:4,vars:1,consts:[["type","button",1,"youtube-player-placeholder-button"],["height","100%","version","1.1","viewBox","0 0 68 48","focusable","false","aria-hidden","true"],["d","M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z","fill","#f00"],["d","M 45,24 27,14 27,34","fill","#fff"]],template:function(a,d){a&1&&(o(0,"button",0),ke(),o(1,"svg",1),h(2,"path",2)(3,"path",3),s()()),a&2&&ve("aria-label",d.buttonLabel)},styles:[".youtube-player-placeholder{display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden;cursor:pointer;background-color:#000;background-position:center center;background-size:cover;transition:box-shadow 300ms ease;box-shadow:inset 0 120px 90px -90px rgba(0,0,0,.8)}.youtube-player-placeholder-button{transition:opacity 300ms ease;-moz-appearance:none;-webkit-appearance:none;background:none;border:none;padding:0;display:flex}.youtube-player-placeholder-button svg{width:68px;height:48px}.youtube-player-placeholder-loading{box-shadow:none}.youtube-player-placeholder-loading .youtube-player-placeholder-button{opacity:0}"],encapsulation:2,changeDetection:0}));let n=e;return n})();const We=new we("YOUTUBE_PLAYER_CONFIG"),U=640,W=390;function Y(i){return i==null?i:E(i,0)}var p=function(i){return i[i.UNSTARTED=-1]="UNSTARTED",i[i.ENDED=0]="ENDED",i[i.PLAYING=1]="PLAYING",i[i.PAUSED=2]="PAUSED",i[i.BUFFERING=3]="BUFFERING",i[i.CUED=5]="CUED",i}(p||{});let O=(()=>{const e=class e{constructor(){r(this,"_ngZone",m(ae));r(this,"_nonce",m(re,{optional:!0}));r(this,"_changeDetectorRef",m(H));r(this,"_player");r(this,"_pendingPlayer");r(this,"_existingApiReadyCallback");r(this,"_pendingPlayerState");r(this,"_destroyed",new se);r(this,"_playerChanges",new oe(void 0));r(this,"_isLoading",!1);r(this,"_hasPlaceholder",!0);r(this,"_isBrowser");r(this,"videoId");r(this,"_height",W);r(this,"_width",U);r(this,"startSeconds");r(this,"endSeconds");r(this,"suggestedQuality");r(this,"playerVars");r(this,"disableCookies",!1);r(this,"loadApi");r(this,"disablePlaceholder",!1);r(this,"showBeforeIframeApiLoads",!1);r(this,"placeholderButtonLabel");r(this,"placeholderImageQuality");r(this,"ready",new le);r(this,"stateChange",this._getLazyEmitter("onStateChange"));r(this,"error",this._getLazyEmitter("onError"));r(this,"apiChange",this._getLazyEmitter("onApiChange"));r(this,"playbackQualityChange",this._getLazyEmitter("onPlaybackQualityChange"));r(this,"playbackRateChange",this._getLazyEmitter("onPlaybackRateChange"));r(this,"youtubeContainer");const t=m(R),a=m(We,{optional:!0});this.loadApi=a?.loadApi??!0,this.disablePlaceholder=!!a?.disablePlaceholder,this.placeholderButtonLabel=a?.placeholderButtonLabel||"Play video",this.placeholderImageQuality=a?.placeholderImageQuality||"standard",this._isBrowser=V(t)}get height(){return this._height}set height(t){this._height=t==null||isNaN(t)?W:t}get width(){return this._width}set width(t){this._width=t==null||isNaN(t)?U:t}ngAfterViewInit(){this._conditionallyLoad()}ngOnChanges(t){this._shouldRecreatePlayer(t)?this._conditionallyLoad():this._player&&((t.width||t.height)&&this._setSize(),t.suggestedQuality&&this._setQuality(),(t.startSeconds||t.endSeconds||t.suggestedQuality)&&this._cuePlayer())}ngOnDestroy(){this._pendingPlayer?.destroy(),this._player&&(this._player.destroy(),window.onYouTubeIframeAPIReady=this._existingApiReadyCallback),this._playerChanges.complete(),this._destroyed.next(),this._destroyed.complete()}playVideo(){this._player?this._player.playVideo():(this._getPendingState().playbackState=p.PLAYING,this._load(!0))}pauseVideo(){this._player?this._player.pauseVideo():this._getPendingState().playbackState=p.PAUSED}stopVideo(){this._player?this._player.stopVideo():this._getPendingState().playbackState=p.CUED}seekTo(t,a){this._player?this._player.seekTo(t,a):this._getPendingState().seek={seconds:t,allowSeekAhead:a}}mute(){this._player?this._player.mute():this._getPendingState().muted=!0}unMute(){this._player?this._player.unMute():this._getPendingState().muted=!1}isMuted(){return this._player?this._player.isMuted():this._pendingPlayerState?!!this._pendingPlayerState.muted:!1}setVolume(t){this._player?this._player.setVolume(t):this._getPendingState().volume=t}getVolume(){return this._player?this._player.getVolume():this._pendingPlayerState&&this._pendingPlayerState.volume!=null?this._pendingPlayerState.volume:0}setPlaybackRate(t){if(this._player)return this._player.setPlaybackRate(t);this._getPendingState().playbackRate=t}getPlaybackRate(){return this._player?this._player.getPlaybackRate():this._pendingPlayerState&&this._pendingPlayerState.playbackRate!=null?this._pendingPlayerState.playbackRate:0}getAvailablePlaybackRates(){return this._player?this._player.getAvailablePlaybackRates():[]}getVideoLoadedFraction(){return this._player?this._player.getVideoLoadedFraction():0}getPlayerState(){if(!(!this._isBrowser||!window.YT))return this._player?this._player.getPlayerState():this._pendingPlayerState&&this._pendingPlayerState.playbackState!=null?this._pendingPlayerState.playbackState:p.UNSTARTED}getCurrentTime(){return this._player?this._player.getCurrentTime():this._pendingPlayerState&&this._pendingPlayerState.seek?this._pendingPlayerState.seek.seconds:0}getPlaybackQuality(){return this._player?this._player.getPlaybackQuality():"default"}getAvailableQualityLevels(){return this._player?this._player.getAvailableQualityLevels():[]}getDuration(){return this._player?this._player.getDuration():0}getVideoUrl(){return this._player?this._player.getVideoUrl():""}getVideoEmbedCode(){return this._player?this._player.getVideoEmbedCode():""}_load(t){this._isBrowser&&(!window.YT||!window.YT.Player?(this.loadApi?(this._isLoading=!0,Ye(this._nonce)):this.showBeforeIframeApiLoads,this._existingApiReadyCallback=window.onYouTubeIframeAPIReady,window.onYouTubeIframeAPIReady=()=>{this._existingApiReadyCallback?.(),this._ngZone.run(()=>this._createPlayer(t))}):this._createPlayer(t))}_conditionallyLoad(){this._shouldShowPlaceholder()?this.playerVars?.autoplay===1&&this._load(!0):this._load(!1)}_shouldShowPlaceholder(){return this.disablePlaceholder?!1:this._isBrowser?this._hasPlaceholder&&!!this.videoId&&!this._player:!0}_getPendingState(){return this._pendingPlayerState||(this._pendingPlayerState={}),this._pendingPlayerState}_shouldRecreatePlayer(t){const a=t.videoId||t.playerVars||t.disableCookies||t.disablePlaceholder;return!!a&&!a.isFirstChange()}_createPlayer(t){if(this._player?.destroy(),this._pendingPlayer?.destroy(),typeof YT>"u"||!this.videoId&&!this.playerVars?.list)return;const a=this._ngZone.runOutsideAngular(()=>new YT.Player(this.youtubeContainer.nativeElement,{videoId:this.videoId,host:this.disableCookies?"https://www.youtube-nocookie.com":void 0,width:this.width,height:this.height,playerVars:t?{...this.playerVars||{},autoplay:1}:this.playerVars})),d=u=>{this._ngZone.run(()=>{this._isLoading=!1,this._hasPlaceholder=!1,this._player=a,this._pendingPlayer=void 0,a.removeEventListener("onReady",d),this._playerChanges.next(a),this.ready.emit(u),this._setSize(),this._setQuality(),this._pendingPlayerState&&(this._applyPendingPlayerState(a,this._pendingPlayerState),this._pendingPlayerState=void 0);const y=a.getPlayerState();y===p.UNSTARTED||y===p.CUED||y==null?this._cuePlayer():t&&this.startSeconds&&this.startSeconds>0&&a.seekTo(this.startSeconds,!0),this._changeDetectorRef.markForCheck()})};this._pendingPlayer=a,a.addEventListener("onReady",d)}_applyPendingPlayerState(t,a){const{playbackState:d,playbackRate:u,volume:y,muted:Q,seek:x}=a;switch(d){case p.PLAYING:t.playVideo();break;case p.PAUSED:t.pauseVideo();break;case p.CUED:t.stopVideo();break}u!=null&&t.setPlaybackRate(u),y!=null&&t.setVolume(y),Q!=null&&(Q?t.mute():t.unMute()),x!=null&&t.seekTo(x.seconds,x.allowSeekAhead)}_cuePlayer(){this._player&&this.videoId&&this._player.cueVideoById({videoId:this.videoId,startSeconds:this.startSeconds,endSeconds:this.endSeconds,suggestedQuality:this.suggestedQuality})}_setSize(){this._player?.setSize(this.width,this.height)}_setQuality(){this._player&&this.suggestedQuality&&this._player.setPlaybackQuality(this.suggestedQuality)}_getLazyEmitter(t){return this._playerChanges.pipe(de(a=>a?Ve(d=>{a.addEventListener(t,d)},d=>{try{a?.removeEventListener?.(t,d)}catch{}}):ce()),a=>new j(d=>a.subscribe({next:u=>this._ngZone.run(()=>d.next(u)),error:u=>d.error(u),complete:()=>d.complete()})),he(this._destroyed))}};r(e,"ɵfac",function(a){return new(a||e)}),r(e,"ɵcmp",_({type:e,selectors:[["youtube-player"]],viewQuery:function(a,d){if(a&1&&ue(Qe,7),a&2){let u;ge(u=pe())&&(d.youtubeContainer=u.first)}},inputs:{videoId:"videoId",height:[2,"height","height",E],width:[2,"width","width",E],startSeconds:[2,"startSeconds","startSeconds",Y],endSeconds:[2,"endSeconds","endSeconds",Y],suggestedQuality:"suggestedQuality",playerVars:"playerVars",disableCookies:[2,"disableCookies","disableCookies",C],loadApi:[2,"loadApi","loadApi",C],disablePlaceholder:[2,"disablePlaceholder","disablePlaceholder",C],showBeforeIframeApiLoads:[2,"showBeforeIframeApiLoads","showBeforeIframeApiLoads",C],placeholderButtonLabel:"placeholderButtonLabel",placeholderImageQuality:"placeholderImageQuality"},outputs:{ready:"ready",stateChange:"stateChange",error:"error",apiChange:"apiChange",playbackQualityChange:"playbackQualityChange",playbackRateChange:"playbackRateChange"},features:[me,fe],decls:4,vars:3,consts:[["youtubeContainer",""],[3,"videoId","width","height","isLoading","buttonLabel","quality"],[3,"click","videoId","width","height","isLoading","buttonLabel","quality"]],template:function(a,d){a&1&&(A(0,Ne,1,6,"youtube-player-placeholder",1),o(1,"div"),h(2,"div",null,0),s()),a&2&&(q(d._shouldShowPlaceholder()?0:-1),g(),Z("display",d._shouldShowPlaceholder()?"none":""))},dependencies:[Ue],encapsulation:2,changeDetection:0}));let n=e;return n})(),T=!1;function Ye(i){if(T)return;const n="https://www.youtube.com/iframe_api",e=document.createElement("script"),c=t=>{e.removeEventListener("load",c),e.removeEventListener("error",c),t.type==="error"&&(T=!1)};e.addEventListener("load",c),e.addEventListener("error",c),e.src=n,e.async=!0,i&&e.setAttribute("nonce",i),T=!0,document.body.appendChild(e)}let Ge=(()=>{const e=class e{};r(e,"ɵfac",function(a){return new(a||e)}),r(e,"ɵmod",ne({type:e,imports:[O],exports:[O]})),r(e,"ɵinj",ie({}));let n=e;return n})();function je(i,n){if(i&1&&(o(0,"li",1)(1,"div",2)(2,"div",3)(3,"span",4),l(4),s(),o(5,"span",5),l(6),s()(),o(7,"h4",6),l(8),s(),o(9,"span",7),l(10),s(),o(11,"p"),l(12),s()()()),i&2){const e=n.$implicit,c=n.$index;f("ngClass",c%2!==0?"right":"left"),g(4),N(" ",e.when," "),g(2),S(e.location),g(2),N(" ",e.what," "),g(2),S(e.where),g(2),S(e.info)}}const b=class b{constructor(){this.steps=[{location:"Frankfurt (Oder)",when:"2012",what:`🧰 Facharbeiter
IT-Systemelektroniker`,where:"Deutschen Telekom AG",info:"Informatik, Telekommunikationstechnik sowie Elektrotechnik"},{location:"Cottbus",when:"2012",what:"☎️ Sachbearbeiter Technische Kundenberatung",where:"Deutsche Telekom Technischer Service GmbH (Customer Competence Center)",info:"Second Level Support für VoIP und WLAN Produkte."},{location:"Leipzig",when:"2015",what:`🎓 Bachelor Of Engineering
Kommunikations- Und Medieninformatik`,where:"Deutsche Telekom Hochschule für Telekommunikation",info:"Netzwerk- und Übertragungstechnik, Software Engineering, IT-Architektur, Protokollengineering sowie Web und Medien-Technologien."},{location:"Berlin",when:"2015",what:"🚨 Entwickler TETRA Support Und Umsetzung",where:"Deutsche Telekom Healthcare & Security Solutions GmbH",info:"Umsetzung von Client- und Serversystemen im Bereich des TETRA-BOS. Administration, Konfiguration, Integration und Test von IT-Systemen."},{location:" ",when:"2017",what:"📕 Angular (1. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript"},{location:"Berlin",when:"2019",what:`💎 Spezialist
Entwickler Und IT-Berater`,where:"DB Systel GmbH",info:"Entwicklung nutzerzentrierter Webanwendungen im Enterprise-Umfeld. Beratung zur Umsetzung von Web-Anwendungen und -Architekturen sowie User Experience (UX) Consulting."},{location:" ",when:"2019",what:"📕 Angular (2. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive NativeScript und NgRx"},{location:" ",when:"2020",what:"📕 Angular (3. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive RxJS, NgRx und PWA"},{location:"Berlin",when:"seit 2022",what:"💎 Seniorberater & Frontend Architect",where:"DB Systel GmbH",info:"Entwicklung von Enterprise-Webanwendungen"},{location:" ",when:"2023",what:"📕 Angular (4. Auflage)",where:"dpunkt.verlag",info:"Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices. Inklusive RxJS, NgRx und a11y."}].reverse()}};b.ɵfac=function(e){return new(e||b)},b.ɵcmp=_({type:b,selectors:[["dk-personal-timeline"]],decls:3,vars:0,consts:[[1,"timeline"],[1,"container","hidden","list-item",3,"ngClass"],[1,"content"],[1,"timeline-heading-header"],[1,"timeline-heading-info","time"],[1,"timeline-heading-info","location"],[1,"timeline-heading"],[1,"timeline-heading-info"]],template:function(e,c){e&1&&(o(0,"ol",0),Ce(1,je,13,6,"li",1,Ae),s()),e&2&&(g(),xe(c.steps))},dependencies:[Se],styles:[`

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
}`]});let L=b;const He=["videoBox"],qe=()=>[O],Ze=()=>["fab","spotify"],$e=()=>["fab","apple"],Ke=()=>["fab","deezer"];function Je(i,n){if(i&1&&h(0,"youtube-player",22),i&2){const e=M(2);f("width",e.youtubePlayerWidth)}}function Xe(i,n){i&1&&h(0,"div")}function et(i,n){i&1&&(o(0,"div",18,0),A(2,Je,1,1)(3,Xe,1,0),K(4,2,qe,null,3),J(0,-1),s())}function tt(i,n){i&1&&h(0,"img",23)}function nt(i,n){i&1&&h(0,"div")}const w=class w{constructor(){this.cdref=m(H),this.platformId=m(R),this.videoBox=Be("videoBox"),this.youtubePlayerWidth=300,this.isBrowser=!1,this.faLib=m(Ie),this.isBrowser=V(this.platformId),this.faLib.addIcons(Te,Ee,Me)}onResize(){const n=this.videoBox();n?.nativeElement?.clientWidth&&(this.youtubePlayerWidth=n.nativeElement.clientWidth)}ngOnInit(){if(this.isBrowser){const n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",document.body.appendChild(n)}}ngAfterViewChecked(){this.onResize(),this.cdref.detectChanges()}};w.ɵfac=function(e){return new(e||w)},w.ɵcmp=_({type:w,selectors:[["dk-about"]],viewQuery:function(e,c){e&1&&Oe(c.videoBox,He,5),e&2&&Le()},hostBindings:function(e,c){e&1&&$("resize",function(a){return c.onResize(a)},!1,ze)},decls:60,vars:7,consts:[["videoBox",""],["id","about",1,"wrapper","style2"],[1,"inner"],[1,"major"],["id","about-k9n",1,"about"],[1,"interviews"],[1,"text-img"],["href","https://techstories.dbsystel.de/blog/profiles/Maximilian-Franzke.html","target","_blank"],["href","https://www.linkedin.com/in/jan-g%C3%B6tze-178516a6/","target","_blank"],[1,"button-group"],["href","https://open.spotify.com/episode/4n6qXpYtCZ9UQACbUPNMpG?si=fIldVBQhR_e8Vw4iStiBSw",1,"button","small"],[3,"icon"],["href","https://podcasts.apple.com/de/podcast/digitale-barrierefreiheit-danny-koppenhagen-und-maximilian/id1462447493?i=1000642092259",1,"button","small"],["href","https://deezer.page.link/MZaQ2c5YqQ28vcdn6",1,"button","small"],["src","images/it_at_db_podcast_a11y.jpeg","width","300","height","300","alt",'Ein lebendiger oranger Hintergrund bildet die Kulisse für kreative Würfel, die in geschickter Anordnung die Worte "Accessible" und "Possible" formen. Die Würfel sind tastbar, mit klaren Strukturen, um die Botschaft haptisch erfahrbar zu machen. Das Bild verweist auf Folge Nummer 73 der Podcastfolge von IT@DB zum Thema "Digitale Barrierefreiheit"'],[1,"grid-container"],[1,"grid-description-1"],[1,"grid-description-2"],[1,"grid-details-1","video-box"],[1,"grid-details-2"],["href","https://www.agiledrop.com/blog/interview-danny-koppenhagen-vuejs-angular-buch-scully-and-web-components",1,"button","small"],[1,"features"],["videoId","O3bYfZ8tcLc",3,"width"],["src","https://www.agiledrop.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F229922%2F400x500%2F5f11469228%2Frc-angular-interview-3.png&w=2048&q=80","alt","Ein roter Hintergrund mit einem großen Angular-Logo und dem Foto von Danny Koppenhagen auf der rechten Seite"]],template:function(e,c){e&1&&(o(0,"section",1)(1,"div",2)(2,"h2",3),l(3,"Über mich"),s(),o(4,"p"),l(5," Ich bin Danny Koppenhagen: Frontend Entwickler und -Architekt. Ich entwickle seit vielen Jahren nutzerzentrierte Enterprise Webanwendung und bevorzuge die Arbeit im DevOps-Produktionsmodell. Als technologische Basis setze ich auf moderne SPA-Frameworks wie Angular und Vue mit TypeScript. Weiterhin bin ich als Berater im Bereich der Webentwicklung tätig und Maintainer einiger Open Source Projekte. "),s(),o(6,"section",4)(7,"h3",3),l(8,"k9n.dev?"),s(),o(9,"p"),l(10," Warum k9n.dev? Hierbei handelt es sich um ein Numeronym, bei dem die Zahl zwischen den beiden Buchstaben für die Anzahl der ausgelassenen Buchstaben in meinem Nachnamen steht (Vgl.: a11y, i18n, l10n, ...). "),s()(),o(11,"h3",3),l(12,"Interviews"),s(),o(13,"section",5)(14,"article",6)(15,"div")(16,"h4"),l(17," IT@DB Podcast Folge #73 vom 18.01.2024: Digitale Barrierefreiheit "),s(),o(18,"p"),l(19," Zusammen mit meinem Kollegen "),o(20,"a",7),l(21,"Maximilian Franzke"),s(),l(22," von der DB Systel, war ich zu Gast beim IT@DB Podcast von "),o(23,"a",8),l(24,"Jan Götze"),s(),l(25,". Hier haben wir darüber gesprochen, warum es in unserer zunehmend digitalisierten Welt von entscheidender Bedeutung ist, dass wir die Prinzipien der digitalen Barrierefreiheit fest in unserer Gestaltung und Entwicklung von digitalen Produkten verankern. Barrierefreiheit geht weit über bloße Compliance hinaus – es ist die Grundlage für eine inklusive und gerechte Online-Erfahrung! Digitale Barrierefreiheit ermöglicht es Menschen mit unterschiedlichen Fähigkeiten, unabhängig von physischen oder kognitiven Einschränkungen, die gleichen Chancen im digitalen Raum zu nutzen. "),s(),o(26,"div",9)(27,"a",10),h(28,"fa-icon",11),l(29," Spotify "),s(),o(30,"a",12),h(31,"fa-icon",11),l(32," Apple Podcasts "),s(),o(33,"a",13),h(34,"fa-icon",11),l(35," Deezer "),s()()(),h(36,"img",14),s(),o(37,"div",15)(38,"article",16)(39,"h4"),l(40,"#000000 c0ffee Tech-Talk der DB Systel"),s(),o(41,"p"),l(42,' Im Mai war ich zu Gast beim #000000 c0ffee Tech-Talk der DB Systel, der Auf Grund der weltweiten Corona Pandemie remote stattfand.\\r\\n Im Interview spreche ich über meine Erfahrungen mit Vue.js und Angular und gehe darauf ein, welches Framework sich für welche Anwendungszwecke eignet. Außerdem erläutere ich, wie der aktuelle Stand der Technik für Progressive Webapps (PWA) ist. Im letzten Teil sprechen wir über die Anbindung von APIs und über das Architekturmuster "Backend For Frontends" (BFF). '),s()(),o(43,"article",17)(44,"h4"),l(45,"Interview mit Agiledrop"),s(),o(46,"p"),l(47,' Im Interview mit Agiledrop spreche ich über meinen Weg zur Webentwicklung und wie ich dazu kam Co-Autor des deutschsprachigen Angular Buchs zu sein. Weiterhin berichte ich von meinen praktischen Erfahrungen mit Angular und Vue.js und in welchem Fall ich auf Angular oder Vue.js setzen würde. Zum Abschluss gehe ich auf den Static-Site-Generator \\"Scully\\" und Webcomponents sowie auf meine Erwartungen an die zukünftige Entwicklung im Bereich Webtechnologien ein. '),s()(),A(48,et,6,0,"div",18),o(49,"div",19),A(50,tt,1,0)(51,nt,1,0),K(52,50,null,null,51),J(0,-1),o(54,"a",20),l(55,"Zum kompletten Interview"),s()()()(),o(56,"h3",3),l(57,"Mein Werdegang"),s(),o(58,"section",21),h(59,"dk-personal-timeline"),s()()()),e&2&&(g(28),f("icon",B(4,Ze)),g(3),f("icon",B(5,$e)),g(3),f("icon",B(6,Ke)),g(14),q(c.isBrowser?48:-1))},dependencies:[Ge,L,De,Fe],styles:[`p[_ngcontent-%COMP%] {
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
}`],changeDetection:0});let z=w;const P=class P{};P.ɵfac=function(e){return new(e||P)},P.ɵcmp=_({type:P,selectors:[["dk-meetups"]],decls:11,vars:0,consts:[[1,"wrapper","alt","spotlight"],[1,"inner"],["href","https://www.meetup.com/de-DE/Angular-Meetup-Berlin",1,"image"],["src","images/Angular-Berlin_Icon.png","alt","Angular Berlin Logo"],[1,"content"],[1,"major"],["href","https://www.meetup.com/de-DE/Angular-Meetup-Berlin",1,"special"]],template:function(e,c){e&1&&(o(0,"section",0)(1,"div",1)(2,"a",2),h(3,"img",3),s(),o(4,"div",4)(5,"h2",5),l(6,"Angular Berlin Meetup"),s(),o(7,"p"),l(8," Ich bin Co-Organisator des Angular Meetup in Berlin. Dieses findet ca. alle 4-6 Wochen an wechselnden Standorten statt. Neben zwei Talks am Abend steht der Austausch und die Vernetzung mit anderen Entwickler:innen im Vordergrund. "),s(),o(9,"a",6),l(10,"Meetup.com: Angular Berlin"),s()()()())},styles:[`.image[_ngcontent-%COMP%], 
.image[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%], 
.wrapper.spotlight[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  border-radius: 0%;
  max-width: 200px;
}

.wrapper.spotlight[_ngcontent-%COMP%]:nth-child(2n-1)   .inner[_ngcontent-%COMP%] {
  text-align: left;
}`]});let D=P;const k=class k{};k.ɵfac=function(e){return new(e||k)},k.ɵcmp=_({type:k,selectors:[["dk-publications"]],decls:12,vars:0,consts:[["id","wrapper"],["id","one",1,"wrapper","spotlight","style1"],[1,"inner"],["href","https://angular-buch.com","aria-label","Zur Buchwebsite (angular-buch.com)",1,"image"],["src","images/book-cover.png","alt","Buchcover: angular-buch.com"],[1,"content"],[1,"major"],["href","https://angular-buch.com",1,"special"]],template:function(e,c){e&1&&(o(0,"section",0)(1,"section",1)(2,"div",2)(3,"a",3),h(4,"img",4),s(),o(5,"div",5)(6,"h2",6),l(7," Angular: Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices – ab Angular 15 "),s(),o(8,"p"),l(9," Lernen Sie Angular mit diesem umfassenden Praxisbuch! Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg mit einer praxisnahen Einführung. "),s(),o(10,"a",7),l(11,"angular-buch.com"),s()()()()())},styles:[`.image[_ngcontent-%COMP%], 
.image[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%], 
.wrapper.spotlight[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  border-radius: 0%;
}

.wrapper.spotlight[_ngcontent-%COMP%]:before {
  background-color: #3d4051;
}`]});let F=k;const v=class v{constructor(){this.platformId=m(R),this.isBrowser=!1,this.blogPosts=I(n=>n.filename.includes("/src/content/blog/")),this.projectPosts=I(n=>n.filename.includes("/src/content/projects/")),this.talkPosts=I(n=>n.filename.includes("/src/content/talks/")),this.isBrowser=V(this.platformId)}};v.ɵfac=function(e){return new(e||v)},v.ɵcmp=_({type:v,selectors:[["ng-component"]],decls:18,vars:6,consts:[[1,"wrapper","alt","style1","m0"],[1,"inner"],[1,"major"],["content","blog",3,"posts","max"],[1,"wrapper","style3"],["content","talks",3,"posts","max"],[1,"wrapper","alt","style1"],["content","projects",3,"posts","max"]],template:function(e,c){e&1&&(o(0,"section",0)(1,"div",1)(2,"h2",2),l(3,"Aktuelle Blog Posts"),s(),h(4,"dk-preview",3),s()(),o(5,"section",4)(6,"div",1)(7,"h2",2),l(8,"Meine Talks & Slides"),s(),h(9,"dk-preview",5),s()(),h(10,"dk-publications"),o(11,"section",6)(12,"div",1)(13,"h2",2),l(14,"Meine Projekte"),s(),h(15,"dk-preview",7),s()(),h(16,"dk-about")(17,"dk-meetups")),e&2&&(g(4),f("posts",c.blogPosts)("max",4),g(5),f("posts",c.talkPosts)("max",4),g(6),f("posts",c.projectPosts)("max",4))},dependencies:[Re,F,z,D],styles:[`.m0[_ngcontent-%COMP%] {
      margin: 0;
    }`]});let G=v;export{G as default};
