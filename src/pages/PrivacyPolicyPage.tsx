import { JSX } from "react";
import CardComponent from "../components/CardComponent";

/**
 * Displays the privacy policy page.
 */
export default function PrivacyPolicyPage(): JSX.Element {
    return (
        <CardComponent title="Datenschutzerklärung">
            <p>
                Der Schutz Ihrer persönlichen Daten ist uns, dem Team von S3-Navigator, ein wichtiges Anliegen.
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h2>1. Allgemeine Hinweise</h2>
            <p>
                Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (z. B. Name, E-Mail-Adresse oder IP-Adresse) erhoben werden, erfolgt dies – soweit möglich – stets auf freiwilliger Basis.
                Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>

            <h2>2. Erhebung und Verarbeitung von Daten</h2>
            <p>
                Beim Besuch unserer Website werden durch den Webserver automatisch Daten erfasst, die technisch notwendig sind, um die Website anzuzeigen. Diese Informationen (sogenannte Server-Logfiles) beinhalten beispielsweise:
            </p>
            <ul>
                <li>Browsertyp und -version</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer-URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse (gekürzt und anonymisiert)</li>
            </ul>
            <p>
                Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                Die Verarbeitung erfolgt auf Grundlage unserer berechtigten Interessen zur Sicherstellung eines störungsfreien Betriebs sowie zur Verbesserung unseres Angebots.
            </p>

            <h2>3. Verwendung von Cookies</h2>
            <p>
                Unsere Website verwendet derzeit keine Cookies zur Benutzerverfolgung oder für Marketingzwecke.
                Sollte sich dies in Zukunft ändern, werden Sie beim ersten Besuch unserer Seite entsprechend informiert und um Ihre Zustimmung gebeten.
            </p>

            <h2>4. Weitergabe von Daten an Dritte</h2>
            <p>
                In keinem Fall werden die auf dieser Webseite erhobenen personenbezogenen Daten verkauft, vermietet oder aus anderen Gründen unbefugt an Dritte weitergegeben.
                Eine Übermittlung erfolgt nur, wenn Sie ausdrücklich eingewilligt haben oder wir gesetzlich dazu verpflichtet sind.
            </p>

            <h2>5. Ihre Rechte</h2>
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
            <ul>
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten (Recht auf Vergessenwerden)</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Widerspruch gegen die Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
            </ul>
            <p>
                Bitte wenden Sie sich hierzu jederzeit an uns über die im Impressum angegebenen Kontaktdaten.
            </p>

            <h2>6. Sicherheit</h2>
            <p>
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen.
                Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
            </p>

            <h2>7. Änderungen der Datenschutzerklärung</h2>
            <p>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren, um sie an geänderte rechtliche Anforderungen oder Änderungen unseres Angebots anzupassen.
                Für Ihren erneuten Besuch gilt dann die jeweils aktuelle Datenschutzerklärung.
            </p>
        </CardComponent>
    );
}
