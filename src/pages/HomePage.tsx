import { JSX, useState } from "react";
import CardComponent from "../components/CardComponent";
import { fetchGuidelinesBySearchTerm, Guideline } from "../data/api";
import GuidelineComponent from "../components/GuidelineComponent";

/**
 * Displays the home page for the webseite.
 */
export default function HomePage(): JSX.Element {
    const [search, setSearch] = useState('');
    const [guidelines, setGuidelines] = useState(new Array<Guideline>());

    const guidelineList = guidelines.map((guideline: Guideline) =>
        <GuidelineComponent key={guideline.id} data={guideline} />
    );

    function getGuidelines(): void {
        fetchGuidelinesBySearchTerm(search, setGuidelines);
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
                    {guidelineList}
                </CardComponent>
            }
        </>
    );
};
