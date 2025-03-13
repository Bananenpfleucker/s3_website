import { JSX } from "react";
import Card from "../components/Card";

export default function Home(): JSX.Element {
    return (
        <>
            <Card title="Leitliniensuche">
                <div className="form-merge">
                    <input type="text" placeholder="Suchbegriff" />

                    <button>
                        Suchen
                    </button>

                    <button>
                        Erweitert
                    </button>
                </div>
            </Card>
        </>
    );
};
