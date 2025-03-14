import { SetStateAction } from "react";

const apiRoot: string = 'http://s3-navigator.duckdns.org:5000/guidelines/';

export type Guideline = {
    id: number,
    guidelineId: string,
    creation: Date,
    lversion?: string | undefined | null,
    title: string
}

export function fetchGuidelines(search: string, setValues: (data: SetStateAction<Array<Guideline>>) => void): void {
    return;
    // Wait for server to accept Cross Origin requests.

    const api: string = `${apiRoot}search?q=${search}`;
    const guidelines: Array<Guideline> = [];

    fetch(api)
        .then((response: Response) => response.json())
        .then((json: any) => {
            for (let item of json) {
                guidelines.push({
                    id: item.id,
                    guidelineId: item.awmf_guideline_id,
                    creation: item.created_at,
                    title: item.title,
                    lversion: item.lversion
                });
            }

            alert('Call made.');
            setValues(guidelines);
        });
}
