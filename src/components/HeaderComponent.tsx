import { JSX } from "react";
import logo from '../assets/icon/logo.jpg'

/**
 * Displays a regular header element.
 */
export default function HeaderComponent(): JSX.Element {
    return (
        <header>
            <div>
                <img id="logo" src={logo} alt="AWMF online - Portal der wissenschaftlichen Medizin" />

                <h2>Leitlinienregister der S3-Leitlinien</h2>
            </div>
        </header>
    );
};
