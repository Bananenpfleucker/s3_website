import { JSX } from "react";

export function Home(): JSX.Element {
    return (
        <>
            <div className="card">
                <h1>Leitliniensuche</h1>

                <div className="form-merge">
                    <input type="text" placeholder="Suchbegriff" />

                    <button>
                        Suchen →
                    </button>

                    <button>
                        Erweitert →
                    </button>
                </div>
            </div>
        </>
    );
};
