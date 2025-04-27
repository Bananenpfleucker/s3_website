import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Guideline } from "../data/api";
import CardComponent from "../components/CardComponent";
import ThumbsUp from "../assets/icon/Thumbs_up.png";
import ThumbsDown from "../assets/icon/Thumbs_down.png";



export default function GuidelineDetailPage(): JSX.Element {
    const { id } = useParams();
    const [guideline, setGuideline] = useState<Guideline | null>(null);
    const [fullText, setFullText] = useState<string>("");
    const [structuredText, setStructuredText] = useState<Record<string, string> | null>(null);
    const [votes, setVotes] = useState<{ up: number; down: number }>({ up: 0, down: 0 });
    const [voting, setVoting] = useState<null | "up" | "down">(null);



    function formatDateGerman(dateString: string): string {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    }

    function fetchVotes() {
        if (!id) return;
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/${id}/votes`)
          .then(res => res.json())
          .then(data => {
            setVotes({
              up: data.upvotes || 0,
              down: data.downvotes || 0,
            });
          })
          .catch(err => {
            console.error("Fehler beim Laden der Votes:", err);
          });
    }
    
    function submitVote(vote: "up" | "down") {
        if (!id) return;
        setVoting(vote);
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/${id}/vote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vote }),
        })
        .then(() => {
            fetchVotes();
        })
        .catch(err => {
            console.error("Fehler beim Abstimmen:", err);
        })
        .finally(() => {
            setTimeout(() => setVoting(null), 50);
        });
    }
    

    function renderStructuredText(json: Record<string, string>): JSX.Element {
        return (
          <div className="structured-text">
            {Object.entries(json)
              .filter(([, value]) => value && value.trim() !== "")
              .map(([key, value]) => (
                <div key={key} className="section">
                  
                  <h4 className="section-title">{key.replace(/_/g, " ")}</h4>
                  
                  <p className="section-content">{value}</p>
                </div>
            ))}
          </div>
        );
      }  
    
    
    
    useEffect(() => {
        if (!id) return;
    
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/${id}`)
            .then(res => res.json())
            .then(data => {
                const g = data;
    
                console.log("API-Antwort:", g);
                console.log("compressed_text (als string):", g.compressed_text);
    
                setGuideline({
                    id: g.id,
                    guidelineId: g.awmf_guideline_id,
                    title: g.title,
                    lversion: g.lversion,
                    lastReviewedDate: g.stand,
                    creationDate: g.created_at,
                    validDate: g.valid_until,
                    remark: g.aktueller_hinweis
                });
    
                if (g.compressed_text) {
                    try {
                        const cleaned = g.compressed_text.replace(/,\s*}$/, '}');
                        const parsed = JSON.parse(cleaned);
                        console.log("Parsed compressed_text", parsed);
                        setStructuredText(parsed);
                    } catch (error) {
                        console.error("Fehler beim Parsen von compressed_text:", error);
                        setStructuredText(null);
                        setFullText("Fehler beim Laden der Zusammenfassung");
                    }
                } else {
                    setStructuredText(null);
                    setFullText("Kein Langtext verfügbar");
                }
                fetchVotes();
            })
            .catch(err => {
                console.error("Fetch-Fehler:", err);
            });
    }, [id]);
    
    

    if (!guideline) {
        return (
            <CardComponent title="Lade Daten...">
                <p>Bitte warten...</p>
            </CardComponent>
        );
    }

    return (
        <CardComponent title={guideline.title}>
            <p><strong>AWMF-ID:</strong> {guideline.guidelineId}</p>
            <p><strong>Letzte Überprüfung:</strong> {formatDateGerman(guideline.lastReviewedDate)}</p>
            <p><strong>Erstellt am:</strong> {formatDateGerman(guideline.creationDate)}</p>
            <p><strong>Gültig bis:</strong> {formatDateGerman(guideline.validDate)}</p>
            {guideline.lversion && <p><strong>Version:</strong> {guideline.lversion}</p>}
            {guideline.remark && <p><strong>Hinweis:</strong> {guideline.remark}</p>}

            <h3>Zusammenfassung:</h3>

            {structuredText
        ? renderStructuredText(structuredText)
        : <p style={{ whiteSpace: "pre-wrap" }}>{fullText}</p>
}

            <div className="vote-buttons">
            <button
                onClick={() => submitVote("up")}
                className={`vote-button ${voting === "up" ? "voting" : ""}`}
                title="Hilfreich"
            >
                <img src={ThumbsUp} alt="Daumen hoch" />
                <span>{votes.up}</span>
            </button>

            <button
                onClick={() => submitVote("down")}
                className={`vote-button ${voting === "down" ? "voting" : ""}`}
                title="Nicht hilfreich"
            >
                <img src={ThumbsDown} alt="Daumen runter" />
                <span>{votes.down}</span>
            </button>
            </div>

            <p className="disclaimer">
                Diese Zusammenfassung wurde automatisiert durch eine KI erstellt. Es wird keine Gewähr für Richtigkeit oder Vollständigkeit übernommen.
            </p>

        </CardComponent>
    );
}
