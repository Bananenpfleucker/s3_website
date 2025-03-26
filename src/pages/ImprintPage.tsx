import { JSX } from "react";
import CardComponent from "../components/CardComponent";

/**
 * Displays the imprint (legal notice) page.
 */
export default function ImprintPage(): JSX.Element {
    return (
        <CardComponent title="Impressum">
            <p>
                Angaben gemäß § 5 TMG:
            </p>
            <p>
                Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften e. V. (AWMF)<br />
                Düsseldorf, Deutschland
            </p>
            <p>
                Vertreten durch den Vorstand.
            </p>
            <p>
                Kontakt: <br />
                E-Mail: kontakt@beispiel.de
            </p>
            <p>
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: <br />
                Max Mustermann
            </p>
        </CardComponent>
    );
}
