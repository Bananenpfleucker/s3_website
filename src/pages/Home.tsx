import { JSX, useState } from "react";
import Card from "../components/Card";
import { fetchGuidelines, Guideline } from "../data/api";

export default function Home(): JSX.Element {
    const [search, setSearch] = useState('');
    const [guidelines, setGuidelines] = useState(new Array<Guideline>());

    function getGuidelines(): void {
        fetchGuidelines(search, setGuidelines);
    }

    return (
        <>
            <Card title="Leitliniensuche">
                <div className="form-merge">
                    <input type="text" placeholder="Suchbegriff" value={search} onChange={e => setSearch(e.target.value)} />

                    <button onClick={getGuidelines}>
                        Suchen
                    </button>

                    <button>
                        Erweitert
                    </button>
                </div>
            </Card>

            {guidelines}
        </>
    );
};
