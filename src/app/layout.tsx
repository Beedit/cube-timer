import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import favicon from "../public/image/favicon.ico";

export const metadata: Metadata = {
    title: "Pip's Site",
    icons: {
        icon: favicon.src,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="text-black text-base/8">
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/highlight.min.js" async />
            </head>
            <body className="h-screen w-screen relative overflow-hidden">
                <div className="background absolute" />
                <main className="">
                    {children}
                </main>
            </body>
        </html>
    );
}
