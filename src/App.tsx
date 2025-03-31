import { JSX, useRef, useEffect } from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { Outlet } from "react-router-dom";
import WavesVideo from "./assets/video/Waves.mp4";

export default function App(): JSX.Element {
    const headerRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                document.documentElement.style.setProperty("--header-height", `${height}px`);
            }
        };

        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

    useEffect(() => {
        // 🎬 Wiedergabegeschwindigkeit setzen
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5; // z. B. halb so schnell
        }
    }, []);

    return (
        <div className="app-wrapper">
            {/* 🎥 Hintergrundvideo */}
            <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
                ref={videoRef}
            >
                <source src={WavesVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <HeaderComponent ref={headerRef} />
            <main id="page">
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    );
}
