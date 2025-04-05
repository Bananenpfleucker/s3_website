import { JSX, ReactNode } from "react";

export type CardComponentProps = {
    children: ReactNode;
    title?: string;
    variant?: "default" | "flat";
};

export default function CardComponent({ children, title, variant = "default" }: CardComponentProps): JSX.Element {
    return (
        <div className={`card ${variant === "flat" ? "card-flat" : ""}`}>
            {title !== undefined && <h2 className="break-word card-title">{title}</h2>}
            {children}
        </div>
    );
}

