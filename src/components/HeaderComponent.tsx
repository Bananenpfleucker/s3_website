import { JSX, ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon/S3Navigator.png";

const HeaderComponent = forwardRef<HTMLElement, {}>(
    (_props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
        const headerRef = useRef<HTMLElement | null>(null);
        const [darkMode, setDarkMode] = useState(() => {
            return localStorage.getItem("darkMode") === "true";
        });

        // Set dark-mode class on body
        useEffect(() => {
            document.body.classList.toggle("dark-mode", darkMode);
            localStorage.setItem("darkMode", String(darkMode));
        }, [darkMode]);

        // Shrink-Effekt
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
                <div style={{ position: "relative" }}>
                    <Link to="/">
                        <img
                            id="logo"
                            src={logo}
                            alt="AWMF online - Portal der wissenschaftlichen Medizin"
                            style={{ cursor: "pointer" }}
                        />
                    </Link>
                    <h2>Leitlinienregister der S3-Leitlinien</h2>
                    <label className={`neon-switch ${darkMode ? "glow" : ""}`} style={{ position: "absolute", right: "1rem", top: "1rem" }}>
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
  />
  <span className="slider"></span>
  <span className={`dot ${darkMode ? "on" : ""}`}></span>
</label>



                </div>
            </header>
        );
    }
);

export default HeaderComponent;
