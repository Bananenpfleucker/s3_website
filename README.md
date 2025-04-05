# Web-Projekt für die AWMF

Die AWMF (Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften e. V.) ist ein Verein, der sich
unter anderem für die Haltung von Leitlinien einsetzt. Diese Leitlinien beschreiben Vorgänge und Kritieren zu unterschiedlichen,
medizinischen Eingriffe.

Die AWMF möchte - um die Verfügbarkeit dieser Leitlinien zu verstärken - ein neues, web-basiertes Portal entwickelt haben, welchen
Ärzten die Möglichkeit gibt, diese einzusehen. Da sich diese Leitlinien bis zu neunzig Seiten erstrecken, steht eine Kurzzusammenfassung
im Fokus, welche durch eine künstliche Intelligenz erfolgt.

## Vorschau

Um einen aktuellen Stand zur der Webseite zu gewinnen, drücke **[hier](https://bananenpfleucker.github.io/s3_website/)**.

## Ausführen

Nach dem ersten Herunterladen der Dateien von GitHub muss `npm install` ausgeführt werden.

Um die Webseite im Entwicklungszustand auszuführen, nutze `npm run dev` oder `npm start`.

Um das Projekt zu exportieren, nutze `npm run build`.
Die Dateien befinden sich im `dist`-Verzeichnis und werden nicht automatisch gepusht.

Um die Webseite direkt bereitzustellen, nutze `npm run github`.
Der aktuelle Stand muss im Zweig `preview` zusammengeführt und hochgeladen werden
(`checkout preview` → `merge develop` → `push`).

## Arbeitsauftrag

Im Zuge der neuen Zusammenfassung, soll ein neues Web-Projekt entwickelt werden.

Es soll eine neue Weboberfläche entwickelt werden, welche die neue Eigenschaften beherbergt. Die Seite sollte hierbei primär funktional sein,
soll aber auch eine selbsterklärende, intuitive Bedienung haben. Die Darstellung und der Stil soll weitestgehend dem des
[bisherigem Internetportals](https://register.awmf.org/de/start) entsprechen.

## technische Arbeitsaufgaben

⬛ nicht bearbeitet - 🟧 in Bearbeitung - 🟩 abgeschlossen - 🟪 Revision erforderlich

### Frontend

* 🟧 Hauptseite entwickelt
* 🟩 allgemeine, wesentliche Komponenten entwickelt (Kopf- und Fußzeile, ...)
* 🟩 sonstige Komponenten entwickelt 
* 🟩 statische Seiten eingepflegt (Datenschutz, Impressum, ...)
* 🟧 Suchfunktion entwickelt
* 🟩 Anzeige der Suchergebnisse entwickelt
* 🟧 Detailansicht entwickelt
* 🟩 allgemeine Darstellung und Stil entwickelt 
