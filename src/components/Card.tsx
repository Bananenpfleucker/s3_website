import { JSX } from "react";

export type CardProps = {
    children: any,
    title?: string | undefined
}

export default function Card({ children, title }: CardProps): JSX.Element {
    return (
        <div className="card">
            {title != undefined && <h1>{title}</h1>}

            {children}
        </div>
    );
};
