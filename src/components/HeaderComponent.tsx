import { JSX, ForwardedRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon/logo.jpg";

/**
 * Displays a regular header element (classic layout with logo, button, and title).
 */
const HeaderComponent = forwardRef<HTMLElement, {}>(
    (_props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
        return (
            <header ref={ref}>
                <div>
                    <img id="logo" src={logo} alt="AWMF online - Portal der wissenschaftlichen Medizin" />

                    <Link to="/" className="home-button">
                        Startseite
                    </Link>

                    <h2>Leitlinienregister der S3-Leitlinien</h2>
                </div>
            </header>
        );
    }
);

export default HeaderComponent;
