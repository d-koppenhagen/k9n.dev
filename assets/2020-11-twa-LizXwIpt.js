const e=`---
title: 'Trusted Web Activitys (TWA) mit Angular'
description: 'Progressive Web Apps sind in den letzten Jahren immer populärer geworden. In diesem Blogpost werde ich Ihnen zeigen, wie Sie Ihre PWA auf einfachem Weg in den Google Play Store für Android bringen können, ohne eine echte Android-App mit Webview zu entwickeln, die lediglich eine Website aufruft.'
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
created: 2020-11-17
updated: 2020-11-17
publishedAt:
  name: angular-buch.com
  url: https://angular-buch.com/blog/2020-11-twa
  logo: https://angular-buch.com/assets/img/brand-400.png
keywords:
  - TWA
  - Trusted Web Activity
  - PWA
  - Progressive Web App
  - Angular
  - Android
  - Android Store
language: de
thumbnail:
  header: images/blog/twa/header-twa.jpg
  card: images/blog/twa/header-twa-small.jpg
series: angular-pwa
---

<p>Progressive Web Apps sind in den letzten Jahren immer populärer geworden.
Sie erlauben es uns, Webanwendungen auf dem Home-Bildschirm des Smartphones zu installieren und wie eine nativ installierte App zu benutzen.
Mit einer PWA können wir Daten mithilfe eines Service Workers cachen, um die Anwendung auch offline zu verwenden.
Weiterhin kann eine PWA im Hintergrund Push-Benachrichtigungen vom Server empfangen und anzeigen.</p><blockquote>
<p>Wenn Sie noch keine Erfahrung mit der Umsetzung einer Angular-App als PWA haben, schauen Sie sich unseren Blog-Post <a href="blog/2019-07-progressive-web-app"><em>&quot;Mach aus deiner Angular-App eine PWA&quot;</em></a> an oder werfen Sie einen Blick in unser <a href="angular-buch.com"><em>Angular-Buch</em></a>, wo wir dieses Thema detailliert erläutern.</p></blockquote>
<p>Nach der Entwicklung einer PWA bleibt jedoch eine Hürde bestehen: Nutzer der Anwendung müssen die URL kennen, über welche die PWA abrufbar ist und installiert werden kann.
Viele Smartphone-Nutzer sind jedoch einen anderen Weg gewohnt, um eine App zu installieren:
Sie suchen danach in einem App Store wie dem <em>Google Play Store</em> unter Android oder <em>App Store</em> unter iOS.</p><p>In diesem Blogpost wollen wir Ihnen zeigen, wie Sie Ihre PWA auf einfachem Weg in den Google Play Store für Android bringen können, ohne eine echte Android-App mit Webview zu entwickeln, die lediglich eine Website aufruft.</p><blockquote>
<p><strong>Zur Zeit gibt es noch keine Möglichkeit, PWAs in Apples App Store zu deployen.</strong></p></blockquote>
<h2 id="trusted-web-activities-vs-webview-integration">Trusted Web Activities vs. Webview-Integration</h2>
<p>Um PWAs als Android-App bereitzustellen, benötigen wir eine Art App-Wrapper, der schließlich die PWA aufruft und somit unsere Webanwendung darstellen kann.</p><p>In der Vergangenheit wurde dies oft durch Android-Apps umgesetzt, die lediglich einen sogenannten <a href="https://developer.android.com/reference/android/webkit/WebView"><em>WebView</em></a> integrieren.
Hinter diesem Feature versteckt sich ein integrierter Webbrowser in der Android-App, der lediglich den Inhalt der Website darstellt.
Dieser Weg funktioniert für eine Vielzahl von Websites, gerät jedoch an seine Grenzen, wenn es sich bei der Website um eine PWA handelt.
Der Grund: In einem Webview funktionieren die essenziellen Service Worker nicht.
Somit können wir Features wie die Offlinefähigkeit nicht einfach in die Anwendung integrieren.
Weiterhin birgt ein Webview ein gewisses Sicherheitsrisiko, weil lediglich die URL den Inhalt der Anwendung bestimmt und keinerlei Überprüfung des tatsächlichen Contents stattfindet.
Wird also beispielsweise eine Website <em>&quot;gekapert&quot;</em>, bekommt der Nutzer ggf. den Inhalt einer falschen Seite angezeigt.</p><p>Bei einer TWA hingegen wird die PWA lediglich so erweitert, dass sie als Android-App direkt deployt werden kann.
Über einen Sicherheitsschlüssel kann verifiziert werden, dass die aufgerufene URL zur App passt.</p><h2 id="twas-im-detail">TWAs im Detail</h2>
<p>Die Grundidee einer TWA ist schnell erklärt: Statt einer vollumfänglichen Android-App, die einen Browser implementiert und eine URL aufruft, wird bei einer TWA leidglich die PWA um eine App-Schicht erweitert, sodass sie im Google Play Store veröffentlicht werden kann.
Es muss also auch kein eingebetteter Browser in der App integriert werden, sondern es wird auf den vorhandenen Google Chrome Browser zurückgegriffen.
Voraussetzung hierfür ist, dass auf dem Android-Gerät die Version 72 oder höher von Google Chrome verfügbar ist.
Beim Öffnen der PWA wird Chrome mit der hinterlegten URL geöffnet, und es werden sämtliche UI-Elemente des Browsers ausgeblendet.
Im Prinzip passiert also genau das, was auch geschieht, wenn wir eine PWA über die Funktion <em>&quot;Add To Homescreen&quot;</em> auf Smartphone speichern, jedoch in Form einer App, die über den Google Play Store gefunden und installiert werden kann.
Somit bleiben Features wie Push-Benachrichtigungen, Hintergrundsynchronisierungen, Autofill bei Eingabeformularen, Media Source Extensions oder die Sharing API vollumfänglich erhalten.
Ein weiterer Vorteil einer solchen TWA ist, dass Session-Daten und der Cache im Google Chrome geteilt werden.
Haben wir uns also beispielsweise bei unserer Web-Anwendung zuvor im Browser angemeldet, so belibt die Anmeldung in der Android-App (TWA) bestehen.</p><p>Die Bezeichnung &quot;Trusted Web Activity&quot; lässt bereits darauf schließen: TWAs sind <em>trusted</em>, also vertraulich.
Durch eine spezielle Datei, die mit der Webanwendung ausgeliefert wird und die einen Fingerprint enthält, kann sichergestellt werden, dass die Anwendung vertrauenswürdig ist, und der Inhalt kann somit sicher geladen werden.</p><h2 id="eine-pwa-als-twa-in-den-android-store-bringen">Eine PWA als TWA in den Android Store bringen</h2>
<p>Genug der Theorie -- wir wollen nun erfahren, wie wir eine PWA im Android Store als TWA bereitstellen können.</p><p>Dafür müssen wir folgende Schritte durchführen:</p><ul>
<li>Einen Android Developer Account registieren</li>
<li>Die Android-App in der Google Play Console erstellen</li>
<li>Die App-Signatur erzeugen</li>
<li>Den App-Signaturschlüssel in der PWA hinterlegen</li>
<li>Die TWA mit der <em>Bubblewrap CLI</em> erzeugen</li>
<li>Die signierte App bauen</li>
<li>Die App über die Google Play Console veröffentlichen</li>
</ul>
<p>Wir wollen als Grundlage für dieses Beispiel die Angular-Anwendung <em>BookMonkey</em> aus dem Angular-Buch verwenden, die bereits als PWA vorliegt.
Möchten Sie die Schritte selbst nachvollziehen, können Sie die Anwendung über GitHub herunterladen:</p><p><a href="https://github.com/book-monkey4/book-monkey4-pwa">https://github.com/book-monkey4/book-monkey4-pwa</a></p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>git clone https://ng-buch.de/bm4-pwa.git</span></span></code></pre>
<p>Die Online-Version der PWA können Sie unter der folgenden URL abrufen:</p><p><a href="https://bm4-pwa.angular-buch.com/">https://bm4-pwa.angular-buch.com/</a></p><p>Weiterhin benötigen Sie für die Erstellung der TWA folgende Voraussetzungen auf dem Entwicklungssystem:</p><ul>
<li><a href="https://openjdk.java.net/install/">Java SDK 8.0</a></li>
<li><a href="https://developer.android.com/studio">Android SDK (vorzugsweise Android Studio inkl. SDK)</a></li>
<li><a href="https://nodejs.org">Node.js 10.0 oder höher</a></li>
</ul>
<h3 id="einen-android-developer-account-registrieren">Einen Android Developer Account registrieren</h3>
<blockquote>
<p>Sofern Sie bereits einen Account für die <em>Google Play Console</em> besitzen, können Sie diesen Schritt überspringen.</p></blockquote>
<p>Um eine App im Google Play Store einzustellen, benötigen wir zunächst einen Account für die <em>Google Play Console</em>.
Den Account können Sie über den folgenden Link registrieren:</p><p><a href="https://play.google.com/apps/publish/signup">https://play.google.com/apps/publish/signup</a></p><p>Bei der Registrierung wird eine einmalige Registrierungsgebühr in Höhe von 25 USD erhoben. Diese Gebühr gilt für sämtliche Apps, die Sie mit dem hinterlegten Google-Account registrieren wollen.</p><p><img src="images/blog/twa/play-register.png" alt="Google Play Console: Registrierung"></p><h3 id="die-android-app-in-der-google-play-console-erstellen">Die Android-App in der Google Play Console erstellen</h3>
<p>Nach der Registierungs müssen wir uns in der <a href="https://play.google.com/apps/publish"><em>Google Play Console</em> einloggen</a>.
Anschließend können wir über den Menüpunkt <em>&quot;Alle Apps&quot;</em> mit dem Button <em>&quot;App erstellen&quot;</em> eine neue Anwendung anlegen.
Hier legen wir den Namen der Anwendung, die Standardsprache, den Anwendungstypen (App oder Spiel) sowie den Preis der Anwendung fest.
Weiterhin müssen wir den Programmierrichtlinien für Entwickler sowie den Exportbestimmungen der USA zustimmen.</p><p><img src="images/blog/twa/play-create.png" alt="Google Play Console: Eine neue Anwendung erzeugen"></p><p>Danach gelangen wir zum Dashboard für die neue Android-App.
Hier arbeiten wir uns im folgenden durch die Ersteinrichtung der App durch.
Jeder abgeschlossene Punkt wird entsprechend in der Liste markiert.
Alle Einstellungen finden sich auch im Nachhinein links im Menü wieder und können auch noch später angepasst werden.</p><p><img src="images/blog/twa/play-after-create.png" alt="Google Play Console: Dashboard - Ersteinrichtung"></p><ul>
<li><strong>App-Zugriff</strong>: Hier hinterlegen Sie informationen, die darlegen, wie auf die App bei der Überprüfung vor der Freigabe im Google Play Store zugegriffen werden kann.
Benötigen die Tester z. B. einen speziellen Account oder Standort oder ist die Anwendung frei zugänglich?</li>
<li><strong>Anzeigen</strong>: An dieser Stelle geben Sie an, ob ihre App Werbung enthält oder nicht.</li>
<li><strong>Einstufung des Inhalts</strong>: Sie werden zu einem Fragebogen zur Überprüfung der Altersfreigaben geleitet, den Sie ausfüllen müssen.
Anschließend erhalten Sie eine Bewertung, die Ihnen die Alterseinstufung der Anwendung für verschiedene Länder angibt.</li>
<li><strong>Zielgruppe</strong>: An dieser Stelle geben Sie an, welche Zielgruppe (Altersgruppe) von ihrer Anwendung adressiert wird und ob die Anwendung auch für Kinder interessant ist.
Je nach Auswahl kann es sein, dass Sie zusätzlich eine Datenschutzerklärung hinterlegen müssen.</li>
<li><strong>App-Kategorie auswählen und Kontaktdaten angeben</strong>: Hier gelangen Sie zu den <em>Play Store Einstellungen</em>.
Sie legen hier die Kategorie der App fest in der sie später im Play Store auftauchen soll.
Weiterhin können Sie Tags vergeben und Sie müssen Kontaktdaten für den Store-Eintrag hinterlegen.</li>
<li><strong>Store-Eintrag einrichten</strong>: Dieser Punkt führt Sie zur Hauptkonfiguration des Eintrags für den Google Play Store.
Sie müssen hier eine kurze sowie eine vollständige Beschreibung der Anwendung, eine App Icon und Screenshots der Anwendung hinterlegen.</li>
</ul>
<p>Haben wir alle Punkte für die Ersteinrichtung abgeschlossen, verschwindet der Abschnitt auf unserem Dashboard und wir können uns der Bereitstellung der App widmen.
Dafür benötigen wir ein Release und eine App-Signatur.</p><h3 id="die-app-signatur-und-das-release-erzeugen">Die App-Signatur und das Release erzeugen</h3>
<p>Nach der Ersteinrichtung gilt es unsere App im Play Store bereitzustellen.
Befinden wir uns auf dem Dashboard, so wird uns eine Übersicht über verschiedene Möglichkeiten zur Veröffentlichung der Anwendung gezeigt.</p><p><img src="images/blog/twa/play-dashboard-release.png" alt="Google Play Console: Dashboard - App veröffentlichen"></p><p>Diese Wege repräsentieren die sogenannten <em>Tracks</em>.
Ein solcher Track kann verschiedene Ausprägungen haben:</p><ul>
<li><strong>Interner Test</strong>: Releases, die zum Test für einen bestimmten Personenkreis beispielsweise über einen Link bereitgestellt werden können</li>
<li><strong>Geschlossener Test</strong>: Releases, die nur bestimmten Personen zum Download als Vorab-Release (Alpha Release) zur Verfügung stehen.</li>
<li><strong>Offener Test</strong>: Releases, die für jeden Nutzer im Google Play Store bereitgestellt werden, aber als Vorab-Release (Beta Release) gekennzeichnet sind. Offene Tracks können auch auf eine bestimmte Anzahl von Nutzer begrenzt werden</li>
<li><strong>Vorregistrierung</strong>: Releases, deren Store-Eintrag bereits vor Veröffentlichung der Anwendung erstellt werden soll. Nutzer können sich bereits registrieren und erhalten eine Benachrichtigung, sobald die Anwendung verfügbar ist.</li>
<li><strong>Produktion</strong>: Releases, die für jeden Nutzer im Google Play Store bereitgestellt werden</li>
</ul>
<p>In unserem Szenario wollen wir unsere App direkt bis in den Google Play Store bringen, um zu verifizieren, dass diese auch tatsächlich von allen Nutzern gefunden und installiert werden kann.
Hierfür nutzen wir den Track für den offenen Test und erstellen ein Beta-Release.
Dafür klicken wir unter der Überschrift <em>&quot;Beliebigen Nutzern die Registrierung für das Testen deiner App bei Google Play erlauben&quot;</em> auf <em>&quot;Aufgaben einblenden&quot;</em>.
Hier klicken wir zunächst auf <em>&quot;Länder und Regionen auswählen&quot;</em>.</p><p><img src="images/blog/twa/play-dashboard-open-track.png" alt="Google Play Console: Dashboard - Einen offenen Track anlegen"></p><p>Wir gelangen nun in das Untermenü zur Erstellung eines offenen Test Tracks und legen die Länder fest, in denen unsere Anwendung im Google Play Store verfügbar sein soll.
Anschließend erstellen wir ein neues Release.</p><p>Im nächsten Schritt benötigen wir nun die App, die wir unter <em>&quot;App Bundles und APKs&quot;</em> hinterlegen müssen.
Damit diese App jedoch erzeugt und verifiziert werden kann, erzeugen wir zunächst unter dem Abschnitt <em>App-Signatur von Google Play</em> über den Button <em>&quot;Weiter&quot;</em> eine neue App Signatur.</p><p><img src="images/blog/twa/play-beta-sign.png" alt="Google Play Console: Offenes Testrelease erstellen"></p><h3 id="den-app-signaturschlüssel-in-der-pwa-hinterlegen">Den App-Signaturschlüssel in der PWA hinterlegen</h3>
<p>Wir verlassen zunächst wieder den Menüpunkt zur Erzeugung des Releases und gehen ins Menü <em>&quot;Einrichten&quot;</em> &gt; <em>&quot;App-Signatur&quot;</em>.
Hier kopieren wir uns den Fingerabdruck des SHA-256-Zertifikats in die Zwischenablage.</p><p><img src="images/blog/twa/play-signature.png" alt="Google Play Console: Kopieren des App-Signaturschlüssels"></p><p>Dieser Fingerabdruck stellt später sicher, dass beim Aufruf der PWA durch unsere TWA verifiziert werden kann, dass die Anwendung <em>trusted</em> ist, also von Google verifiziert.</p><p>Um den Fingerabdruck aufspüren zu können, müssen wir diesen über die spezielle Datei <code>assetlinks.json</code> bereitstellen.
Weiterhin muss die Datei und ihr Inhalt über die spezielle URL <code>https://my-app.com/.well-known/assetlinks.json</code> aufrufbar sein.</p><p>Dafür erzeugen wir in unserem Angular-Workspace ein neues Verzeichnis <code>.well-known</code> unter <code>src</code>.
Darin legen wir die Datei <code>assetlinks.json</code> mit dem folgenden Inhalt an:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">[</span></span>
<span class="line"><span style="color:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#79B8FF">    "relation"</span><span style="color:#E1E4E8">: [</span><span style="color:#9ECBFF">"delegate_permission/common.handle_all_urls"</span><span style="color:#E1E4E8">],</span></span>
<span class="line"><span style="color:#79B8FF">    "target"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">      "namespace"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"allfront"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "package_name"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"com.angular_buch.book_monkey4"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">      "sha256_cert_fingerprints"</span><span style="color:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#9ECBFF">        "D1:63:25:CE...A4:FF:79:C0"</span></span>
<span class="line"><span style="color:#E1E4E8">      ]</span></span>
<span class="line"><span style="color:#E1E4E8">    }</span></span>
<span class="line"><span style="color:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#E1E4E8">]</span></span></code></pre>
<p>Als <code>package_name</code> legen wir die Anwendungs-ID fest, die im Google Play Store eindeutig sein muss und genau auf eine App zeigt.
Die ID wird in der Regel aus einer Domain gebildet und rückwärts gelistet.
Sie muss mindestens einen Punkt enthalten, Zeichen hinter einem Punkt dürfen nur Buchstaben sein, und die gesamte ID darf lediglich Alphanumerische Zeichen enthalten.
Zeichen wie &quot;<code>-</code>&quot; sind nicht erlaubt.
Alle Regeln zur Definition einer validen ID können Sie der <a href="https://developer.android.com/studio/build/application-id">Android Entwicklerdokumentstion</a> entnehmen.</p><p>Unter <code>sha256_cert_fingerprints</code> müssen wir außerdem den kopierten App-Signaturschlüssel eintragen.</p><p>Jetzt müssen wir der Angular CLI noch beibringen, dass der URL-Pfad <code>/.well-known/assetlinks.json</code> nicht durch den Angular-Router behandelt und umgeleitet werden soll, sondern dass sich dahinter ein statisches Asset verbrigt, das direkt über die URL aufrufbar sein soll.</p><p>Dafür bearbeiten wir die Datei <code>angular.json</code>: Im Abschnitt <code>build</code> &gt; <code>options</code> ergänzen wir den Eintrag <code>assets</code>.
Dort geben wir an, dass alle Dateien unter <code>src/.well-known</code> über den relativen Pfad <code>/.well-known/</code> bereitgestellt werden sollen:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#79B8FF">  "projects"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">    "book-monkey"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6A737D">      // ...</span></span>
<span class="line"><span style="color:#79B8FF">      "architect"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#79B8FF">        "build"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6A737D">          // ...</span></span>
<span class="line"><span style="color:#79B8FF">          "options"</span><span style="color:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6A737D">            // ...</span></span>
<span class="line"><span style="color:#79B8FF">            "assets"</span><span style="color:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#6A737D">              // ...</span></span>
<span class="line"><span style="color:#E1E4E8">              {</span></span>
<span class="line"><span style="color:#79B8FF">                "glob"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"**/*"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">                "input"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"src/.well-known/"</span><span style="color:#E1E4E8">,</span></span>
<span class="line"><span style="color:#79B8FF">                "output"</span><span style="color:#E1E4E8">: </span><span style="color:#9ECBFF">"/.well-known/"</span></span>
<span class="line"><span style="color:#E1E4E8">              }</span></span>
<span class="line"><span style="color:#6A737D">              // ...</span></span>
<span class="line"><span style="color:#E1E4E8">            ],</span></span>
<span class="line"><span style="color:#6A737D">            // ...</span></span>
<span class="line"><span style="color:#E1E4E8">          },</span></span>
<span class="line"><span style="color:#6A737D">          // ...</span></span>
<span class="line"><span style="color:#E1E4E8">        },</span></span>
<span class="line"><span style="color:#6A737D">        // ...</span></span>
<span class="line"><span style="color:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#6A737D">      // ...</span></span>
<span class="line"><span style="color:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#6A737D">    // ...</span></span>
<span class="line"><span style="color:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#E1E4E8">}</span></span></code></pre>
<p>Wir überprüfen das Ergebnis am Besten, indem wir einen Produktiv-Build ausführen und einen einfachen Webserver starten:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">ng</span><span style="color:#9ECBFF"> build</span><span style="color:#79B8FF"> --prod</span></span>
<span class="line"><span style="color:#79B8FF">cd</span><span style="color:#9ECBFF"> dist/book-monkey</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> http-server</span></span></code></pre>
<p>Rufen wir nun die URL <code>http://localhost:8080/.well-known/assetlinks.json</code> im Browser auf, sehen wir, dass unsere Datei <code>assetlinks.json</code> dargestellt wird:</p><p><img src="images/blog/twa/assetlinks-browser.png" alt="Test der Auslieferung der Datei assetlinks.json im Browser"></p><p>War der Test erfolgreich, können wir unsere PWA deployen.
Wichtig ist, dass diese zwingend per <code>HTTPS</code> ausgeleifert werden muss.</p><blockquote>
<p>Achtung: Nutzen Sie beispielsweise GitHub Pages zur Auslieferung Ihrer Anwendung, so müssen Sie vor dem Deployment im <code>dist</code>-Verzeichnis (<code>dist/book-monkey</code>) eine Datei <code>_config.yml</code> mit dem Inhalt <code>include: [".well-known"]</code> anlegen, da alle Verzeichnisse beginnend mit &quot;<code>.</code>&quot; per Default <a href="https://github.com/keybase/keybase-issues/issues/366#issuecomment-38749201">von GitHub Pages ignoriert werden</a>. Diesen Schritt integrieren Sie am besten in Ihre Deployment-Pipeline.</p></blockquote>
<p>Überprüfen Sie nach dem Deployment am Besten noch einmal, ob Sie die URL <code>http://mydomain/.well-known/assetlinks.json</code> aufrufen können.
In unserem Fall wäre das: <a href="https://bm4-pwa.angular-buch.com/.well-known/assetlinks.json"><code>https://bm4-pwa.angular-buch.com/.well-known/assetlinks.json</code></a>.</p><h2 id="die-twa-mit-der-bubblewrap-cli-erzeugen">Die TWA mit der Bubblewrap CLI erzeugen</h2>
<p>Wir haben nun unsere PWA so vorbereitet, dass sie als TWA genutzt werden kann. Alle nötigen Vorbereitungen in der Google Play Console haben wir getroffen.
Als nächstes wollen wir die Android-App erstellen, die unsere PWA als TWA aufruft und als eigenständige App kapselt.</p><p>Hierfür nutzen wir die <a href="https://www.npmjs.com/package/@bubblewrap/cli"><em>Bubblewrap CLI</em></a>:
Wir können das Tool direkt als NPM-Paket über <code>npx</code> aufrufen und so die App erzeugen lassen.
Der interaktive Wizard führt uns durch das Setup:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">mkdir</span><span style="color:#9ECBFF"> monkey4-pwa-twa-wrapper</span></span>
<span class="line"><span style="color:#79B8FF">cd</span><span style="color:#9ECBFF"> monkey4-pwa-twa-wrapper</span></span>
<span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> @bubblewrap/cli</span><span style="color:#9ECBFF"> init</span><span style="color:#79B8FF"> --manifest</span><span style="color:#9ECBFF"> https://bm4-pwa.angular-buch.com/manifest.json</span></span></code></pre>
<p>Nutzen wir die Bubblewrap CLI zum ersten Mal, so werden wir in den ersten zwei Schritten nach den Verzeichnissen für das <a href="https://openjdk.java.net/">Java OpenJDK</a> und das <a href="https://developer.android.com/studio">AndroidSDK</a> gefragt.
Hier geben wir die Pfade zu den entsprechenden Verzeichnissen an.
Unter macOS lauten sie zum Beispiel:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Path to the JDK: /Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Path to the Android SDK: /Users/my-user/Library/Android/sdk</span></span></code></pre>
<blockquote>
<p>Diese Angaben werden für spätere Installationen in der Datei <code>~/.llama-pack/llama-pack-config.json</code> gespeichert und können bei Bedarf angepasst werden.</p></blockquote>
<p>Im nächsten Schritt liest die Bubblewrap CLI das Web App Manifest unserer PWA aus und stellt einige Fragen zu den Metadaten der App: Bezeichnung, hinterlegte Icons und Pfade.
Diese Einstellungen werden in der Regel schon korrekt ausgelesen und müssen nicht manuell angepasst werden:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">init</span><span style="color:#9ECBFF"> Fetching</span><span style="color:#9ECBFF"> Manifest:</span><span style="color:#9ECBFF">  https://bm4-pwa.angular-buch.com/manifest.json</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Domain being opened in the TWA: bm4-pwa.angular-buch.com</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Name of the application: BookMonkey 4 PWA</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Name to be shown on the Android Launcher: BookMonkey</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Color to be used </span><span style="color:#F97583">for</span><span style="color:#E1E4E8"> the status bar: </span><span style="color:#6A737D">#DB2828</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Color to be used </span><span style="color:#F97583">for</span><span style="color:#E1E4E8"> the splash screen background: </span><span style="color:#6A737D">#FAFAFA</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Relative path to open the TWA: /</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> URL to an image that is at least 512x512px: https://bm4-pwa.angular-buch.com/assets/icons/icon-512x512.png</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> URL to an image that is at least 512x512px to be used when generating maskable icons undefined</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Include app shortcuts</span><span style="color:#F97583">?</span></span>
<span class="line"><span style="color:#B392F0">  Yes</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Android Package Name (</span><span style="color:#B392F0">or</span><span style="color:#9ECBFF"> Application</span><span style="color:#9ECBFF"> ID</span><span style="color:#E1E4E8">): com.angular_buch.bm4_pwa.twa</span></span></code></pre>
<p>In der nächsten Abfrage müssen wir den Schlüssel zur Signierung der App angeben.
Haben wir hier noch keinen Schlüssel erzeugt, werden wir darauf hingewiesen und können einen neuen Schlüssel anlegen.
Dafür müssen wir einige Infos zum Ersteller des Schlüssels hinterlegen.
Außerdem müssen wir ein Passwort für den <em>Key Store</em> und eines für den einzelnen <em>Key</em> der Anwendung angeben.
Dieses benötigen wir später beim Build und beim Signieren der App erneut.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Location of the Signing Key: ./android.keystore</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Key name: android</span></span>
<span class="line"><span style="color:#79B8FF">...</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Signing Key could not be found at </span><span style="color:#9ECBFF">"./android.keystore"</span><span style="color:#E1E4E8">. Do you want to create one now</span><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Yes</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> First and Last names (</span><span style="color:#B392F0">eg:</span><span style="color:#9ECBFF"> John</span><span style="color:#9ECBFF"> Doe</span><span style="color:#E1E4E8">): John Doe</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Organizational Unit (</span><span style="color:#B392F0">eg:</span><span style="color:#9ECBFF"> Engineering</span><span style="color:#9ECBFF"> Dept</span><span style="color:#E1E4E8">): Engineering Dept</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Organization (</span><span style="color:#B392F0">eg:</span><span style="color:#9ECBFF"> Company</span><span style="color:#9ECBFF"> Name</span><span style="color:#E1E4E8">): My Company</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Country (</span><span style="color:#B392F0">2</span><span style="color:#9ECBFF"> letter</span><span style="color:#9ECBFF"> code</span><span style="color:#E1E4E8">): DE</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Password </span><span style="color:#F97583">for</span><span style="color:#E1E4E8"> the Key Store: [hidden]</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Password </span><span style="color:#F97583">for</span><span style="color:#E1E4E8"> the Key: [hidden]</span></span>
<span class="line"><span style="color:#B392F0">keytool</span><span style="color:#9ECBFF"> Signing</span><span style="color:#9ECBFF"> Key</span><span style="color:#9ECBFF"> created</span><span style="color:#9ECBFF"> successfully</span></span>
<span class="line"><span style="color:#B392F0">init</span></span>
<span class="line"><span style="color:#B392F0">init</span><span style="color:#9ECBFF"> Project</span><span style="color:#9ECBFF"> generated</span><span style="color:#9ECBFF"> successfully.</span><span style="color:#9ECBFF"> Build</span><span style="color:#9ECBFF"> it</span><span style="color:#9ECBFF"> by</span><span style="color:#9ECBFF"> running</span><span style="color:#9ECBFF"> "@bubblewrap/cli build"</span></span></code></pre>
<p>Im Ergebnis sollten wir folgende Dateistruktur erhalten:</p><p><img src="images/blog/twa/twa-bubblewrap.png" alt="Dateistruktur nach Erzeugung der TWA mithilfe der Bubblewrap CLI"></p><p>Prinzipiell sind wir damit auch schon fertig.
Wir müssen nun noch die fertige Android-App (<code>*.apk</code>-Datei) erzeugen.</p><p>Das Ergebnis der TWA-Generierung können Sie auch in folgendem Repository nachvollziehen:</p><p><a href="https://github.com/book-monkey4/book-monkey4-pwa-twa-wrapper">https://github.com/book-monkey4/book-monkey4-pwa-twa-wrapper</a></p><h2 id="die-signierte-app-bauen">Die signierte App bauen</h2>
<p>Wir können unsere signierte Android-App entwerder direkt mithilfe der Bubblewrap CLI bauen, oder wir nutzen hierfür Android Studio.</p><h3 id="mit-der-bublewrap-cli">Mit der Bublewrap CLI</h3>
<p>Wir rufen das <code>build</code>-Kommando der Bubblewrap CLI auf.
Hier müssen wir zunächst das von uns vergebene Passwort für den Key Store und anschließend das Passwort für den konkreten Key eingeben:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> @bubblewrap/cli</span><span style="color:#9ECBFF"> build</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> KeyStore password: </span><span style="color:#F97583">********</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Key password: </span><span style="color:#F97583">********</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Building</span><span style="color:#9ECBFF"> the</span><span style="color:#9ECBFF"> Android-App...</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Zip</span><span style="color:#9ECBFF"> Aligning...</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Checking</span><span style="color:#9ECBFF"> PWA</span><span style="color:#9ECBFF"> Quality</span><span style="color:#9ECBFF"> Criteria...</span></span>
<span class="line"><span style="color:#B392F0">build</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Check</span><span style="color:#9ECBFF"> the</span><span style="color:#9ECBFF"> full</span><span style="color:#9ECBFF"> PageSpeed</span><span style="color:#9ECBFF"> Insights</span><span style="color:#9ECBFF"> report</span><span style="color:#9ECBFF"> at:</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> -</span><span style="color:#9ECBFF"> https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fbm4-pwa.angular-buch.com%2F</span></span>
<span class="line"><span style="color:#B392F0">build</span></span>
<span class="line"><span style="color:#B392F0">build</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Quality</span><span style="color:#9ECBFF"> Criteria</span><span style="color:#9ECBFF"> scores</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Lighthouse</span><span style="color:#9ECBFF"> Performance</span><span style="color:#9ECBFF"> score:</span><span style="color:#9ECBFF"> ...................</span><span style="color:#79B8FF"> 80</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Lighthouse</span><span style="color:#9ECBFF"> PWA</span><span style="color:#9ECBFF"> check:</span><span style="color:#9ECBFF"> ...........................</span><span style="color:#9ECBFF"> NO</span></span>
<span class="line"><span style="color:#B392F0">build</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Web</span><span style="color:#9ECBFF"> Vitals</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Largest</span><span style="color:#9ECBFF"> Contentful</span><span style="color:#9ECBFF"> Paint</span><span style="color:#E1E4E8"> (LCP) .................. 3.7 s</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Maximum</span><span style="color:#9ECBFF"> Potential</span><span style="color:#9ECBFF"> First</span><span style="color:#9ECBFF"> Input</span><span style="color:#9ECBFF"> Delay</span><span style="color:#E1E4E8"> (Max </span><span style="color:#9ECBFF">FID</span><span style="color:#E1E4E8">) ... 391 ms</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Cumulative</span><span style="color:#9ECBFF"> Layout</span><span style="color:#9ECBFF"> Shift</span><span style="color:#E1E4E8"> (CLS) ................... 0.00</span></span>
<span class="line"><span style="color:#B392F0">build</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Other</span><span style="color:#9ECBFF"> scores</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Lighthouse</span><span style="color:#9ECBFF"> Accessibility</span><span style="color:#9ECBFF"> score...................</span><span style="color:#79B8FF"> 67</span></span>
<span class="line"><span style="color:#B392F0">build</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Summary</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Overall</span><span style="color:#9ECBFF"> result:</span><span style="color:#9ECBFF"> .................................</span><span style="color:#9ECBFF"> FAIL</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> WARNING</span><span style="color:#9ECBFF"> PWA</span><span style="color:#9ECBFF"> Quality</span><span style="color:#9ECBFF"> Criteria</span><span style="color:#9ECBFF"> check</span><span style="color:#9ECBFF"> failed.</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Signing...</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Signed</span><span style="color:#9ECBFF"> Android-App</span><span style="color:#9ECBFF"> generated</span><span style="color:#9ECBFF"> at</span><span style="color:#9ECBFF"> "./app-release-signed.apk"</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Digital</span><span style="color:#9ECBFF"> Asset</span><span style="color:#9ECBFF"> Links</span><span style="color:#9ECBFF"> file</span><span style="color:#9ECBFF"> generated</span><span style="color:#9ECBFF"> at</span><span style="color:#9ECBFF"> ./assetlinks.json</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Read</span><span style="color:#9ECBFF"> more</span><span style="color:#9ECBFF"> about</span><span style="color:#9ECBFF"> setting</span><span style="color:#9ECBFF"> up</span><span style="color:#9ECBFF"> Digital</span><span style="color:#9ECBFF"> Asset</span><span style="color:#9ECBFF"> Links</span><span style="color:#9ECBFF"> at</span><span style="color:#9ECBFF"> https://developers.google.com/web/android/trusted-web-activity/quick-start#creating-your-asset-link-file</span></span></code></pre>
<p>Wenn wir keinen Fehler erhalten, sollte sich die fertige signierte App im Hauptverzeichnis befinden und <code>app-release-signed.apk</code> heißen.</p><p>Vereinzelt kann es dazu kommen, dass wir eine Fehlermeldung wie die folgende erhalten:</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>UnhandledPromiseRejectionWarning: Error: Error calling the PageSpeed Insights API: Error: Failed to run the PageSpeed Insight report</span></span></code></pre>
<p>In diesem Fall schlägt die Analyse der App fehl, weil beispielsweise die Website gerade nicht erreichbar ist. Wir können den Build erneut aufrufen und das Flag <code>--skipPwaValidation</code> verwenden, um die Überprüfung der PWA zu überspringen.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">npx</span><span style="color:#9ECBFF"> @bubblewrap/cli</span><span style="color:#9ECBFF"> build</span><span style="color:#79B8FF"> --skipPwaValidation</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> KeyStore password: </span><span style="color:#F97583">********</span></span>
<span class="line"><span style="color:#F97583">?</span><span style="color:#E1E4E8"> Key password: </span><span style="color:#F97583">********</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Building</span><span style="color:#9ECBFF"> the</span><span style="color:#9ECBFF"> Android-App...</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Zip</span><span style="color:#9ECBFF"> Aligning...</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Signing...</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Signed</span><span style="color:#9ECBFF"> Android-App</span><span style="color:#9ECBFF"> generated</span><span style="color:#9ECBFF"> at</span><span style="color:#9ECBFF"> "./app-release-signed.apk"</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Digital</span><span style="color:#9ECBFF"> Asset</span><span style="color:#9ECBFF"> Links</span><span style="color:#9ECBFF"> file</span><span style="color:#9ECBFF"> generated</span><span style="color:#9ECBFF"> at</span><span style="color:#9ECBFF"> ./assetlinks.json</span></span>
<span class="line"><span style="color:#B392F0">build</span><span style="color:#9ECBFF"> Read</span><span style="color:#9ECBFF"> more</span><span style="color:#9ECBFF"> about</span><span style="color:#9ECBFF"> setting</span><span style="color:#9ECBFF"> up</span><span style="color:#9ECBFF"> Digital</span><span style="color:#9ECBFF"> Asset</span><span style="color:#9ECBFF"> Links</span><span style="color:#9ECBFF"> at</span><span style="color:#9ECBFF"> https://developers.google.com/web/android/trusted-web-activity/quick-start#creating-your-asset-link-file</span></span></code></pre>
<p>Kommt es zu dem nachfolgenden Fehler, prüfen Sie bitte den Pfad unter <code>jdkPath</code> in der Datei <code>~/.llama-pack/llama-pack-config.json</code>.
Dieser sollte auf das lokale Hauptverzeichnis des Java JDK 8 zeigen.
Alternativ können Sie den Build mithilfe von Android Studio anstoßen.</p><pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#B392F0">cli</span><span style="color:#9ECBFF"> ERROR</span><span style="color:#9ECBFF"> Command</span><span style="color:#9ECBFF"> failed:</span><span style="color:#9ECBFF"> ./gradlew</span><span style="color:#9ECBFF"> assembleRelease</span><span style="color:#79B8FF"> --stacktrace</span></span></code></pre>
<h3 id="mithilfe-von-android-studio">Mithilfe von Android Studio</h3>
<p>Bei dieser Variante öffnen wir zunächst das Projektverzeichnis in Android Studio.
Nun warten wir ab, bis der automatische Gradle-Build nach dem Öffnen des Projekts durchgelaufen ist.
Den Fortschritt können wir unten rechts in Android Studio betrachten.
Anschließend klicken wür im Menü <em>&quot;Build&quot;</em> auf <em>&quot;Generate Signed Bundle / APK&quot;</em>.</p><p><img src="images/blog/twa/android-studio-generate-signed-apk.png" alt="Android Studio: Signierte APK erstellen"></p><p>Wir wählen hier den Punkt <em>&quot;APK&quot;</em> aus und klicken auf <em>&quot;Next&quot;</em>.</p><p><img src="images/blog/twa/android-studio-generate-signed-apk2.png" alt="Android Studio: Signierte APK erstellen"></p><p>Im nächsten Schritt wählen wir den erstellten Keystore (<code>android.keystore</code>) aus dem Projektverzeichnis aus und geben das festgelegte Passwort ein.
Alternativ können wir auch einen neuen Keystore erstellen.
Anschließend können wir aus dem Keystore den <em>&quot;Key alias&quot;</em> auswählen (<code>android</code>).
Auch hier müssen wir das Passwort eingeben, das wir zuvor für den konkreten Key vergeben haben.
Haben wir alle Angaben korrekt getätigt, gehen wir weiter mit <em>&quot;Next&quot;</em>.</p><p><img src="images/blog/twa/android-studio-generate-signed-apk3.png" alt="Android Studio: Signierte APK erstellen"></p><p>Im nächsten Schritt wählen wir als Build-Variante <em>release</em> aus und setzen die beiden Checkboxen bei <em>&quot;V1 (Jar Signature)&quot;</em> und <em>&quot;V2 (Full APK Signature)&quot;</em>.
Anschließend können wir die Erzeugung mit <em>&quot;Finish&quot;</em> starten.</p><p><img src="images/blog/twa/android-studio-generate-signed-apk3.png" alt="Android Studio: Signierte APK erstellen"></p><p>Die erzeugte APK befindet sich nun unter <code>./app/release/app-release.apk</code>.</p><blockquote>
<p>Kommt es beim Erzeugen der signierten APK zu einem Fehler, kann dies ggf. an einem defekten/falschen Keystore liegen. Versuchen Sie in diesem Fall, einen neuen Keystore während der vorherigen Schritte zu erzeugen.</p></blockquote>
<h2 id="die-app-über-die-google-play-console-veröffentlichen">Die App über die Google Play Console veröffentlichen</h2>
<p>Im letzten Schritt müssen wir unsere signierte und erzeugte Android-App noch bereitstellen und veröffentlichen.
Dazu gehen wir in der Google Play Console in das Menü <em>&quot;Test&quot;</em> &gt; <em>&quot;Offene Tests&quot;</em> und öffnen unser zuvor bereits vorbereitetes Release im Abschnitt <em>&quot;Releases</em>&quot;, welches im Status <em>&quot;Entwurf&quot;</em> ist durch Klick auf den Button <em>&quot;Bearbeiten&quot;</em>.</p><p>Im nächsten Schritt können wir nun die zuvor erzeugte APK-Datei hochladen.
Weiterhin geben wir eine Versionsnummer und eine Beschreibung zum Release an.
Haben wir alles ausgefüllt, klicken wir auf <em>&quot;Überprüfen&quot;</em>.</p><p>Jetzt haben wir es fast geschafft:
Das Beta-Release wurde erstellt.
Auf der nächsten Seite können wir die App nun veröffentlichen.</p><p><img src="images/blog/twa/play-beta-release.png" alt="Google Play Console: Das Beta-Release veröffentlichen"></p><p>Haben wir diesen Schritt erledigt, ändert sich unser Menü auf der linken Seite ein wenig, und wir können unter <em>&quot;Übersicht&quot;</em> den aktuellen Status zur Veröffentlichung der Android-App einsehen.
Bis die App tatsächlich veröffentlicht und freigegeben wird, können ggf. ein paar Tage vergehen.</p><p><img src="images/blog/twa/play-release-overview.png" alt="Google Play Console: Übersicht mit Veröffentlichungsstatus"></p><p>Geschafft! Wir haben nun erfolgreich unsere Angular-PWA in eine Android-App integriert und sie im Google Play Store veröffentlicht.
Dabei haben wir das Konzept der Trusted Web Activity (TWA) genutzt.
Nun müssen wir nur noch auf die Freigabe warten, und wir können unsere App im Store finden und installieren.</p><p><strong>Viel Spaß wünschen
Johannes, Danny und Ferdinand</strong></p>`;export{e as default};
