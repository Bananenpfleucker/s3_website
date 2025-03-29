import { JSX, useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import GuidelineComponent from "../components/GuidelineComponent";
import { Guideline } from "../data/api";

export default function ResultsPage(): JSX.Element {
    const [search, setSearch] = useState(localStorage.getItem("searchTerm") || "");
    const [guidelines, setGuidelines] = useState<Guideline[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [onlyValid, setOnlyValid] = useState(false);
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDirection, setSortDirection] = useState("desc");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTimeoutReached(true);
        }, 5000);
    
        handleNewSearch();
    
        return () => clearTimeout(timeout);
    }, []);
    
    function handleNewSearch(): void {
        if (!search.trim()) {
            setGuidelines([]);
            setLoading(false);
            return;
        }
    
        setLoading(true);
        setTimeoutReached(false); // Reset Timeout-Flag bei neuer Suche
    
        const params = new URLSearchParams({
            q: search,
            order_by: sortBy,
            order_direction: sortDirection
        });
    
        if (onlyValid) {
            params.append("valid_only", "true");
        }
    
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/search?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map((item: any) => ({
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
                setLoading(false);
    
                // Wenn API fertig ist, und trotzdem leer: Timeout manuell setzen
                if (mapped.length === 0) {
                    setTimeoutReached(true);
                }
            })
            .catch((err) => {
                console.error("Fehler bei der Suche:", err);
                alert("Die Suche ist fehlgeschlagen.");
                setLoading(false);
            });
    }
    

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
                            onKeyDown={(e) => e.key === 'Enter' && handleNewSearch()}
                        />
                        <button onClick={handleNewSearch}>Suchen</button>
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
                {loading && (
                    <CardComponent title="Lade Ergebnisse...">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                            <div className="spinner" />
                        </div>
                    </CardComponent>
                )}

                {!loading && guidelines.length > 0 && (
                    <CardComponent title="Suchergebnisse">
                        {guidelines.map(g => <GuidelineComponent key={g.id} data={g} />)}
                    </CardComponent>
                )}

                {!loading && timeoutReached && guidelines.length === 0 && (
                    <CardComponent title="Keine Ergebnisse gefunden">
                        <p>Es wurden keine Leitlinien gefunden. Bitte prüfen Sie Ihr Suchwort.</p>
                    </CardComponent>
                )}
            </div>
        </div>
    );
}
