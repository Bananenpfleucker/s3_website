import { JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import { Guideline } from "../data/api";
import searchIcon from "../assets/icon/search.svg";
import filterIcon from "../assets/icon/filter.svg";


export default function ResultsPage(): JSX.Element {
    const [search, setSearch] = useState(localStorage.getItem("searchTerm") || "");
    const [guidelines, setGuidelines] = useState<Guideline[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || "created_at");
    const [sortDirection, setSortDirection] = useState(localStorage.getItem("sortDirection") || "desc");
    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState<number>(parseInt(localStorage.getItem("currentPage") || "1"));
    const [totalCount, setTotalCount] = useState<number>(0);
    const [scrolled, setScrolled] = useState(false);

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
        localStorage.removeItem("onlyValid");
        const timeout = setTimeout(() => setTimeoutReached(true), 5000);
        handleNewSearch();
        return () => clearTimeout(timeout);
    }, []);   

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        handleNewSearch(1, true);
      }, [sortBy]);
      
      useEffect(() => {
        handleNewSearch(1, true);
      }, [sortDirection]);
    
    function handleNewSearch(page = currentPage, resetPage = false): void {
        if (!search.trim()) {
            setGuidelines([]);
            setLoading(false);
            return;
        }
    
        if (resetPage) {
            page = 1;
        }
    
        localStorage.setItem("searchTerm", search);
        localStorage.setItem("sortBy", sortBy);
        localStorage.setItem("sortDirection", sortDirection);
        localStorage.setItem("currentPage", page.toString());
    
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
    
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/search/count?q=${encodeURIComponent(search)}`)
            .then(res => res.json())
            .then(countData => {
                console.log("Antwort von /count:", countData);
                setTotalCount(countData.count || 0);
                return fetch(`http://s3-navigator.duckdns.org:5000/guidelines/search?${params.toString()}`);
            })
            .then(res => res.json())
            .then((data) => {
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
                setCurrentPage(page);
                setLoading(false);
    
                if (mapped.length === 0) setTimeoutReached(true);
            })
            .catch(() => {
                setGuidelines([]);
                setLoading(false);
                setTimeoutReached(true);
            });
    }
    
    function renderPagination(): JSX.Element | null {
        const totalPages = Math.ceil(totalCount / pageSize);
        if (totalPages <= 1) return null;
    
        const pages = [];
        const maxDisplayedPages = 5;
    
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);
    
        if (endPage - startPage < maxDisplayedPages - 1) {
            startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
        }
    
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }
    
        return (
            <div className="pagination custom-pagination">
                <button onClick={() => handleNewSearch(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
    
                {startPage > 1 && (
                    <>
                        <button onClick={() => handleNewSearch(1)} className={currentPage === 1 ? "active" : ""}>
                            1
                        </button>
                        {startPage > 2 && <span className="dots">...</span>}
                    </>
                )}
    
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleNewSearch(page)}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
    
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="dots">...</span>}
                        <button onClick={() => handleNewSearch(totalPages)} className={currentPage === totalPages ? "active" : ""}>
                            {totalPages}
                        </button>
                    </>
                )}
    
                <button onClick={() => handleNewSearch(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        );
    }
    
    

    return (
        <div className="search-page">
            <div className={`search-bar-wrapper ${scrolled ? "scrolled" : ""}`}>
                <CardComponent title={!scrolled ? "Leitliniensuche" : undefined} variant="flat">
                    <div className="form-merge small">
                        <input
                            type="text"
                            placeholder="Suchbegriff"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNewSearch(1, true)}
                        />
                        <button className="primary" onClick={() => handleNewSearch(1, true)} title="Suche starten">
                        <img src={searchIcon} alt="Suche" className="button-icon" />
                        </button>

                        <button className="secondary" onClick={() => setShowAdvanced(!showAdvanced)} title="Erweiterte Filter">
                        <img src={filterIcon} alt="Filter" className="button-icon" />
                        </button>

                    </div>

                    {showAdvanced && (
                        <div className="advanced-search-panel">
                        <div className="filter-option">
                            <label>Sortieren nach:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="created_at">Erstellungsdatum</option>
                            <option value="title">Titel</option>
                            <option value="valid_until">Gültigkeit</option>
                            <option value="stand">Stand (letzte Überprüfung)</option>
                            <option value="lversion">Leitlinien-Version</option>
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
