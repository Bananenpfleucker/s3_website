import { JSX, ForwardedRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon/S3Navigator.png";

/**
 * Displays a regular header element (classic layout with logo and title).
 * The logo links to the homepage.
 */
const HeaderComponent = forwardRef<HTMLElement, {}>(
    (_props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
        return (
            <header ref={ref}>
                <div>
                    <Link to="/">
                        <img
                            id="logo"
                            src={logo}
                            alt="AWMF online - Portal der wissenschaftlichen Medizin"
                            style={{ cursor: "pointer" }}
                        />
                    </Link>

                    <h2>Leitlinienregister der S3-Leitlinien</h2>
                </div>
            </header>
        );
    }
);

export default HeaderComponent;
