import { JSX, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import { Guideline } from "../data/api";

export default function HomePage(): JSX.Element {
    const [search, setSearch] = useState('');
    const [latestGuidelines, setLatestGuidelines] = useState<Guideline[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [onlyValid, setOnlyValid] = useState(false);
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDirection, setSortDirection] = useState("desc");
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    function handleSearch(): void {
        localStorage.setItem("searchTerm", search);
        localStorage.setItem("sortBy", sortBy);
        localStorage.setItem("sortDirection", sortDirection);
        localStorage.setItem("onlyValid", JSON.stringify(onlyValid));
        localStorage.setItem("currentPage", "1");
        navigate("/results");
    }

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
        const params = new URLSearchParams({
            limit: "6",
            offset: "0",
            order_by: "created_at",
            order_direction: "desc"
        });

        fetch(`http://s3-navigator.duckdns.org:5000/guidelines?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                const mapped: Guideline[] = data.map((item: any) => ({
                    id: item.id,
                    guidelineId: item.awmf_guideline_id,
                    title: item.titel ?? item.title ?? "Unbekannter Titel",
                    lversion: item.lversion,
                    lastReviewedDate: item.stand,
                    creationDate: item.created_at ?? "",
                    validDate: item.valid_until ?? "",
                    remark: item.aktueller_hinweis ?? ""
                }));
                setLatestGuidelines(mapped);
            })
            .catch((err) => {
                console.error("Fehler beim Laden der neuesten Leitlinien:", err);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={handleSearch}>Suchen</button>
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

            
            {latestGuidelines.length > 0 && (
                <div className="search-results-wrapper">
                    <CardComponent title="Aktuellste Leitlinien">
                        <div className="card-container">
                            {latestGuidelines.map(g => (
                                <Link
                                    key={g.id}
                                    to={`/guideline/${g.id}`}
                                    className="guideline-card"
                                >
                                    <h4 className="awmf-cyan">{g.title}</h4>
                                    <p><strong>Letzte Überprüfung:</strong> {formatDateGerman(g.lastReviewedDate)}</p>
                                    <p><strong>Erstellt am:</strong> {formatDateGerman(g.creationDate)}</p>
                                    <p><strong>Gültig bis:</strong> {formatDateGerman(g.validDate)}</p>
                                    {g.remark && <p><strong>Hinweis:</strong> {g.remark}</p>}
                                </Link>
                            ))}
                        </div>
                    </CardComponent>
                </div>
            )}
        </div>
    );
}
