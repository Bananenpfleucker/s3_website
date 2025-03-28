import { JSX } from "react";
import { Link } from "react-router-dom";
import { Guideline } from "../data/api";

export type GuidelineComponentProps = {
    data: Guideline;
};

export default function GuidelineComponent({ data }: GuidelineComponentProps): JSX.Element {
    return (
        <>
            <p>
                <b>Leitlinie</b>
            </p>

            <Link to={`/guideline/${data.id}`} className="awmf-cyan">
                <h3 className="break-word">
                    {data.title ?? 'unbekannter Titel'}
                </h3>
            </Link>

            {data.guidelineId && (
                <p>
                    Registernummer: <b>{data.guidelineId}</b>
                </p>
            )}

            <p>
                Interne ID: <b>{data.id}</b>
            </p>

            {data.creationDate && (
                <p>
                    Erstellt am: <b>{data.creationDate}</b>
                </p>
            )}
        </>
    );
}
