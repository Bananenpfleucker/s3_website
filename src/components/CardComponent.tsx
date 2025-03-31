import { JSX, ReactNode } from "react";

export type CardComponentProps = {
    children: ReactNode;
    title?: string;
    variant?: "default" | "flat";
};

/**
 * Displays the contents in a card-like element.
 * A title can be alternatively supplied to the element.
 */
export default function CardComponent({ children, title, variant = "default" }: CardComponentProps): JSX.Element {
    return (
        <div className={`card ${variant === "flat" ? "card-flat" : ""}`}>
            {title !== undefined && <h2 className="break-word">{title}</h2>}
            {children}
        </div>
    );
}
