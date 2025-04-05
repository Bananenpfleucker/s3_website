import { JSX, ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon/S3Navigator.png";


const HeaderComponent = forwardRef<HTMLElement, {}>(
    (_props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
        const headerRef = useRef<HTMLElement | null>(null);

        useEffect(() => {
            const marker = document.getElementById("header-marker");
            const header = headerRef.current;
            if (!marker || !header) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        header.classList.remove("shrink");
                    } else {
                        header.classList.add("shrink");
                    }
                },
                { threshold: 1 }
            );

            observer.observe(marker);

            return () => observer.disconnect();
        }, []);

        return (
            <header ref={(el) => {
                headerRef.current = el;
                if (typeof ref === "function") ref(el);
                else if (ref) ref.current = el;
            }}>
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
