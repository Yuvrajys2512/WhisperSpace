import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "WhisperSpace",
    description: "Say what you feel. Stay anonymous. Be heard.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
