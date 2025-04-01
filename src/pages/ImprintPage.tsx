import { JSX } from "react";
import CardComponent from "../components/CardComponent";

/**
 * Displays the imprint (legal notice) page.
 */
export default function ImprintPage(): JSX.Element {
    return (
        <CardComponent>
             <h2 style={{ textAlign: "center" }}>Impressum</h2>

            <div className="center-text">
            <p>
                Angaben gemäß § 5 TMG:
            </p>
            <p>
                S3-Navigator<br />
                Max Mustermann<br />
                Musterstraße 123<br />
                12345 Musterstadt<br />
                Deutschland
            </p>
            <p>
                Kontakt:<br />
                E-Mail: kontakt@s3-navigator.de
            </p>
            <p>
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
                Max Mustermann<br />
                Adresse wie oben
            </p>
            <p>
                Hinweis: S3-Navigator ist ein privates, nicht-kommerzielles Projekt zur Übersicht über medizinische Leitlinien. Trotz sorgfältiger Recherche übernehmen wir keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der Inhalte.
            </p>
            </div>
        </CardComponent>
    );
}
