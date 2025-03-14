import { JSX } from "react";

/**
 * Displays a regular footer element.
 */
export default function FooterComponent(): JSX.Element {
    return (
        <footer>
            <b>Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften e. V.</b>
            <a href="">Datenschutz</a>
            <a href="">Impressum</a>
            <a href="">Kontakt</a>
        </footer>
    );
};
