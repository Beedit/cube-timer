"use client";

import TauriLink from "../components/parts/Link";

const GlobalError = () => {
    return (
        <html lang="en" className="text-black bg-white dark:text-white dark:bg-[#332a2e]">
            <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
                <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
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
