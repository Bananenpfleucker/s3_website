import { JSX } from "react";

export type CardComponentProps = {
    children: any,
    title?: string | undefined
}

/**
 * Displays the contents in a card-like element.
 * 
 * A title can be alternatively supplied to the element.
 */
export default function CardComponent({ children, title }: CardComponentProps): JSX.Element {
    return (
        <div className="card">
            {title != undefined && <h2>{title}</h2>}

            {children}
        </div>
    );
};
