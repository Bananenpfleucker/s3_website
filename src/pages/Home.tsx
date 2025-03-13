import { JSX } from "react";
import Card from "../comp/Card";

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
