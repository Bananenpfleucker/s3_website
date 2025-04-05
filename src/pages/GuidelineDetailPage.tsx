import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Guideline } from "../data/api";
import CardComponent from "../components/CardComponent";


export default function GuidelineDetailPage(): JSX.Element {
    const { id } = useParams();
    const [guideline, setGuideline] = useState<Guideline | null>(null);
    const [fullText, setFullText] = useState<string>("");

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
        if (!id) return;
    
        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/${id}`)
            .then(res => res.json())
            .then(data => {
                const g = data; 
    
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
    
                setFullText(g.compressed_text ?? "Kein Langtext verfügbar");
            })
            .catch(err => {
                console.error("Fehler beim Laden:", err);
                alert("Die Leitlinie konnte nicht geladen werden.");
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
            
            <p style={{ whiteSpace: "pre-wrap" }}>{fullText}</p>
            <p className="disclaimer"> Diese Zusammenfassung wurde automatisiert durch eine KI erstellt. Es wird keine Gewähr für Richtigkeit oder Vollständigkeit übernommen.</p>

        </CardComponent>
    );
}
