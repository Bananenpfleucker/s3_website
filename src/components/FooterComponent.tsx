import { JSX } from "react";
import { Link } from "react-router-dom";


export default function FooterComponent(): JSX.Element {
    return (
        <footer>
            <div>
                <b>Leitlinienbasiert auf Empfehlungen medizinischer Fachgesellschaften</b>
                <Link to="/privacy">Datenschutz</Link>
                <Link to="/imprint">Impressum</Link>
                <Link to="/contact">Kontakt</Link>
            </div>
            </footer>

    );
};
