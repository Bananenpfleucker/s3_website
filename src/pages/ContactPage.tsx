import { JSX, useRef, useState } from "react";
import CardComponent from "../components/CardComponent";
import emailjs from "@emailjs/browser";

/**
 * Displays the contact page with a working contact form and validation.
 */
export default function ContactPage(): JSX.Element {
    const form = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [showGeneralHint, setShowGeneralHint] = useState(false);
    const [success, setSuccess] = useState(false);

    function sendEmail(e: React.FormEvent) {
        e.preventDefault();
        setErrors([]);
        setShowGeneralHint(false);
        setSuccess(false);

        if (!form.current) return;

        const formData = new FormData(form.current);
        const requiredFields = ["name", "email", "phone", "message"];
        const newErrors: string[] = [];

        requiredFields.forEach((field) => {
            const value = formData.get(field);
            if (!value || (typeof value === "string" && value.trim() === "")) {
                newErrors.push(field);
            }
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setShowGeneralHint(true);
            return;
        }

        emailjs
            .sendForm(
                "service_u4c476a",
                "template_gjbcf7h",
                form.current,
                "oX-fv_E1eu2C7YX4n"
            )
            .then(() => {
                setSuccess(true);
                form.current?.reset();
            })
            .catch((error) => {
                console.error("EmailJS Fehler:", error);
                alert("Fehler beim Versenden der Nachricht.");
            });
    }

    return (
        <CardComponent title="Kontakt">
            <div style={{ marginBottom: "2rem" }}>
                <p>
                    <strong>Telefon:</strong> +49 (0)123 456789<br />
                    <strong>E-Mail:</strong> <a href="mailto:kontakt@beispiel.de">kontakt@beispiel.de</a><br />
                    <strong>Adresse:</strong> Musterstraße 1, 12345 Düsseldorf
                </p>
            </div>

            <form ref={form} onSubmit={sendEmail} className="contact-form">
                <p>
                    <label>Name:</label><br />
                    <input type="text" name="name" />
                    {errors.includes("name") && <span className="form-error">Bitte Name angeben.</span>}
                </p>

                <p>
                    <label>Telefonnummer:</label><br />
                    <input type="tel" name="phone" />
                    {errors.includes("phone") && <span className="form-error">Bitte Telefonnummer angeben.</span>}
                </p>

                <p>
                    <label>E-Mail:</label><br />
                    <input type="email" name="email" />
                    {errors.includes("email") && <span className="form-error">Bitte E-Mail angeben.</span>}
                </p>

                <p>
                    <label>Anliegen:</label><br />
                    <textarea name="message" rows={5} />
                    {errors.includes("message") && <span className="form-error">Bitte Anliegen angeben.</span>}
                </p>

                <button type="submit">Nachricht senden</button>

                {showGeneralHint && (
                    <p className="form-error" style={{ marginTop: "1rem" }}>
                        Bitte füllen Sie alle Pflichtfelder aus.
                    </p>
                )}

                {success && (
                    <p className="form-success">
                        ✅ Nachricht erfolgreich verschickt!
                    </p>
                )}
            </form>
        </CardComponent>
    );
}
