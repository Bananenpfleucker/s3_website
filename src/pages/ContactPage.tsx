import { JSX } from "react";
import CardComponent from "../components/CardComponent";

/**
 * Displays the contact page.
 */
export default function ContactPage(): JSX.Element {
    return (
        <CardComponent title="Kontakt">
            <p>
                Bei Fragen oder Anmerkungen zur Webseite wenden Sie sich bitte an uns:
            </p>
            <p>
                Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften e. V. (AWMF)<br />
                Düsseldorf, Deutschland
            </p>
            <p>
                E-Mail: <a href="mailto:kontakt@beispiel.de">kontakt@beispiel.de</a><br />
                Telefon: +49 (0)123 456789
            </p>
            <p>
                Wir freuen uns über Ihre Nachricht!
            </p>
        </CardComponent>
    );
}
