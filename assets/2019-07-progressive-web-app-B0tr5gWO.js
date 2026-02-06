const e=`---
title: 'Mach aus deiner Angular-App eine PWA'
description: 'Immer häufiger stößt man im Webumfeld auf den Begriff der Progessive Web App – kurz: PWA. Doch was genau steckt dahinter und welche Vorteile hat eine PWA gegenüber einer herkömmlichen Webanwendung oder einer App?
Als Progressive Web App bezeichnen wir eine Webanwendung, die beim Aufruf einer Website als App auf einem lokalen Gerät installiert werden kann – zum Beispiel auf dem Telefon oder Tablet.
Die PWA lässt sich wie jede andere App nutzen, inklusive Push-Benachrichtigungen!'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
created: 2019-07-24
updated: 2019-07-24
publishedAt:
  name: angular-buch.com
  url: https://angular-buch.com/blog/2019-07-progressive-web-app
  logo: https://angular-buch.com/assets/img/brand-400.png
keywords:
  - PWA
  - Progressive Web App
  - Angular
  - Service Worker
  - Web App Manifest
  - Caching
  - Push Notification
language: de
thumbnail:
  header: images/blog/pwaheader.jpg
  card: images/blog/pwaheader-small.jpg
series: angular-pwa
---

<p>Immer häufiger stößt man im Webumfeld auf den Begriff der Progessive Web App – kurz: PWA. Doch was genau steckt dahinter und welche Vorteile hat eine PWA gegenüber einer herkömmlichen Webanwendung oder einer App?
Als <em>Progressive Web App</em> bezeichnen wir eine Webanwendung, die beim Aufruf einer Website als App auf einem lokalen Gerät installiert werden kann – zum Beispiel auf dem Telefon oder Tablet.
Die PWA lässt sich wie jede andere App nutzen, inklusive Push-Benachrichtigungen!</p><h2 id="webanwendung-vs-pwa-vs-app">Webanwendung vs. PWA vs. App</h2>
<p>Wir wollen zunächst den Begriff der PWA etwas konkreter einordnen. Dazu schauen wir uns den Unterschied einer PWA im Vergleich zu einer herkömmlichen Webanwendung und einer App an.
Mithilfe einer Webanwendung kann ein Nutzer über eine URL im Browser Informationen abrufen und verarbeiten. Eine App erfüllt einen ähnlichen Zweck, wird allerdings auf einem Gerät lokal installiert und benötigt in der Regel keinen Browser zur Informationsverarbeitung. Weiterhin kann eine App prinzipiell auch offline genutzt werden, und sie hat oft Zugriff auf native Funktionen des Geräts: Push Notifications und Zugriff auf das Dateisystem sowie Kamera und Sensorik. Eine PWA stellt nun eine Art Mix von beidem dar: Es handelt sich grundlegend auch um eine Webanwendung, sie wird allerdings durch den Nutzer heruntergeladen und auf dem lokalen Gerät gespeichert. Weiterhin sorgt eine PWA dafür, dass die wichtigsten Daten im Client gecacht werden. Somit bleiben Informationen, die die Anwendung liefert, stets abrufbar – auch wenn ggf. keine durchgängige Internetverbindung vorhanden ist. Außerdem kann eine PWA auch Push Notifications erhalten und anzeigen.</p><p>Die drei wichtigsten Charakteristiken einer PWA sind also folgende:</p><ul>
<li>&quot;Add to Homescreen&quot;-Funktionalität</li>
<li>Offline-Fähigkeit</li>
<li>Push Notifications</li>
</ul>
<h3 id="service-worker">Service Worker</h3>
<p>Als Grundvoraussetzung, um eine PWA offlinefähig zu machen und Push-Benachrichtigungen zu versenden, werden die sogenannten <em>Service Worker</em> benötigt. Service Worker sind gewissermaßen kleine Helfer des Browsers, die bestimmte Aufgaben im Hintergrund übernehmen.
Hierzu zählen das Speichern und Abrufen der Daten auf einem Endgerät. Service Worker prüfen beispielsweise, ob eine Netzwerkverbindung besteht, und senden  – je nach Konfiguration – Daten aus dem Cache an die Anwendung, oder versuchen, die Daten online abzurufen.
Eine weitere Aufgabe ist das Empfangen von Push-Benachrichtigungen vom Server.</p><h3 id="eine-bestehende-angular-anwendung-in-eine-pwa-verwandeln">Eine bestehende Angular-Anwendung in eine PWA verwandeln</h3>
<p>Schauen wir uns das Ganze an einem Beispiel an.
Wie wollen das <a href="https://book-monkey3.angular-buch.com">Beispielprojekt BookMonkey</a> aus dem Angular-Buch in eine PWA verwandeln. Somit können Nutzer die App auf ihrem Gerät installieren und erhalten stets Buchdaten, auch wenn gerade keine Netzwerkkonnektivität vorhanden ist. Zunächst klonen wir uns hierfür die bestehende Webanwendung in ein lokales Repository:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">git</span><span style="color:#9ECBFF"> clone</span><span style="color:#9ECBFF"> git@github.com:book-monkey3/iteration-7-i18n.git</span><span style="color:#9ECBFF"> BookMonkey-PWA</span></span>
<span class="line"><span style="color:#79B8FF">cd</span><span style="color:#9ECBFF"> BookMonkey-PWA</span></span></code></pre>
<p>Als Nächstes fügen wir das Paket <code>@angular/pwa</code> mithilfe von <code>ng add</code> zum Projekt hinzu.
Die dahinterliegenden Schematics nehmen uns bereits einen Großteil der Arbeit zum Erzeugen der PWA ab:</p><ul>
<li>Hinzufügen des Pakets <code>@angular/service-worker</code> zu unserem Projekt</li>
<li>Aktivieren des Build Support für Service Worker in der Angular CLI</li>
<li>Importieren und Registrieren des <code>ServiceWorkerModule</code> im <code>AppModule</code></li>
<li>Update der Datei <code>index.html</code> mit einem Link zum Web App Manifest (<code>manifest.json</code>) sowie Hinzufügen relevanter Meta-Tags</li>
<li>Erzeugen und Verlinken von Icon-Dateien</li>
<li>Erzeugen der Konfigurationsdatei <code>ngsw-config.json</code> für den Service Worker</li>
</ul>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> add</span><span style="color:#9ECBFF"> @angular/pwa</span><span style="color:#79B8FF"> --project</span><span style="color:#9ECBFF"> BookMonkey</span></span></code></pre>
<p>Soweit so gut – das wichtigste ist bereits erledigt. Wir können jetzt schon unsere Anwendung in Form einer PWA erzeugen und nutzen.
Wichtig ist, dass die Anwendung immer im Produktivmodus gebaut wird, denn der Service Worker ist im Entwicklungsmodus nicht aktiv.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> build</span><span style="color:#79B8FF"> --prod</span></span></code></pre>
<p>Nach dem Build der Anwendung wollen wir uns das Ergebnis im Browser ansehen. Dafür können wir das Paket <code>angular-http-server</code> nutzen, das einen einfachen Webserver bereitstellt.</p><blockquote>
<p>Der <code>angular-http-server</code> leitet im Gegensatz zum <code>http-server</code> alle Anfragen zu nicht existierenden Verzeichnissen oder Dateien an die Datei <code>index.html</code> weiter.
Dies ist notwendig, da das Routing durch Angular und nicht durch den Webserver durchgeführt wird.</p></blockquote>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npm</span><span style="color:#9ECBFF"> i</span><span style="color:#9ECBFF"> angular-http-server</span><span style="color:#79B8FF"> --save-dev</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> angular-http-server</span><span style="color:#79B8FF"> --path=dist/BookMonkey</span></span></code></pre>
<p>Um nun zu testen, ob wir tatsächlich eine PWA erhalten haben, rufen wir am besten die Google Chrome Developer Tools auf. Dort können wir im Tab <em>Network</em> die Checkbox <em>Offline</em> setzen.
Anschließend laden wir die Seite neu.
Wir sehen, dass trotz des Offline-Modus die Startseite unserer App angezeigt wird, da der Service Worker ein Caching erwirkt hat.
Navigieren wir allerdings zur Buchliste, so können keine Bücher angezeigt werden.</p><p><img src="images/blog/bm-pwa-offline.png" alt="Screenshot BookMonkey PWA, Offline-Modus in den Google Chrome Developer Tools aktivieren"></p><blockquote>
<p>Achtung: Die PWA verwendet Service Worker. Diese können ausschließlich über gesicherte Verbindungen mit HTTPS oder über eine <code>localhost</code>-Verbindung genutzt werden. Rufen Sie die App, die mittels <code>angular-http-server</code> ohne SSL ausgeliefert wird, also über ein anderes Gerät auf, so werden die Service Worker nicht wie gewünscht funktionieren.</p></blockquote>
<h2 id="add-to-homescreen">Add to Homescreen</h2>
<p>Prinzipiell kann jede Website unter Android oder iOS zum Homescreen hinzugefügt werden.
Sie erhält dann ein eigenes App-Icon erhält und sieht zunächst schon wie eine native App aus.
Unter iOS wird hierfür der Safari-Browser benötigt.
Im Safari kann über den Button <em>Teilen</em> (kleines Rechteck mit einem Pfeil nach oben) ein Menü geöffnet werden, in dem die Auswahl &quot;Zum Home-Bildschirm&quot; zu finden ist.
Nach Bestätigung des Dialogfelds wird eine Verknüfung auf dem Homescreen angelegt.
Aber: Haben wir hier noch keine speziellen Icons hinterlegt, wird ggf. nur eine Miniatur der Website als Icon angezeigt.</p><h3 id="das-web-app-manifest-anpassen-manifestjson">Das Web App Manifest anpassen (<code>manifest.json</code>)</h3>
<p>Das Web App Manifest ist eine JSON-Datei, die dem Browser mitteilt, wie sich die Anwendung verhalten soll, wenn Sie installiert wird. Hier wird beispielsweise eine Hintergrundfarbe für die Menüleiste auf den nativen Endgeräten hinterlegt, und es werden die Pfade zu hinterlegten Icons angegeben.</p><p>Wir wollen die Standard-Datei, die von den PWA Schematics generiert wurde, noch etwas anpassen. Um dies nicht händisch zu tun, verwenden wir am besten einen Generator wie den <a href="https://app-manifest.firebaseapp.com/">Web App Manifest Generator</a>.
Hierbei sollten wir bei der Einstellung <em>Display Mode</em> die Auswahl <em>Standalone</em> nutzen, da wir eine eigenständige App erhalten wollen, die nicht als Browser erkennbar ist.
Wollen wir das Standard-Icon ändern, laden wir hier einfach ein Bild hoch und lassen die zugehörigen Bilder erzeugen. Nach dem Entpacken der ZIP-Datei speichern wir die Icons in unserem Projekt unter <code>src/assets/icons</code> ab. Anschließend sollten wir noch einmal die Pfade in der Datei <code>manifest.json</code> prüfen.</p><p><img src="images/blog/web-app-manifest-generator.png" alt="Screenshot Web App Manifest Generator"></p><h3 id="anpassungen-für-ios-indexhtml">Anpassungen für iOS (<code>index.html</code>)</h3>
<p>Wollen wir unsere PWA unter iOS installieren, sind noch einige Anpassungen an der Datei <code>index.html</code> notwendig.
iOS-Geräte benötigen spezielle <code>meta</code>- und <code>link</code>-Tags zur Identifizierung der zugehörigen Icons, denn sie extrahieren diese Informationen nicht aus dem Web-Manifest.</p><p>Um das Icon für den Homescreen zu definieren, müssen die folgenden Zeilen in die Datei <code>index.html</code> eingefügt werden:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">head</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  ...</span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-icon"</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/icons/icon-512x512.png"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-icon"</span><span style="color:#B392F0"> sizes</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"152x152"</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/icons/icon-152x152.png"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">head</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Wir geben den entsprechenden Pfad zum genutzten Icon an. Über das Attribut <code>sizes</code> können wir Icons mit bestimmten Größen hinterlegen. Weitere gängige Größen für iOS sind z. B. <code>180x180</code> und <code>167x167</code>.</p><p>Weiterhin können wir über die <code>link</code>-Tags für iOS ein Splashscreen-Bild hinterlegen. Dieses wird angezeigt, sobald wir die App vom Homescreen aus starten.
Auch hierfür existiert ein Generator, der uns die Bilder in den entsprechenden Größen erzeugt und und die generierten <code>link</code>-Tags anzeigt: <a href="https://appsco.pe/developer/splash-screens/">iOS Splash Screen Generator</a>.</p><p>Anschließend fügen wir die Tags ebenfalls in die <code>index.html</code> ein. Wir müssen an dieser Stelle noch den Pfad zu den Bildern so anpassen, dass er korrekt auf die tatsächlichen Dateien zeigt.
Die erste Zeile teilt iOS-Geräten mit, dass die Webanwendung als App genutzt werden kann. Nur wenn diese Zeile in der <code>index.html</code> angegeben wurde, liest das iOS-Gerät den <code>link</code>-Tag mit der Angabe zum Splashscreen aus.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">head</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#6A737D">  &#x3C;!-- ... --></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">meta</span><span style="color:#B392F0"> name</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"mobile-web-app-capable"</span><span style="color:#B392F0"> content</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"yes"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#6A737D">  &#x3C;!-- ... --></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/iphone5_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/iphone6_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/iphoneplus_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/iphonex_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/iphonexr_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/iphonexsmax_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/ipad_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/ipadpro1_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/ipadpro3_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">link</span><span style="color:#B392F0"> href</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"assets/splashscreens/ipadpro2_splash.png"</span><span style="color:#B392F0"> media</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"</span><span style="color:#B392F0"> rel</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-touch-startup-image"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">head</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Als Letztes haben wir noch die Möglichkeit, die Statusbar der App hinsichtlich ihrer Farbe anzupassen. Dazu führen wir das folgende Metatag zur <code>index.html</code> hinzu.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">head</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#6A737D">  &#x3C;!-- ... --></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">meta</span><span style="color:#B392F0"> name</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"apple-mobile-web-app-status-bar-style"</span><span style="color:#B392F0"> content</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"black"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#6A737D">  &#x3C;!-- ... --></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">head</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Wir können als Wert für <code>content</code> zwischen den folgenden Einstellungen wählen:</p><table>
<thead>
<tr>
<th></th>
<th>Text- und Iconfarbe</th>
<th>Hintergrundfarbe</th>
</tr>
</thead>
<tbody><tr>
<td><code>default</code></td>
<td>Schwarz</td>
<td>Weiß</td>
</tr>
<tr>
<td><code>white</code></td>
<td>Schwarz</td>
<td>Weiß</td>
</tr>
<tr>
<td><code>black</code></td>
<td>Weiß</td>
<td>Schwarz</td>
</tr>
<tr>
<td><code>black-translucent</code></td>
<td>Weiß</td>
<td>Hintergrundfarbe der App (<code>body</code>-Element)</td>
</tr>
</tbody></table>
<p>Wir schauen uns das Ergebnis nun im Safari-Browser unter iOS an. Nach dem Öffnen der Seite können wir diese über die Funktion &quot;Add to Homescreen&quot; auf dem Apple-Gerät speichern.
Wir sehen, dass die App die korrekten Icons nutzt und uns nach der Installation und dem Start zunächst kurz den Splashscreen zeigt, bevor die App vollflächig dargestellt wird. Die Statusbar ist in unserem Fall Schwarz, wie zuvor angegeben.</p><p><img src="images/blog/bm-pwa-ios-homescreen-splashscreen-start.png" alt="Der BookMonkey als PWA mit Splashscreen unter iOS"></p><h2 id="offline-funktionalität">Offline-Funktionalität</h2>
<p>Die Anwendung verhält sich nun wie eine normale Webanwendung. Um mehr das Gefühl einer nativen App zu erzeugen, betrachten wir als Nächstes die Offline-Fähigkeit der App.</p><h3 id="konfiguration-für-angular-service-worker-anpassen-ngsw-configjson">Konfiguration für Angular Service Worker anpassen (<code>ngsw-config.json</code>)</h3>
<p>Der Angular Service Worker besitzt die Konfigurationsdatei <code>ngsw-config.json</code>
.
Hier wird definiert, welche Ressourcen und Pfade gecacht werden sollen und welche Strategie hierfür verwendet wird.
Eine ausführliche Beschreibung der einzelnen Parameter finden Sie in der offiziellen Dokumentation auf <a href="https://angular.io/guide/service-worker-config">angular.io</a>.</p><p>Die beiden großen Blöcke der Konfiguration sind die <code>assetGroups</code> und die <code>dataGroup</code>. Im Array <code>assetGroups</code> ist die Konfiguration zu Ressourcen enthalten, die zur App selbst gehören. Hierzu zählen zum Beispiel statische Bilder, CSS-Stylesheets, Third-Party-Ressourcen, die von CDNs geladen werden etc.
Das Array <code>dataGroup</code>, beinhaltet Ressourcen, die nicht zur App selbst gehören, zum Beispiel API-Aufrufe und andere Daten-Abhängigkeiten.</p><p>Wir wollen bei unserer Beispielanwendung zunächst erwirken, dass die Antworten von der HTTP-API gecacht werden: die Liste der Bücher, bereits angesehene einzelne Bücher und auch die Suchresultate.
Diese Ergebnisse können dann also auch angezeigt werden, wenn keine Netzwerkverbindung besteht.
Dazu passen wir die Datei <code>ngsw-config.json</code> an und erweitern diese wie folgt:</p><blockquote>
<p>Achtung! Wenn Sie Änderungen am Quellcode durchführen, werden Ihnen ggf. beim Aktualisieren der Anwendung im Browser alte (gecachte) Daten angezeigt. Sie sollten deshalb während der Entwicklung stets einen neuen Incognito-Tab im Browser nutzen. Schließen Sie den Tab und laden die Anwendung neu, erhalten Sie eine &quot;frische&quot; Anwendung. Achten Sie auch darauf, dass in den Google Chrome Developer Tools die Option <em>Disable Cache</em> deaktiviert ist.</p></blockquote>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#79B8FF">  "$schema"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./node_modules/@angular/service-worker/config/schema.json"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "index"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"/index.html"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "assetGroups"</span><span style="color:#E1E4E8">: [ </span><span style="color:#6A737D">/* ... */</span><span style="color:#E1E4E8"> ],</span></span>
<span class="line"><span style="color:#79B8FF">  "dataGroups"</span><span style="color:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#79B8FF">      "name"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Books"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "urls"</span><span style="color:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#9ECBFF">        "/secure/books"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">        "/secure/books/search/**"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#9ECBFF">        "/secure/book/**"</span></span>
<span class="line"><span style="color:#E1E4E8">      ],</span></span>
<span class="line"><span style="color:#79B8FF">      "cacheConfig"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">        "strategy"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"freshness"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">        "maxSize"</span><span style="color:#E1E4E8">: </span><span style="color:#79B8FF">50</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">        "maxAge"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"1d2h"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">        "timeout"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"3s"</span></span>
<span class="line"><span style="color:#E1E4E8">      }</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">  ]</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Wir verwenden an dieser Stelle den Block <code>dataGroups</code>, da unsere Buchdatenbank keine statischen Daten enthält, die direkt zur App gehören.
Dem neuen Abschnitt in <code>dataGroups</code> geben wir die selbst festgelegte Bezeichnung <code>Books</code>. Wir definieren damit, dass alle Aufrufe unter <code>/secure/books</code> vom Service Worker behandelt werden sollen. Dasselbe gilt auch für alle anderen definierten Pfade zur HTTP-API.
Im letzten Schritt definieren wir das Verhalten des Caches. Wir wollen hier die Strategie <code>freshness</code> verwenden: Sie besagt, dass idealerweise die aktuellen Daten abgerufen werden, bevor sie aus dem Cache bezogen werden.
Erhalten wir jedoch ein Netzwerk-Timeout nach Ablauf der definierten Zeit im Parameter <code>timeout</code>, werden die zuletzt gecachten Daten ausgeliefert. Die Strategie eignet sich vor allem für dynamische Daten, die über eine API bezogen werden, und die möglichst immer im aktuellen Stand repräsentiert werden sollen.
Die Option <code>maxSize</code> definiert die maximale Anzahl von Einträgen im Cache. <code>maxAge</code> gibt die maximale Gültigkeit der Daten im Cache an, in unserem Fall sollen die Daten einen Tag und 2 Stunden gültig sein.</p><p>Eine zweite mögliche Strategie für den Cache ist die Einstellung <code>performance</code>. Diese liefert immer zunächst die Daten aus dem Cache, solange diese gültig sind.
Erst wenn der <code>timeout</code> abläuft, werden die Daten im Cache aktualisiert. Diese Strategie eignet sich für Daten, die nicht sehr oft geändert werden müssen oder bei denen eine hohe Aktualität keine große Relevanz hat.</p><p>Schauen wir uns nun wieder unsere Anwendung an und deaktivieren die Netzwerkverbindung nach dem erstmaligen Abrufen der Buchliste, so sehen wir, dass weiterhin Buchdaten angezeigt werden, wenn wir die Anwendung neu laden oder in ihr navigieren.</p><h3 id="die-pwa-updaten">Die PWA updaten</h3>
<p>Ein Service Worker wird automatisch im Browser installiert und ist dort aktiv.
Stellt der Server eine neue Version zur Verfügung, so muss der Service Worker im Browser aktualisiert werden.
Solche Updates werden in Angular über den Service <code>SwUpdate</code> behandelt. Dieser liefert uns Informationen über ein verfügbares bzw. durchgeführtes Update, auf die wir reagieren können. In der Regel werden Service Worker im Hintergrund geupdatet und die Nutzer bekommen davon nichts mit.
Es kann jedoch hilfreich sein, dem Nutzer mitzuteilen, dass ein Update vorliegt, um beispielsweise über Neuerungen zu informieren.
Wir wollen genau diesen Fall implementieren.</p><p>Zunächst passen wir dafür die Datei <code>ngsw-config.json</code> an. Hier fügen wir den Abschnitt <code>appData</code> ein. Dieser kann Informationen wie eine Beschreibung, die Version und weitere Metadaten zur Anwendung enthalten. Wir wollen in diesem Abschnitt eine Versionsnummer sowie einen Changelog hinterlegen, den wir später bei einem Update den Nutzern anzeigen wollen.</p><blockquote>
<p>Achtung: Die Versionsnummer dient lediglich als Nutzerinformation. Hinter den Kulissen erfolgt jedoch ein Binärvergleich des erzeugten Service Workers aus der <code>ngsw-config.json</code>. Jede kleinste Änderung an der <code>ngsw-config.json</code> führt somit zu einem neuen Service Worker unabhängig von der von uns hinterlegten Versionsnummer.</p></blockquote>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#79B8FF">  "$schema"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"./node_modules/@angular/service-worker/config/schema.json"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "index"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"/index.html"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "appData"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "version"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"1.1.0"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "changelog"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"aktuelle Version"</span></span>
<span class="line"><span style="color:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Anschließend bauen wir die Anwendung (<code>ng build --prod</code>) und rufen sie im Browser auf – bis hierhin ist alles wie gehabt.
Nun wollen wir, dass der Nutzer über Änderungen informiert wird.
Dafür nutzen wir den Service <code>SwUpdate</code>. Er stellt das Observable <code>available</code> zur Verfügung, das wir abonnieren können.
Sobald ein neuer Service Worker verfügbar ist, wird dieses Event ausgelöst.
Wir können nun einen Confirm-Dialog anzeigen und den Nutzer fragen, ob ein Update durchgeführt werden soll.
Das Event aus dem Observable liefert uns außerdem die komplette Konfiguration von <code>appData</code> aus der <code>ngsw-config.json</code> in der aktuellen Version sowie in der neuen Version des Service Workers.
Bestätigt der Nutzer nun den Dialog mit <em>OK</em>, erfolgt ein Neuladen der Seite, was ein Update des Service Workers zur Folge hat.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { Component, OnInit } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/core'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { SwUpdate } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/service-worker'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">Component</span><span style="color:#E1E4E8">({ </span><span style="color:#6A737D">/* ... */</span><span style="color:#E1E4E8"> })</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppComponent</span><span style="color:#F97583"> implements</span><span style="color:#B392F0"> OnInit</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  constructor</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">private</span><span style="color:#FFAB70"> swUpdate</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SwUpdate</span><span style="color:#E1E4E8">) {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">  ngOnInit</span><span style="color:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#F97583">    if</span><span style="color:#E1E4E8"> (</span><span style="color:#79B8FF">this</span><span style="color:#E1E4E8">.swUpdate.isEnabled) {</span></span>
<span class="line"><span style="color:#79B8FF">      this</span><span style="color:#E1E4E8">.swUpdate.available.</span><span style="color:#B392F0">subscribe</span><span style="color:#E1E4E8">((</span><span style="color:#FFAB70">evt</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">        const</span><span style="color:#79B8FF"> updateApp</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> window.</span><span style="color:#B392F0">confirm</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">\`</span></span>
<span class="line"><span style="color:#9ECBFF">          Ein Update ist verfügbar (\${</span><span style="color:#E1E4E8">evt</span><span style="color:#9ECBFF">.</span><span style="color:#E1E4E8">current</span><span style="color:#9ECBFF">.</span><span style="color:#E1E4E8">appData</span><span style="color:#9ECBFF">[</span><span style="color:#9ECBFF">'version'</span><span style="color:#9ECBFF">]</span><span style="color:#9ECBFF">} => \${</span><span style="color:#E1E4E8">evt</span><span style="color:#9ECBFF">.</span><span style="color:#E1E4E8">available</span><span style="color:#9ECBFF">.</span><span style="color:#E1E4E8">appData</span><span style="color:#9ECBFF">[</span><span style="color:#9ECBFF">'version'</span><span style="color:#9ECBFF">]</span><span style="color:#9ECBFF">}).</span></span>
<span class="line"><span style="color:#9ECBFF">          Änderungen: \${</span><span style="color:#E1E4E8">evt</span><span style="color:#9ECBFF">.</span><span style="color:#E1E4E8">current</span><span style="color:#9ECBFF">.</span><span style="color:#E1E4E8">appData</span><span style="color:#9ECBFF">[</span><span style="color:#9ECBFF">'changelog'</span><span style="color:#9ECBFF">]</span><span style="color:#9ECBFF">}</span></span>
<span class="line"><span style="color:#9ECBFF">          Wollen Sie das Update jetzt installieren?</span></span>
<span class="line"><span style="color:#9ECBFF">        \`</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">        if</span><span style="color:#E1E4E8"> (updateApp) { window.location.</span><span style="color:#B392F0">reload</span><span style="color:#E1E4E8">(); }</span></span>
<span class="line"><span style="color:#E1E4E8">      });</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Um nun tatsächlich einen neuen Service Worker zu erhalten, müssen wir noch Änderungen an der <code>ngsw-config.json</code> vornehmen, damit nach dem Binärvergleich eine neue Version des Service Workers erzeugt wird. Wir ändern hier lediglich die Versionsnummer sowie das Changelog.</p><blockquote>
<p>An dieser Stelle sei nochmals angemerkt, dass die Versionsnummer keine tatsächliche Version des Service Workers darstellt. Wir könnten hier auch eine niedrigere Versionsnummer angeben, und es würde trotzdem ein Update des Service Workers erfolgen.</p></blockquote>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#79B8FF">  "appData"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "version"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"2.0.0"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "changelog"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"Caching bereits abgerufener Bücher"</span></span>
<span class="line"><span style="color:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Erzeugen wir die Anwendung neu und starten wieder den Webserver, so sehen wir, dass kurz nach dem Laden der Seite ein Hinweis zum Update erscheint. Bestätigen wir mit <em>OK</em>, wird die Seite neu geladen und es wird fortan der neu erzeugte Service Worker verwendet.</p><p><img src="images/blog/bm-pwa-update.png" alt="Screenshot Anzeige eines Updates der PWA"></p><h2 id="push-notifications">Push Notifications</h2>
<p>Zum Abschluss wollen wir uns noch der dritten wichtigen Charakteristik von PWAs widmen: den Push Notifications.
Diese ermöglichen es uns, vom Server aus Benachrichtigungen an Clients zu senden, die zuvor den Benachrichtigungsdienst aktiviert haben.
Push Notifications werden ebenfalls mithilfe von Service Workern implementiert.</p><p>Die nachfolgende Abbildung stellt den Ablauf von Push-Benachrichtigungen schematisch dar. Im ersten Schritt abonnieren ein oder mehrere Clients die Benachrichtigungen (1).
Anschließend soll in unserem Fall das Anlegen eines neuen Buchs auf dem Server (2) dazu führen, dass alle Abonnenten darüber benachrichtigt werden (3). In Schritt 4 wollen wir reagieren, wenn die Benachrichtigung angeklickt wird und wollen das neu angelegte Buch öffnen (4).</p><p><img src="images/blog/pwa-notification-flow.svg" alt="Flow: PWA Push Notifications"></p><p>Um Push-Benachrichtigungen vom Server an die Clients zu schicken, kommt die sogenannte <a href="https://developer.mozilla.org/en-US/docs/Web/API/Push_API">Push API</a> zum Einsatz, die moderne Browser nativ unterstützen.
Die Technologie wird auch <em>WebPush</em> genannt.</p><p>Wir legen als Erstes einen neuen Service an, der sich um die Push Notifications kümmern soll: <code>ng generate service web-notification</code>.
Das read-only Property <code>VAPID_PUBLIC_KEY</code> enthält den Public-Key der BookMonkey API. Dieser wird für die Kommunikation zwischen dem Service Worker und dem Server mit WebPush zwingend benötigt.</p><p>Angular stellt den Service <code>SwPush</code> zur Verfügung, der die native Funktionalität kapselt.
Über <code>isEnabled</code> greifen wir auf <code>SwPush</code> zu, und wir erhalten Aufschluss darüber, ob der verwendete Browser bzw. das genutzte Gerät grundsätzlich  Push Notifications unterstützt.
Die Methode <code>requestSubscription()</code> von <code>SwPush</code> fordert an, dass Push-Nachrichten im Browser aktiviert werden.
Dazu muss der Public-Key des Servers übermittelt werden.
Der Nutzer muss daraufhin im Browser bestätigen, dass die Anwendung Push-Nachrichten an das Gerät schicken darf.
Stimmt der Nutzer zu, wird die Methode <code>sendToServer()</code> mit dem zurückgelieferten Objekt vom Typ <code>PushSubscriptionJSON</code> aufgerufen.
Das Objekt enthält die notwendigen Abonnement-Daten, die der Server für die Speicherung und Adressierung der einzelnen Abonnenten benötigt.
Wir übermitteln das Objekt mit einem HTTP-POST-Request an den Server.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">// ...</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { HttpClient } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/common/http'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { SwPush } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> '@angular/service-worker'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">Injectable</span><span style="color:#E1E4E8">({ </span><span style="color:#6A737D">/* ... */</span><span style="color:#E1E4E8"> })</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> WebNotificationService</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">  readonly</span><span style="color:#FFAB70"> VAPID_PUBLIC_KEY</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'BGk2Rx3DEjXdRv9qP8aKrypFoNjISAZ54l-3V05xpPOV-5ZQJvVH9OB9Rz5Ug7H_qH6CEr40f4Pi3DpjzYLbfCA'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">  private</span><span style="color:#FFAB70"> baseUrl</span><span style="color:#F97583"> =</span><span style="color:#9ECBFF"> 'https://api3.angular-buch.com/notifications'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  constructor</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#F97583">    private</span><span style="color:#FFAB70"> http</span><span style="color:#F97583">:</span><span style="color:#B392F0"> HttpClient</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#F97583">    private</span><span style="color:#FFAB70"> swPush</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SwPush</span></span>
<span class="line"><span style="color:#E1E4E8">  ) { }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  get</span><span style="color:#B392F0"> isEnabled</span><span style="color:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.swPush.isEnabled;</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">  subscribeToNotifications</span><span style="color:#E1E4E8">()</span><span style="color:#F97583">:</span><span style="color:#B392F0"> Promise</span><span style="color:#E1E4E8">&#x3C;</span><span style="color:#79B8FF">any</span><span style="color:#E1E4E8">> {</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.swPush.</span><span style="color:#B392F0">requestSubscription</span><span style="color:#E1E4E8">({</span></span>
<span class="line"><span style="color:#E1E4E8">      serverPublicKey: </span><span style="color:#79B8FF">this</span><span style="color:#E1E4E8">.</span><span style="color:#79B8FF">VAPID_PUBLIC_KEY</span></span>
<span class="line"><span style="color:#E1E4E8">    })</span></span>
<span class="line"><span style="color:#E1E4E8">    .</span><span style="color:#B392F0">then</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">sub</span><span style="color:#F97583"> =></span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.</span><span style="color:#B392F0">sendToServer</span><span style="color:#E1E4E8">(sub))</span></span>
<span class="line"><span style="color:#E1E4E8">    .</span><span style="color:#B392F0">catch</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">err</span><span style="color:#F97583"> =></span><span style="color:#E1E4E8"> console.</span><span style="color:#B392F0">error</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'Could not subscribe to notifications'</span><span style="color:#E1E4E8">, err));</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  private</span><span style="color:#B392F0"> sendToServer</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">params</span><span style="color:#F97583">:</span><span style="color:#B392F0"> PushSubscriptionJSON</span><span style="color:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#79B8FF">    this</span><span style="color:#E1E4E8">.http.</span><span style="color:#B392F0">post</span><span style="color:#E1E4E8">(</span><span style="color:#79B8FF">this</span><span style="color:#E1E4E8">.baseUrl, params).</span><span style="color:#B392F0">subscribe</span><span style="color:#E1E4E8">();</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Im nächsten Schritt wollen wir den neuen Service einsetzen und navigieren dazu zurück in den Code der <code>app.component.ts</code>.
Wir legen das Property <code>permission</code> als Hilfe an, um den Nutzern später im Template den entsprechenden Status der Push Notifications anzuzeigen.
Über das globale Objekt <code>Notification.permission</code> erhalten wir vom Browser den Wert <code>default</code>, sofern noch keine Auswahl getroffen wurde, ob Benachrichtigungen durch den Nutzer genehmigt wurden.
Bestätigt ein Nutzer die Nachfrage, wird der Wert <code>granted</code> gesetzt. Bei Ablehnung erhalten wir den Wert <code>denied</code>.
Als initialen Wert verwenden wir <code>null</code> – derselbe Wert wird ebenso verwendet, wenn der Benachrichtigungsdienst nicht unterstützt wird.
Zum Abschluss benötigen wir noch eine Methode, mit der der initiale Request gestellt wird, die Push-Nachrichten zu aktivieren: <code>submitNotification()</code>. Die Methode soll beim Klick auf einen Button ausgeführt werden und nutzt den eben erstellen <code>WebNotificationService</code>.
Sobald der Nutzer eine Auswahl getroffen hat, wollen wir den Wert des Propertys <code>permission</code> updaten.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">// ...</span></span>
<span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { WebNotificationService } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> './shared/web-notification.service'</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">Component</span><span style="color:#E1E4E8">({</span><span style="color:#6A737D">/* ... */</span><span style="color:#E1E4E8">})</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> AppComponent</span><span style="color:#F97583"> implements</span><span style="color:#B392F0"> OnInit</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#FFAB70">  permission</span><span style="color:#F97583">:</span><span style="color:#B392F0"> NotificationPermission</span><span style="color:#F97583"> |</span><span style="color:#79B8FF"> null</span><span style="color:#F97583"> =</span><span style="color:#79B8FF"> null</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">  constructor</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#F97583">    private</span><span style="color:#FFAB70"> swUpdate</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SwUpdate</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#F97583">    private</span><span style="color:#FFAB70"> webNotificationService</span><span style="color:#F97583">:</span><span style="color:#B392F0"> WebNotificationService</span></span>
<span class="line"><span style="color:#E1E4E8">  ) {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">  ngOnInit</span><span style="color:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#6A737D">    // ...</span></span>
<span class="line"><span style="color:#79B8FF">    this</span><span style="color:#E1E4E8">.permission </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.webNotificationService.isEnabled </span><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Notification.permission </span><span style="color:#F97583">:</span><span style="color:#79B8FF"> null</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0">  submitNotification</span><span style="color:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#79B8FF">    this</span><span style="color:#E1E4E8">.webNotificationService.</span><span style="color:#B392F0">subscribeToNotifications</span><span style="color:#E1E4E8">()</span></span>
<span class="line"><span style="color:#E1E4E8">      .</span><span style="color:#B392F0">then</span><span style="color:#E1E4E8">(() </span><span style="color:#F97583">=></span><span style="color:#79B8FF"> this</span><span style="color:#E1E4E8">.permission </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> Notification.permission);</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Zum Schluss fehlen nur noch ein paar kleine Anpassungen am Template (<code>app.component.html</code>).
Hier wollen wir einen Menüpunkt mit einem Button im rechten Bereich der Menüleiste einfügen.
Der Button soll deaktiviert sein, sofern keine Push Notifications unterstützt werden (z. B. im Development-Modus von Angular oder wenn der genutzte Browser diese Funktion nicht unterstützt).
Wird die Funktion unterstützt, prüfen wir noch auf die drei Zustände <code>default</code>, <code>granted</code> und <code>denied</code>. Die <a href="https://semantic-ui.com/elements/button.html">CSS-Klassen von Semantic UI</a> sorgen für das entsprechende Styling.
Die CSS-Klasse <code>mini</code> im übergeordneten <code><div></code> macht das Menü etwas kleiner, sodass es auch auf dem Smartphone gut aussieht.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">div</span><span style="color:#B392F0"> class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ui mini menu"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic">  &#x3C;</span><span style="color:#E1E4E8">!-* ... --></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;</span><span style="color:#85E89D">div</span><span style="color:#B392F0"> class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"right menu"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;</span><span style="color:#85E89D">div</span><span style="color:#B392F0"> class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"item"</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">      &#x3C;</span><span style="color:#85E89D">div</span><span style="color:#B392F0"> class</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"ui button"</span></span>
<span class="line"><span style="color:#B392F0">        (click)</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"submitNotification()"</span></span>
<span class="line"><span style="color:#B392F0">        [ngClass]</span><span style="color:#E1E4E8">=</span><span style="color:#9ECBFF">"{</span></span>
<span class="line"><span style="color:#9ECBFF">          'disabled': !permission,</span></span>
<span class="line"><span style="color:#9ECBFF">          'default':  permission === 'default',</span></span>
<span class="line"><span style="color:#9ECBFF">          'positive': permission === 'granted',</span></span>
<span class="line"><span style="color:#9ECBFF">          'negative': permission === 'denied'</span></span>
<span class="line"><span style="color:#9ECBFF">        }"</span></span>
<span class="line"><span style="color:#E1E4E8">      >Benachrichtigungen&#x3C;/</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">    &#x3C;/</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">  &#x3C;/</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;/</span><span style="color:#85E89D">div</span><span style="color:#E1E4E8">></span></span>
<span class="line"><span style="color:#E1E4E8">&#x3C;</span><span style="color:#85E89D">router-outlet</span><span style="color:#E1E4E8">>&#x3C;/</span><span style="color:#85E89D">router-outlet</span><span style="color:#E1E4E8">></span></span></code></pre>
<p>Geschafft! Schauen wir uns nun das Resultat im Development-Modus an, sehen wir, dass der Button ausgegraut und nicht klickbar ist, da hier die Notifications nicht unterstützt werden.</p><p><img src="images/blog/pwa-notification-disabled.png" alt="Screenshot: PWA Push Notifications disabled"></p><p>Bauen wir die Anwendung hingegen im Production-Modus und starten den <code>angular-http-server</code>, so ist der Button klickbar und ist zunächst im Zustand <code>default</code>.
Klicken wir den Button an, fragt uns der Browser, ob wir Push Notifications aktivieren wollen.</p><p><img src="images/blog/pwa-notification-default.png" alt="Screenshot: PWA Access to Push Notifications default"></p><p>Wenn wir den Zugriff gewähren, wird der Button durch die CSS-Klasse <code>success</code> grün, und wir erhalten vom Server direkt eine erste Bestätigung, dass die Benachrichtigungen aktiviert wurden.</p><p><img src="images/blog/pwa-notification-success.png" alt="Screenshot: PWA Success Push Notification"></p><p><img src="images/blog/pwa-notification-granted.png" alt="Screenshot: PWA Access to Push Notifications granted"></p><p>Der API-Server unterstützt bereits WebPush: Wird nun ein neues Buch zur API hinzugefügt, erhalten wir eine Push-Benachrichtigung! Sie können das Feature ausprobieren, indem Sie entweder über die App selbst ein Buch hinzufügen, oder indem Sie die <a href="https://api3.angular-buch.com/swagger-ui/#/book/post_book">BookMonkey API</a> dafür nutzen.</p><p><img src="images/blog/pwa-notification-new-book.png" alt="Screenshot: PWA Push Notification bei einem neuen Buch"></p><p>Lehnen wir hingegen ab, Benachrichtigungen zu erhalten, so färbt sich der Button rot, und wir werden nicht über neue Bücher informiert.</p><p><img src="images/blog/pwa-notification-denied.png" alt="Screenshot: PWA Access to Push Notifications denied"></p><p>Unter iOS wird die Funktionalität nicht unterstützt, daher bleibt der Button ausgegraut:</p><table>
<thead>
<tr>
<th align="center">Screenshot Android</th>
<th align="center">Screenshot iOS</th>
</tr>
</thead>
<tbody><tr>
<td align="center"><img src="images/blog/pwa-notification-enabled-android.png" alt="Screenshot Android"> <small>Benachrichtigungen werden unterstützt</small></td>
<td align="center"><img src="images/blog/pwa-notification-not-enabled-ios.png" alt="Screenshot iOS">  <small>Benachrichtigungen werden nicht unterstützt</small></td>
</tr>
</tbody></table>
<h3 id="auf-die-push-notification-reagieren">Auf die Push Notification reagieren</h3>
<p>Wir wollen zum Abschluss noch einen Schritt weiter gehen und darauf reagieren, dass ein Nutzer auf die angezeigte Benachrichtigung klickt.
Hierfür stellt der Service <code>SwPush</code> das Observable <code>notificationClicks</code> zur Verfügung.
Mit der Benachrichtigung wird im Property <code>data</code> eine URL angegeben, die zur Seite des neu angelegten Buchs führt.
Wir wollen diese URL nutzen und ein neues Browser-Fenster mit der angegebenen URL öffen.</p><blockquote>
<p>Achtung: An dieser Stelle müssen wir <code>window.open()</code> nutzen und nicht den Angular-Router, da die Methode <code>notificationClicks()</code> im Service Worker aufgerufen wird und die Benachrichtigung ggf. erst erscheint, wenn wir die App bereits geschlossen haben.</p></blockquote>
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D">// ...</span></span>
<span class="line"><span style="color:#E1E4E8">@</span><span style="color:#B392F0">Injectable</span><span style="color:#E1E4E8">({ </span><span style="color:#6A737D">/* ... */</span><span style="color:#E1E4E8"> })</span></span>
<span class="line"><span style="color:#F97583">export</span><span style="color:#F97583"> class</span><span style="color:#B392F0"> WebNotificationService</span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#F97583">  constructor</span><span style="color:#E1E4E8">(</span></span>
<span class="line"><span style="color:#F97583">    private</span><span style="color:#FFAB70"> http</span><span style="color:#F97583">:</span><span style="color:#B392F0"> HttpClient</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#F97583">    private</span><span style="color:#FFAB70"> swPush</span><span style="color:#F97583">:</span><span style="color:#B392F0"> SwPush</span></span>
<span class="line"><span style="color:#E1E4E8">  ) {</span></span>
<span class="line"><span style="color:#79B8FF">    this</span><span style="color:#E1E4E8">.swPush.notificationClicks.</span><span style="color:#B392F0">subscribe</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">event</span><span style="color:#F97583"> =></span><span style="color:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#F97583">      const</span><span style="color:#79B8FF"> url</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> event.notification.data.url;</span></span>
<span class="line"><span style="color:#E1E4E8">      window.</span><span style="color:#B392F0">open</span><span style="color:#E1E4E8">(url, </span><span style="color:#9ECBFF">'_blank'</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#E1E4E8">    });</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Die Push Notifications aus dem Service Worker sind ein effektiver Weg, um die Aufmerksamkeit des Nutzers gezielt auf die Anwendung zu lenken.
Die Nachricht verhält sich wie eine native Benachrichtigung jeder anderen App.
Im Hintergrund wird die Technologie WebPush eingesetzt, die fest mit dem Angular-Service <code>SwPush</code> verdrahtet ist.
<code>SwPush</code> bietet also keine einfache Möglichkeit, eine Nachricht aus einer lokalen Quelle anzuzeigen.</p><h3 id="ein-blick-unter-die-haube-von-push-notifications">Ein Blick unter die Haube von Push Notifications</h3>
<p>Haben wir alle Teile korrekt implementiert, kann der Client Push-Nachrichten vom Server empfangen.
Wir wiederholen kurz dem Ablauf:
Der Client macht sich zunächst beim Server bekannt, indem er ein Objekt vom Typ <code>PushSubscription</code> an den Server übermittelt.
In unserem Beispiel haben wir dazu die Service-Methode <code>sendToServer()</code> verwendet.
Der Server speichert dieses Objekt und verwendet es, um Nachrichten an den registrieren Service Worker zu übermitteln.
So wird es ermöglicht, dass auch Nachrichten empfangen werden können, wenn die Anwendung geschlossen ist.</p><p>Aber wie funktioniert der Rückkanal vom Server zum Client?
Dazu schauen wir uns das automatisch generierte Objekt vom Typ <code>PushSubscription</code> einmal genauer an:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#79B8FF">  "endpoint"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"https://fcm.googleapis.com/fcm/send/erSmNAsF0ew:APA91bGfjlCRi8nIpG9fvxezt_2E0JcfJ0I_4gnm2M29JQ3kF3d_XxUqrlQatWNGotPtsW-M57vsLxhNz9vRz0IQr3KB50Dm2wjm7gAbVo1c00VpDv7-2JynXNGk1RqimZ-TfYzzAjdu"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "expirationTime"</span><span style="color:#E1E4E8">: </span><span style="color:#79B8FF">null</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">  "keys"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "p256dh"</span><span style="color:#E1E4E8">:</span><span style="color:#9ECBFF">"BO4BdhfvZ4bo3hh7NBJDb--OZWcQ37M0O8XZY6lJ67g3x7JvmzMJhz_w_EaEVKFLskkDccO3iKsXkxtlSromdzU"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">    "auth"</span><span style="color:#E1E4E8">:</span><span style="color:#9ECBFF">"IH-eOcRdlxZ8P8uLl-2e6g"</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Besonders interessant ist das Property <code>endpoint</code>: Der Browser übermittelt eine URL, über die der Server Nachrichten an den Client schicken kann.
Der Server sendet dazu lediglich einen HTTP-Request an diese URL.
Die Notwendigkeit der Verschlüsselung mit den VAPID-Keys wird hier noch einmal deutlicher.</p><p>Ebenso interessant ist, dass die Endpoint-URL aus dem Universum des Browserherstellers kommt.
Bitte behalten Sie diesen Punkt stets im Hinterkopf: Alle Push-Nachrichten werden immer durch einen fremden Server zum Client gebracht.</p><h2 id="zusammenfassung">Zusammenfassung</h2>
<p>Wie Sie sehen, gelingt der Einstieg in die Entwicklung von Progressive Web Apps ohne Probleme.
Dank der vorbereiteten Schematics können wir uns auf die eigentliche Implementierung von Features konzentrieren.
Dies war aber nur ein kleiner Einblick in Progressive Web Apps mit Angular.
Wer noch mehr zum Thema erfahren möchte, dem sei der Blogpost <a href="https://itnext.io/build-a-production-ready-pwa-with-angular-and-firebase-8f2a69824fcc">&quot;Build a production ready PWA with Angular and Firebase&quot;</a> von Önder Ceylan empfohlen.</p><p>Den vollständigen Quelltext aus diesem Artikel können Sie auf <a href="https://github.com/angular-buch/book-monkey3-pwa">auf GitHub</a> herunterladen.
Eine <strong>Demo des BookMonkey als PWA</strong> finden Sie unter der <a href="https://bm3-pwa.angular-buch.com">https://bm3-pwa.angular-buch.com</a> – probieren Sie die App am Besten auf Ihrem Smartphone aus!</p><p>Viel Spaß beim Programmieren!</p><hr>
<p><small><strong>Titelbild:</strong> Photo by rawpixel.com from Pexels, angepasst</small></p>`;export{e as default};
