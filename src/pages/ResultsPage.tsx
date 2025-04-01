import { JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import { Guideline } from "../data/api";

export default function ResultsPage(): JSX.Element {
    const [search, setSearch] = useState(localStorage.getItem("searchTerm") || "");
    const [guidelines, setGuidelines] = useState<Guideline[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [onlyValid, setOnlyValid] = useState(JSON.parse(localStorage.getItem("onlyValid") || "false"));
    const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || "created_at");
    const [sortDirection, setSortDirection] = useState(localStorage.getItem("sortDirection") || "desc");
    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState<number>(parseInt(localStorage.getItem("currentPage") || "1"));
    const [totalCount, setTotalCount] = useState<number>(0);


    function formatDateGerman(dateString: string): string {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTimeoutReached(true);
        }, 5000);

        handleNewSearch();

        return () => clearTimeout(timeout);
    }, []);

    function handleNewSearch(page = currentPage): void {
        if (!search.trim()) {
            setGuidelines([]);
            setLoading(false);
            return;
        }
    
        setLoading(true);
        setTimeoutReached(false);
    
        const offset = (page - 1) * pageSize;
    
        const params = new URLSearchParams({
            q: search,
            order_by: sortBy,
            order_direction: sortDirection,
            limit: pageSize.toString(),
            offset: offset.toString()
        });
    
        if (onlyValid) {
            params.append("valid_only", "true");
        }
    
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/search?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                // Wenn das Backend direkt ein Array zurückgibt (ohne .results):
                const resultArray = Array.isArray(data) ? data : data.results ?? [];
            
                const mapped = resultArray.map((item: any) => ({
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
            
                // Setze totalCount nur, wenn vorhanden – sonst Anzahl der erhaltenen Ergebnisse
                setTotalCount(data.total ?? resultArray.length);
            
                setCurrentPage(page);
                localStorage.setItem("currentPage", page.toString());
                setLoading(false);
            
                if (mapped.length === 0) setTimeoutReached(true);
            })
            
    }
    
    function renderPagination(): JSX.Element | null {
        const totalPages = Math.ceil(totalCount / pageSize);
        if (totalPages <= 1) return null;
    
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
        return (
            <div className="pagination">
                <button onClick={() => handleNewSearch(currentPage - 1)} disabled={currentPage === 1}>
                    Zurück
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleNewSearch(page)}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => handleNewSearch(currentPage + 1)} disabled={currentPage === totalPages}>
                    Weiter
                </button>
            </div>
        );
    }
    
    

    return (
        <div className="search-page">
            <div className="search-bar-wrapper">
                <CardComponent title="Leitliniensuche" variant="flat">
                    <div className="form-merge">
                        <input
                            type="text"
                            placeholder="Suchbegriff"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNewSearch()}
                        />
                        <button onClick={() => handleNewSearch()}>Suchen</button>
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
                    <>
                        <CardComponent title="Suchergebnisse">
                            <div className="card-container">
                                {guidelines.map(g => (
                                    <Link key={g.id} to={`/guideline/${g.id}`} className="guideline-card">
                                        <h4 className="awmf-cyan">{g.title}</h4>
                                        <p><strong>Letzte Überprüfung:</strong> {formatDateGerman(g.lastReviewedDate)}</p>
                                        <p><strong>Erstellt am:</strong> {formatDateGerman(g.creationDate)}</p>
                                        <p><strong>Gültig bis:</strong> {formatDateGerman(g.validDate)}</p>
                                        {g.remark && <p><strong>Hinweis:</strong> {g.remark}</p>}
                                    </Link>
                                ))}
                            </div>
                        </CardComponent>
                        {renderPagination()}
                    </>
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
