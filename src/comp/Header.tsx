import { JSX } from "react";
import logo from "./../assets/icon/logo.svg";

export default function Header(): JSX.Element {
    return (
        <header>
            <div>
                <img id="logo" src={logo} alt="AWMF online - Portal der wissenschaftlichen Medizin" />

                <h2>Leitlinienregister der AWMF online</h2>
            </div>
        </header>
    );
};
