import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import favicon from "../public/image/favicon.ico";
import { Providers } from "./providers";

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
        <html lang="en" className="text-black text-base/8" suppressHydrationWarning>
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/highlight.min.js" async />
            </head>
            <Providers>
                <body className="relative w-screen h-screen overflow-hidden">
                    <div className="absolute background" />
                    <main className="">
                        {children}
                    </main>
                </body>
            </Providers>
        </html>
    );
}
