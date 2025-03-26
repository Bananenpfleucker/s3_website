import { JSX } from "react";
import CardComponent from "../components/CardComponent";

/**
 * Displays the privacy policy page.
 */
export default function PrivacyPolicyPage(): JSX.Element {
    return (
        <CardComponent title="Datenschutzerklärung">
            <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                Personenbezogene Daten werden auf dieser Webseite nur im technisch notwendigen Umfang erhoben.
                In keinem Fall werden die erhobenen Daten verkauft oder aus anderen Gründen an Dritte weitergegeben.
            </p>
            <p>
                Weitere Informationen zum Datenschutz folgen in Kürze.
            </p>
        </CardComponent>
    );
}
