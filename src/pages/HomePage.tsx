import { JSX, useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";
import { Guideline } from "../data/api";
import GuidelineComponent from "../components/GuidelineComponent";

export default function HomePage(): JSX.Element {
    const [search, setSearch] = useState('');
    const [guidelines, setGuidelines] = useState<Guideline[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [onlyValid, setOnlyValid] = useState(false);
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDirection, setSortDirection] = useState("desc");

    useEffect(() => {
        const savedSearch = localStorage.getItem("searchTerm");
        const savedResults = localStorage.getItem("searchResults");
    
        if (savedSearch) setSearch(savedSearch);
        if (savedResults) {
            try {
                const parsed: Guideline[] = JSON.parse(savedResults);
                setGuidelines(parsed);
            } catch (error) {
                console.error("Fehler beim Wiederherstellen:", error);
            }
        }
    }, []);
    
    

    // Sticky-Suche bei Scroll
    useEffect(() => {
        const wrapper = document.querySelector('.search-bar-wrapper');

        const handleScroll = () => {
            if (!wrapper) return;
            const scrollTop = window.scrollY;
            wrapper.classList.toggle('scrolled', scrollTop > 5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function getGuidelines(): void {
        const params = new URLSearchParams({
            q: search,
            order_by: sortBy,
            order_direction: sortDirection
        });

        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/search?${params.toString()}`)
            .then(res => res.json())
            .then(json => {
                const mapped: Guideline[] = json.map((item: any) => ({
                    id: item.id,
                    guidelineId: item.awmf_guideline_id,
                    title: item.titel,
                    lversion: item.lversion,
                    lastReviewedDate: item.stand,
                    creationDate: item.created_at,
                    validDate: item.valid_until,
                    remark: item.aktueller_hinweis
                }));

                setGuidelines(mapped);
                localStorage.setItem("searchTerm", search);
                localStorage.setItem("searchResults", JSON.stringify(mapped));
            })
            .catch(err => {
                console.error("Fehler:", err);
                alert("Die Suche ist fehlgeschlagen.");
            });
    }

    const guidelineList = guidelines.map(g => (
        <GuidelineComponent key={g.id} data={g} />
    ));

    return (
        <div className="search-page">
            <div className="search-bar-wrapper" style={{ top: "var(--header-height)" }}>
                <CardComponent title="Leitliniensuche">
                    <div className="form-merge">
                        <input
                            type="text"
                            placeholder="Suchbegriff"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && getGuidelines()}
                        />
                        <button onClick={getGuidelines}>Suchen</button>
                        <button onClick={() => setShowAdvanced(!showAdvanced)}>Erweitert</button>
                    </div>

                    {showAdvanced && (
                        <div className="advanced-search-panel">
                            <div className="filter-option">
                            <label>
                                <input
                                type="checkbox"
                                checked={onlyValid}
                                onChange={(e) => setOnlyValid(e.target.checked)}
                                />
                                <span>Nur gültige Leitlinien</span>
                            </label>
                            </div>

                            <div className="filter-option">
                            <label>Sortieren nach:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="created_at">Erstellungsdatum</option>
                                <option value="valid_until">Gültig bis</option>
                                <option value="title">Titel</option>
                            </select>
                            </div>

                            <div className="filter-option">
                            <label>Richtung:</label>
                            <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                                <option value="desc">Absteigend</option>
                                <option value="asc">Aufsteigend</option>
                            </select>
                            </div>
                        </div>
                        )}

                </CardComponent>
            </div>

            <div className="search-results-wrapper">
                {guidelines.length > 0 && (
                    <CardComponent title="Suchergebnisse">
                        {guidelineList}
                    </CardComponent>
                )}
            </div>
        </div>
    );
}
