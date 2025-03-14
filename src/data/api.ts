import { SetStateAction } from "react";

const apiRoot: string = 'http://s3-navigator.duckdns.org:5000/guidelines/';

export type Guideline = {
    id: number,
    guidelineId: string,
    title: string
    lversion?: string | undefined | null,
    lastReviewedDate: string,
    creationDate: string,
    validDate: string,
    remark?: string | undefined | null
}

export const ErrorMessages: { [call: string]: string } = {
    'fetchGuidelines': 'Es ist ein Fehler aufgetreten. Wir entschuldigen uns für die Unannehmlichkeiten.'
};

/**
 * Sends a request with the supplied search term.
 * 
 * **The api call is not functional as of now since the server is missing the CORS option.**
 * 
 * @param search The search term to filter
 * @param setValues The setter function to override the variable
 */
export function fetchGuidelinesBySearchTerm(search: string, setValues: (data: SetStateAction<Array<Guideline>>) => void): void {

    const api: string = `${apiRoot}search?q=${search}`;
    const guidelines: Array<Guideline> = [];

    fetch(api)
        .then((response: Response) => response.json())
        .then((json: any) => {
            for (let item of json) {
                guidelines.push({
                    id: item.id,
                    guidelineId: item.awmf_guideline_id,
                    title: item.titel,
                    lversion: item.lversion,
                    lastReviewedDate: item.stand,
                    creationDate: item.created_at,
                    validDate: item.valid_until,
                    remark: item.aktueller_hinweise
                });
            }

            setValues(guidelines);
        }).catch(() => alert(ErrorMessages.fetchGuidelines));
}
