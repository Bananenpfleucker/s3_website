import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Guideline } from "../data/api";
import CardComponent from "../components/CardComponent";

/**
 * Displays a detailed view of a guideline.
 */
export default function GuidelineDetailPage(): JSX.Element {
    const { id } = useParams();
    const [guideline, setGuideline] = useState<Guideline | null>(null);
    const [fullText, setFullText] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        fetch(`http://s3-navigator.duckdns.org:5000/guidelines/search?q=${id}`)
            .then(res => res.json())
            .then(data => {
                const g = data.find((item: any) => String(item.id) === String(id));
                if (!g) throw new Error("Keine passende Leitlinie gefunden.");

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
            <p><strong>Letzte Überprüfung:</strong> {guideline.lastReviewedDate}</p>
            <p><strong>Erstellt am:</strong> {guideline.creationDate}</p>
            <p><strong>Gültig bis:</strong> {guideline.validDate}</p>
            {guideline.lversion && <p><strong>Version:</strong> {guideline.lversion}</p>}
            {guideline.remark && <p><strong>Hinweis:</strong> {guideline.remark}</p>}

            <h3>Zusammenfassung:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{fullText}</p>
        </CardComponent>
    );
}
