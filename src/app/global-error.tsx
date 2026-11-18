"use client";

import TauriLink from "../components/parts/Link";

const GlobalError = () => {
    return (
        <html lang="en" className="text-black bg-white dark:text-white dark:bg-[#332a2e]">
            <body className="max-w-xl mx-4 mt-8 antialiased lg:mx-auto">
                <main className="flex flex-col flex-auto min-w-0 px-2 mt-6 md:px-0">
                    Something has gone wrong.
                    <br />
                    Please file a bug report on github.
                    <br />
                    <br />
                    <TauriLink url="https://github.com/Beedit/cube-timer">
                        Github
                    </TauriLink>
                </main>
            </body>
        </html>
    );
};

export default GlobalError;
