import { JSX } from "react";
import { Guideline } from "../data/api";

export type GuidelineComponentProps = {
    data: Guideline
};

export default function GuidelineComponent({ data }: GuidelineComponentProps): JSX.Element {
    return (
        <>
            <p>
                <b>
                    Leitlinie
                </b>
            </p>

            <h3 className="awmf-cyan">
                {data.title ?? 'unbekannter Titel'}
            </h3>

            {data.guidelineId && <p>Registernummer <b>{data.guidelineId}</b></p>}

            {data.creationDate && <p>Erstellt am <b>{data.creationDate}</b></p>}
        </>
    );
};
