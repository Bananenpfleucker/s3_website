import { JSX, useState } from "react";
import CardComponent from "../components/CardComponent";
import { fetchGuidelines, Guideline } from "../data/api";

/**
 * Displays the home page for the webseite.
 */
export default function HomePage(): JSX.Element {
    const [search, setSearch] = useState('');
    const [guidelines, setGuidelines] = useState(new Array<Guideline>());

    const guidelineList = guidelines.map((guideline: Guideline) =>
        <li>
            {guideline.guidelineId} - {guideline.title} - {guideline.lversion}
        </li>
    );

    function getGuidelines(): void {
        fetchGuidelines(search, setGuidelines);
    }

    return (
        <>
            <CardComponent title="Leitliniensuche">
                <div className="form-merge">
                    <input type="text" placeholder="Suchbegriff" value={search} onChange={e => setSearch(e.target.value)} />

                    <button onClick={getGuidelines}>
                        Suchen
                    </button>

                    <button>
                        Erweitert
                    </button>
                </div>
            </CardComponent>

            {guidelines.length > 0 &&
                <CardComponent title="Suchergebnisse">
                    <ul>
                        {guidelineList}
                    </ul>
                </CardComponent>
            }
        </>
    );
};
