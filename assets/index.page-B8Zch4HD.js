import{ar as j,as as O,at as U,a0 as G,a1 as H,ɵ as _,au as Z,P as A,a as p,O as D,M as F,N as z,Z as k,av as y,$ as q,aq as $,d as g,e as f,l as r,m as d,o as a,h as L,p as h,aw as R,ab as K,a7 as Y,ac as J,s as S,ad as X,q as m,ax as ee,ay as te,B as ne,S as ie,a5 as ae,az as w,aA as re,K as V,b as T,aB as oe,E as se,a6 as le,a4 as de,v as ue,w as he,x as ce,a8 as pe,n as s,y as M,r as P,aC as Q,aD as W,aE as ge,H as C}from"./index-BjtsTuMn.js";import{P as me}from"./preview.component-B2V63ifx.js";function N(t,o,i){return i?N(t,o).pipe(j(i)):new O(function(e){var n=function(){for(var u=[],c=0;c<arguments.length;c++)u[c]=arguments[c];return e.next(u.length===1?u[0]:u)},l=t(n);return U(o)?function(){return o(n,l)}:void 0})}const _e=["youtubeContainer"];function ye(t,o){if(t&1){const i=K();r(0,"youtube-player-placeholder",2),Y("click",function(){J(i);const n=S();return X(n._load(!0))}),a()}if(t&2){const i=S();m("videoId",i.videoId)("width",i.width)("height",i.height)("isLoading",i._isLoading)("buttonLabel",i.placeholderButtonLabel)("quality",i.placeholderImageQuality)}}let fe=(()=>{var t;class o{_getBackgroundImage(){let e;return this.quality==="low"?e=`https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`:this.quality==="high"?e=`https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`:e=`https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,`url(${e})`}}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=p({type:t,selectors:[["youtube-player-placeholder"]],hostAttrs:[1,"youtube-player-placeholder"],hostVars:8,hostBindings:function(e,n){e&2&&(R("background-image",n._getBackgroundImage())("width",n.width,"px")("height",n.height,"px"),ee("youtube-player-placeholder-loading",n.isLoading))},inputs:{videoId:"videoId",width:"width",height:"height",isLoading:"isLoading",buttonLabel:"buttonLabel",quality:"quality"},standalone:!0,features:[g],decls:4,vars:1,consts:[["type","button",1,"youtube-player-placeholder-button"],["height","100%","version","1.1","viewBox","0 0 68 48","focusable","false","aria-hidden","true"],["d","M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z","fill","#f00"],["d","M 45,24 27,14 27,34","fill","#fff"]],template:function(e,n){e&1&&(r(0,"button",0),te(),r(1,"svg",1),d(2,"path",2)(3,"path",3),a()()),e&2&&ne("aria-label",n.buttonLabel)},styles:[".youtube-player-placeholder{display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden;cursor:pointer;background-color:#000;background-position:center center;background-size:cover;transition:box-shadow 300ms ease;box-shadow:inset 0 120px 90px -90px rgba(0,0,0,.8)}.youtube-player-placeholder-button{transition:opacity 300ms ease;-moz-appearance:none;-webkit-appearance:none;background:none;border:none;padding:0;display:flex}.youtube-player-placeholder-button svg{width:68px;height:48px}.youtube-player-placeholder-loading{box-shadow:none}.youtube-player-placeholder-loading .youtube-player-placeholder-button{opacity:0}"],encapsulation:2,changeDetection:0}),o})();const be=new de("YOUTUBE_PLAYER_CONFIG"),B=640,I=390;function E(t){return t==null?t:k(t,0)}let we=(()=>{var t;class o{get height(){return this._height}set height(e){this._height=e==null||isNaN(e)?I:e}get width(){return this._width}set width(e){this._width=e==null||isNaN(e)?B:e}constructor(e,n){this._ngZone=e,this._destroyed=new ie,this._playerChanges=new ae(void 0),this._nonce=w(re,{optional:!0}),this._changeDetectorRef=w(V),this._isLoading=!1,this._hasPlaceholder=!0,this._height=I,this._width=B,this.disableCookies=!1,this.disablePlaceholder=!1,this.showBeforeIframeApiLoads=!1,this.ready=this._getLazyEmitter("onReady"),this.stateChange=this._getLazyEmitter("onStateChange"),this.error=this._getLazyEmitter("onError"),this.apiChange=this._getLazyEmitter("onApiChange"),this.playbackQualityChange=this._getLazyEmitter("onPlaybackQualityChange"),this.playbackRateChange=this._getLazyEmitter("onPlaybackRateChange");const l=w(be,{optional:!0});this.loadApi=l?.loadApi??!0,this.disablePlaceholder=!!l?.disablePlaceholder,this.placeholderButtonLabel=l?.placeholderButtonLabel||"Play video",this.placeholderImageQuality=l?.placeholderImageQuality||"standard",this._isBrowser=T(n)}ngAfterViewInit(){this._conditionallyLoad()}ngOnChanges(e){this._shouldRecreatePlayer(e)?this._conditionallyLoad():this._player&&((e.width||e.height)&&this._setSize(),e.suggestedQuality&&this._setQuality(),(e.startSeconds||e.endSeconds||e.suggestedQuality)&&this._cuePlayer())}ngOnDestroy(){this._pendingPlayer?.destroy(),this._player&&(this._player.destroy(),window.onYouTubeIframeAPIReady=this._existingApiReadyCallback),this._playerChanges.complete(),this._destroyed.next(),this._destroyed.complete()}playVideo(){this._player?this._player.playVideo():this._getPendingState().playbackState=YT.PlayerState.PLAYING}pauseVideo(){this._player?this._player.pauseVideo():this._getPendingState().playbackState=YT.PlayerState.PAUSED}stopVideo(){this._player?this._player.stopVideo():this._getPendingState().playbackState=YT.PlayerState.CUED}seekTo(e,n){this._player?this._player.seekTo(e,n):this._getPendingState().seek={seconds:e,allowSeekAhead:n}}mute(){this._player?this._player.mute():this._getPendingState().muted=!0}unMute(){this._player?this._player.unMute():this._getPendingState().muted=!1}isMuted(){return this._player?this._player.isMuted():this._pendingPlayerState?!!this._pendingPlayerState.muted:!1}setVolume(e){this._player?this._player.setVolume(e):this._getPendingState().volume=e}getVolume(){return this._player?this._player.getVolume():this._pendingPlayerState&&this._pendingPlayerState.volume!=null?this._pendingPlayerState.volume:0}setPlaybackRate(e){if(this._player)return this._player.setPlaybackRate(e);this._getPendingState().playbackRate=e}getPlaybackRate(){return this._player?this._player.getPlaybackRate():this._pendingPlayerState&&this._pendingPlayerState.playbackRate!=null?this._pendingPlayerState.playbackRate:0}getAvailablePlaybackRates(){return this._player?this._player.getAvailablePlaybackRates():[]}getVideoLoadedFraction(){return this._player?this._player.getVideoLoadedFraction():0}getPlayerState(){if(!(!this._isBrowser||!window.YT))return this._player?this._player.getPlayerState():this._pendingPlayerState&&this._pendingPlayerState.playbackState!=null?this._pendingPlayerState.playbackState:YT.PlayerState.UNSTARTED}getCurrentTime(){return this._player?this._player.getCurrentTime():this._pendingPlayerState&&this._pendingPlayerState.seek?this._pendingPlayerState.seek.seconds:0}getPlaybackQuality(){return this._player?this._player.getPlaybackQuality():"default"}getAvailableQualityLevels(){return this._player?this._player.getAvailableQualityLevels():[]}getDuration(){return this._player?this._player.getDuration():0}getVideoUrl(){return this._player?this._player.getVideoUrl():""}getVideoEmbedCode(){return this._player?this._player.getVideoEmbedCode():""}_load(e){this._isBrowser&&(!window.YT||!window.YT.Player?(this.loadApi?(this._isLoading=!0,Pe(this._nonce)):this.showBeforeIframeApiLoads,this._existingApiReadyCallback=window.onYouTubeIframeAPIReady,window.onYouTubeIframeAPIReady=()=>{this._existingApiReadyCallback?.(),this._ngZone.run(()=>this._createPlayer(e))}):this._createPlayer(e))}_conditionallyLoad(){this._shouldShowPlaceholder()?this.playerVars?.autoplay===1&&this._load(!0):this._load(!1)}_shouldShowPlaceholder(){return this.disablePlaceholder?!1:this._isBrowser?this._hasPlaceholder&&!!this.videoId&&!this._player:!0}_getPendingState(){return this._pendingPlayerState||(this._pendingPlayerState={}),this._pendingPlayerState}_shouldRecreatePlayer(e){const n=e.videoId||e.playerVars||e.disableCookies||e.disablePlaceholder;return!!n&&!n.isFirstChange()}_createPlayer(e){if(this._player?.destroy(),this._pendingPlayer?.destroy(),typeof YT>"u"||!this.videoId&&!this.playerVars?.list)return;const n=this._ngZone.runOutsideAngular(()=>new YT.Player(this.youtubeContainer.nativeElement,{videoId:this.videoId,host:this.disableCookies?"https://www.youtube-nocookie.com":void 0,width:this.width,height:this.height,playerVars:e?{...this.playerVars||{},autoplay:1}:this.playerVars})),l=()=>{this._ngZone.run(()=>{this._isLoading=!1,this._hasPlaceholder=!1,this._player=n,this._pendingPlayer=void 0,n.removeEventListener("onReady",l),this._playerChanges.next(n),this._setSize(),this._setQuality(),this._pendingPlayerState&&(this._applyPendingPlayerState(n,this._pendingPlayerState),this._pendingPlayerState=void 0);const u=n.getPlayerState();(u===YT.PlayerState.UNSTARTED||u===YT.PlayerState.CUED||u==null)&&this._cuePlayer(),this._changeDetectorRef.markForCheck()})};this._pendingPlayer=n,n.addEventListener("onReady",l)}_applyPendingPlayerState(e,n){const{playbackState:l,playbackRate:u,volume:c,muted:x,seek:b}=n;switch(l){case YT.PlayerState.PLAYING:e.playVideo();break;case YT.PlayerState.PAUSED:e.pauseVideo();break;case YT.PlayerState.CUED:e.stopVideo();break}u!=null&&e.setPlaybackRate(u),c!=null&&e.setVolume(c),x!=null&&(x?e.mute():e.unMute()),b!=null&&e.seekTo(b.seconds,b.allowSeekAhead)}_cuePlayer(){this._player&&this.videoId&&this._player.cueVideoById({videoId:this.videoId,startSeconds:this.startSeconds,endSeconds:this.endSeconds,suggestedQuality:this.suggestedQuality})}_setSize(){this._player?.setSize(this.width,this.height)}_setQuality(){this._player&&this.suggestedQuality&&this._player.setPlaybackQuality(this.suggestedQuality)}_getLazyEmitter(e){return this._playerChanges.pipe(oe(n=>n?N(l=>{n.addEventListener(e,l)},l=>{try{n?.removeEventListener?.(e,l)}catch{}}):se()),n=>new O(l=>n.subscribe({next:u=>this._ngZone.run(()=>l.next(u)),error:u=>l.error(u),complete:()=>l.complete()})),le(this._destroyed))}}return t=o,t.ɵfac=function(e){return new(e||t)(_(Z),_(A))},t.ɵcmp=p({type:t,selectors:[["youtube-player"]],viewQuery:function(e,n){if(e&1&&D(_e,7),e&2){let l;F(l=z())&&(n.youtubeContainer=l.first)}},inputs:{videoId:"videoId",height:[2,"height","height",k],width:[2,"width","width",k],startSeconds:[2,"startSeconds","startSeconds",E],endSeconds:[2,"endSeconds","endSeconds",E],suggestedQuality:"suggestedQuality",playerVars:"playerVars",disableCookies:[2,"disableCookies","disableCookies",y],loadApi:[2,"loadApi","loadApi",y],disablePlaceholder:[2,"disablePlaceholder","disablePlaceholder",y],showBeforeIframeApiLoads:[2,"showBeforeIframeApiLoads","showBeforeIframeApiLoads",y],placeholderButtonLabel:"placeholderButtonLabel",placeholderImageQuality:"placeholderImageQuality"},outputs:{ready:"ready",stateChange:"stateChange",error:"error",apiChange:"apiChange",playbackQualityChange:"playbackQualityChange",playbackRateChange:"playbackRateChange"},standalone:!0,features:[q,$,g],decls:4,vars:3,consts:[["youtubeContainer",""],[3,"videoId","width","height","isLoading","buttonLabel","quality"],[3,"click","videoId","width","height","isLoading","buttonLabel","quality"]],template:function(e,n){e&1&&(f(0,ye,1,6,"youtube-player-placeholder",1),r(1,"div"),d(2,"div",null,0),a()),e&2&&(L(n._shouldShowPlaceholder()?0:-1),h(),R("display",n._shouldShowPlaceholder()?"none":""))},dependencies:[fe],encapsulation:2,changeDetection:0}),o})(),v=!1;function Pe(t){if(v)return;const o="https://www.youtube.com/iframe_api",i=document.createElement("script"),e=n=>{i.removeEventListener("load",e),i.removeEventListener("error",e),n.type==="error"&&(v=!1)};i.addEventListener("load",e),i.addEventListener("error",e),i.src=o,i.async=!0,t&&i.setAttribute("nonce",t),v=!0,document.body.appendChild(i)}let Ce=(()=>{var t;class o{}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵmod=G({type:t}),t.ɵinj=H({}),o})();function ve(t,o){if(t&1&&(r(0,"li",1)(1,"div",2)(2,"div",3)(3,"span",4),s(4),a(),r(5,"span",5),s(6),a()(),r(7,"h4",6),s(8),a(),r(9,"span",7),s(10),a(),r(11,"p"),s(12),a()()()),t&2){const i=o.$implicit,e=o.$index;m("ngClass",e%2!==0?"right":"left"),h(4),M(" ",i.when," "),h(2),P(i.location),h(2),M(" ",i.what," "),h(2),P(i.where),h(2),P(i.info)}}let ke=(()=>{var t;class o{constructor(){this.steps=[{location:"Frankfurt (Oder)",when:"2012",what:`🧰 Facharbeiter
IT-Systemelektroniker`,where:"Deutschen Telekom AG",info:"Informatik, Telekommunikationstechnik sowie Elektrotechnik"},{location:"Cottbus",when:"2012",what:"☎️ Sachbearbeiter Technische Kundenberatung",where:"Deutsche Telekom Technischer Service GmbH (Customer Competence Center)",info:"Second Level Support für VoIP und WLAN Produkte."},{location:"Leipzig",when:"2015",what:`🎓 Bachelor Of Engineering
Kommunikations- Und Medieninformatik`,where:"Deutsche Telekom Hochschule für Telekommunikation",info:"Netzwerk- und Übertragungstechnik, Software Engineering, IT-Architektur, Protokollengineering sowie Web und Medien-Technologien."},{location:"Berlin",when:"2015",what:"🚨 Entwickler TETRA Support Und Umsetzung",where:"Deutsche Telekom Healthcare & Security Solutions GmbH",info:"Umsetzung von Client- und Serversystemen im Bereich des TETRA-BOS. Administration, Konfiguration, Integration und Test von IT-Systemen."},{location:" ",when:"2017",what:"📕 Angular (1. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript"},{location:"Berlin",when:"2019",what:`💎 Spezialist
Entwickler Und IT-Berater`,where:"DB Systel GmbH",info:"Entwicklung nutzerzentrierter Webanwendungen im Enterprise-Umfeld. Beratung zur Umsetzung von Web-Anwendungen und -Architekturen sowie User Experience (UX) Consulting."},{location:" ",when:"2019",what:"📕 Angular (2. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive NativeScript und NgRx"},{location:" ",when:"2020",what:"📕 Angular (3. Auflage)",where:"dpunkt.verlag",info:"Grundlagen, fortgeschrittene Themen und Best Practices – inklusive RxJS, NgRx und PWA"},{location:"Berlin",when:"seit 2022",what:"💎 Seniorberater & Frontend Architect",where:"DB Systel GmbH",info:"Entwicklung von Enterprise-Webanwendungen"},{location:" ",when:"2023",what:"📕 Angular (4. Auflage)",where:"dpunkt.verlag",info:"Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices. Inklusive RxJS, NgRx und a11y."}].reverse()}}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=p({type:t,selectors:[["dk-personal-timeline"]],standalone:!0,features:[g],decls:3,vars:0,consts:[[1,"timeline"],[1,"container","hidden","list-item",3,"ngClass"],[1,"content"],[1,"timeline-heading-header"],[1,"timeline-heading-info","time"],[1,"timeline-heading-info","location"],[1,"timeline-heading"],[1,"timeline-heading-info"]],template:function(e,n){e&1&&(r(0,"ol",0),ue(1,ve,13,6,"li",1,he),a()),e&2&&(h(),ce(n.steps))},dependencies:[pe],styles:[`

.timeline[_ngcontent-%COMP%] {
  position: relative;
  margin: 0 auto;
  padding: 0;
}


.timeline[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: #9c9b8d;
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
}`]}),o})();const Se=["videoBox"],Ae=()=>[we];function Te(t,o){if(t&1&&d(0,"youtube-player",24),t&2){const i=S(2);m("width",i.youtubePlayerWidth)}}function xe(t,o){t&1&&d(0,"div")}function Me(t,o){t&1&&(r(0,"div",20,0),f(2,Te,1,1)(3,xe,1,0),Q(4,2,Ae,null,3),W(0,-1),a())}function Be(t,o){t&1&&d(0,"img",25)}function Ie(t,o){t&1&&d(0,"div")}let Ee=(()=>{var t;class o{constructor(e,n){this.cdref=e,this.platformId=n,this.youtubePlayerWidth=300,this.isBrowser=!1,this.isBrowser=T(this.platformId)}onResize(){this.videoBox?.nativeElement?.clientWidth&&(this.youtubePlayerWidth=this.videoBox.nativeElement.clientWidth)}ngOnInit(){if(this.isBrowser){const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",document.body.appendChild(e)}}ngAfterViewInit(){this.onResize(),this.cdref.detectChanges()}}return t=o,t.ɵfac=function(e){return new(e||t)(_(V),_(A))},t.ɵcmp=p({type:t,selectors:[["dk-about"]],viewQuery:function(e,n){if(e&1&&D(Se,5),e&2){let l;F(l=z())&&(n.videoBox=l.first)}},hostBindings:function(e,n){e&1&&Y("resize",function(u){return n.onResize(u)},!1,ge)},standalone:!0,features:[g],decls:60,vars:1,consts:[["videoBox",""],["id","about",1,"wrapper","style2"],[1,"inner"],[1,"major"],["id","about-k9n",1,"about"],[1,"interviews"],[1,"text-img"],["href","https://techstories.dbsystel.de/blog/profiles/Maximilian-Franzke.html","target","_blank"],["href","https://www.linkedin.com/in/jan-g%C3%B6tze-178516a6/","target","_blank"],[1,"button-group"],["href","https://open.spotify.com/episode/4n6qXpYtCZ9UQACbUPNMpG?si=fIldVBQhR_e8Vw4iStiBSw",1,"button","small"],[1,"icon","brands","fa-spotify"],["href","https://podcasts.apple.com/de/podcast/digitale-barrierefreiheit-danny-koppenhagen-und-maximilian/id1462447493?i=1000642092259",1,"button","small"],[1,"icon","brands","fa-apple"],["href","https://deezer.page.link/MZaQ2c5YqQ28vcdn6",1,"button","small"],[1,"icon","brands","fa-deezer"],["src","images/it_at_db_podcast_a11y.jpeg","width","300","height","300","alt",'Ein lebendiger oranger Hintergrund bildet die Kulisse für kreative Würfel, die in geschickter Anordnung die Worte "Accessible" und "Possible" formen. Die Würfel sind tastbar, mit klaren Strukturen, um die Botschaft haptisch erfahrbar zu machen. Das Bild verweist auf Folge Nummer 73 der Podcastfolge von IT@DB zum Thema "Digitale Barrierefreiheit"'],[1,"grid-container"],[1,"grid-description-1"],[1,"grid-description-2"],[1,"grid-details-1","video-box"],[1,"grid-details-2"],["href","https://www.agiledrop.com/blog/interview-danny-koppenhagen-vuejs-angular-buch-scully-and-web-components",1,"button","small"],[1,"features"],["videoId","O3bYfZ8tcLc",3,"width"],["src","https://www.agiledrop.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F229922%2F400x500%2F5f11469228%2Frc-angular-interview-3.png&w=2048&q=80","alt","Ein roter Hintergrund mit einem großen Angular-Logo und dem Foto von Danny Koppenhagen auf der rechten Seite"]],template:function(e,n){e&1&&(r(0,"section",1)(1,"div",2)(2,"h2",3),s(3,"Über mich"),a(),r(4,"p"),s(5," Ich bin Danny Koppenhagen: Frontend Entwickler und -Architekt. Ich entwickle seit vielen Jahren nutzerzentrierte Enterprise Webanwendung und bevorzuge die Arbeit im DevOps-Produktionsmodell. Als technologische Basis setze ich auf moderne SPA-Frameworks wie Angular und Vue mit TypeScript. Weiterhin bin ich als Berater im Bereich der Webentwicklung tätig und Maintainer einiger Open Source Projekte. "),a(),r(6,"section",4)(7,"h3",3),s(8,"k9n.dev?"),a(),r(9,"p"),s(10," Warum k9n.dev? Hierbei handelt es sich um ein Numeronym, bei dem die Zahl zwischen den beiden Buchstaben für die Anzahl der ausgelassenen Buchstaben in meinem Nachnamen steht (Vgl.: a11y, i18n, l10n, ...). "),a()(),r(11,"h3",3),s(12,"Interviews"),a(),r(13,"section",5)(14,"article",6)(15,"div")(16,"h4"),s(17," IT@DB Podcast Folge #73 vom 18.01.2024: Digitale Barrierefreiheit "),a(),r(18,"p"),s(19," Zusammen mit meinem Kollegen "),r(20,"a",7),s(21,"Maximilian Franzke"),a(),s(22," von der DB Systel, war ich zu Gast beim IT@DB Podcast von "),r(23,"a",8),s(24,"Jan Götze"),a(),s(25,". Hier haben wir darüber gesprochen, warum es in unserer zunehmend digitalisierten Welt von entscheidender Bedeutung ist, dass wir die Prinzipien der digitalen Barrierefreiheit fest in unserer Gestaltung und Entwicklung von digitalen Produkten verankern. Barrierefreiheit geht weit über bloße Compliance hinaus – es ist die Grundlage für eine inklusive und gerechte Online-Erfahrung! Digitale Barrierefreiheit ermöglicht es Menschen mit unterschiedlichen Fähigkeiten, unabhängig von physischen oder kognitiven Einschränkungen, die gleichen Chancen im digitalen Raum zu nutzen. "),a(),r(26,"div",9)(27,"a",10),d(28,"i",11),s(29," Spotify "),a(),r(30,"a",12),d(31,"i",13),s(32,"Apple Podcasts "),a(),r(33,"a",14),d(34,"i",15),s(35,"Deezer "),a()()(),d(36,"img",16),a(),r(37,"div",17)(38,"article",18)(39,"h4"),s(40,"#000000 c0ffee Tech-Talk der DB Systel"),a(),r(41,"p"),s(42,' Im Mai war ich zu Gast beim #000000 c0ffee Tech-Talk der DB Systel, der Auf Grund der weltweiten Corona Pandemie remote stattfand.\\r\\n Im Interview spreche ich über meine Erfahrungen mit Vue.js und Angular und gehe darauf ein, welches Framework sich für welche Anwendungszwecke eignet. Außerdem erläutere ich, wie der aktuelle Stand der Technik für Progressive Webapps (PWA) ist. Im letzten Teil sprechen wir über die Anbindung von APIs und über das Architekturmuster \\"Backend For Frontends\\" (BFF). '),a()(),r(43,"article",19)(44,"h4"),s(45,"Interview mit Agiledrop"),a(),r(46,"p"),s(47,' Im Interview mit Agiledrop spreche ich über meinen Weg zur Webentwicklung und wie ich dazu kam Co-Autor des deutschsprachigen Angular Buchs zu sein. Weiterhin berichte ich von meinen praktischen Erfahrungen mit Angular und Vue.js und in welchem Fall ich auf Angular oder Vue.js setzen würde. Zum Abschluss gehe ich auf den Static-Site-Generator \\"Scully\\" und Webcomponents sowie auf meine Erwartungen an die zukünftige Entwicklung im Bereich Webtechnologien ein. '),a()(),f(48,Me,6,0,"div",20),r(49,"div",21),f(50,Be,1,0)(51,Ie,1,0),Q(52,50,null,null,51),W(0,-1),r(54,"a",22),s(55,"Zum kompletten Interview"),a()()()(),r(56,"h3",3),s(57,"Mein Werdegang"),a(),r(58,"section",23),d(59,"dk-personal-timeline"),a()()()),e&2&&(h(48),L(n.isBrowser?48:-1))},dependencies:[Ce,ke],styles:[`p[_ngcontent-%COMP%] {
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
}`],changeDetection:0}),o})(),Oe=(()=>{var t;class o{}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=p({type:t,selectors:[["dk-meetups"]],standalone:!0,features:[g],decls:11,vars:0,consts:[[1,"wrapper","alt","spotlight"],[1,"inner"],["href","https://www.meetup.com/de-DE/Angular-Meetup-Berlin",1,"image"],["src","images/Angular-Berlin_Icon.png","alt","Angular Berlin Logo"],[1,"content"],[1,"major"],["href","https://www.meetup.com/de-DE/Angular-Meetup-Berlin",1,"special"]],template:function(e,n){e&1&&(r(0,"section",0)(1,"div",1)(2,"a",2),d(3,"img",3),a(),r(4,"div",4)(5,"h2",5),s(6,"Angular Berlin Meetup"),a(),r(7,"p"),s(8," Ich bin Co-Organisator des Angular Meetup in Berlin. Dieses findet ca. alle 4-6 Wochen an wechselnden Standorten statt. Neben zwei Talks am Abend steht der Austausch und die Vernetzung mit anderen Entwickler:innen im Vordergrund. "),a(),r(9,"a",6),s(10,"Meetup.com: Angular Berlin"),a()()()())},styles:[`.image[_ngcontent-%COMP%], 
.image[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%], 
.wrapper.spotlight[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  border-radius: 0%;
  max-width: 200px;
}

.wrapper.spotlight[_ngcontent-%COMP%]:nth-child(2n-1)   .inner[_ngcontent-%COMP%] {
  text-align: left;
}`]}),o})(),De=(()=>{var t;class o{}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=p({type:t,selectors:[["dk-publications"]],standalone:!0,features:[g],decls:12,vars:0,consts:[["id","wrapper"],["id","one",1,"wrapper","spotlight","style1"],[1,"inner"],["href","https://angular-buch.com","aria-label","Zur Buchwebsite (angular-buch.com)",1,"image"],["src","images/book-cover.png","alt","Buchcover: angular-buch.com"],[1,"content"],[1,"major"],["href","https://angular-buch.com",1,"special"]],template:function(e,n){e&1&&(r(0,"section",0)(1,"section",1)(2,"div",2)(3,"a",3),d(4,"img",4),a(),r(5,"div",5)(6,"h2",6),s(7," Angular: Das große Praxisbuch – Grundlagen, fortgeschrittene Themen und Best Practices – ab Angular 15 "),a(),r(8,"p"),s(9," Lernen Sie Angular mit diesem umfassenden Praxisbuch! Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg mit einer praxisnahen Einführung. "),a(),r(10,"a",7),s(11,"angular-buch.com"),a()()()()())},styles:[`.image[_ngcontent-%COMP%], 
.image[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%], 
.wrapper.spotlight[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  border-radius: 0%;
}

.wrapper.spotlight[_ngcontent-%COMP%]:before {
  background-color: #3d4051;
}`]}),o})(),Le=(()=>{var t;class o{constructor(e){this.platformId=e,this.isBrowser=!1,this.blogPosts=C(n=>n.filename.includes("/src/content/blog/")),this.projectPosts=C(n=>n.filename.includes("/src/content/projects/")),this.talkPosts=C(n=>n.filename.includes("/src/content/talks/")),this.isBrowser=T(this.platformId)}}return t=o,t.ɵfac=function(e){return new(e||t)(_(A))},t.ɵcmp=p({type:t,selectors:[["ng-component"]],standalone:!0,features:[g],decls:18,vars:6,consts:[[1,"wrapper","alt","style1","m0"],[1,"inner"],[1,"major"],["content","blog",3,"posts","max"],[1,"wrapper","style3"],["content","talks",3,"posts","max"],[1,"wrapper","alt","style1"],["content","projects",3,"posts","max"]],template:function(e,n){e&1&&(r(0,"section",0)(1,"div",1)(2,"h2",2),s(3,"Aktuelle Blog Posts"),a(),d(4,"dk-preview",3),a()(),r(5,"section",4)(6,"div",1)(7,"h2",2),s(8,"Meine Talks & Slides"),a(),d(9,"dk-preview",5),a()(),d(10,"dk-publications"),r(11,"section",6)(12,"div",1)(13,"h2",2),s(14,"Meine Projekte"),a(),d(15,"dk-preview",7),a()(),d(16,"dk-about")(17,"dk-meetups")),e&2&&(h(4),m("posts",n.blogPosts)("max",4),h(5),m("posts",n.talkPosts)("max",4),h(6),m("posts",n.projectPosts)("max",4))},dependencies:[me,De,Ee,Oe],styles:[`.m0[_ngcontent-%COMP%] {
      margin: 0;
    }`]}),o})();export{Le as default};
