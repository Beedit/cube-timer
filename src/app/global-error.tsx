"use client";

const GlobalError = () => {
    return (
        <html lang="en" className="text-black bg-white dark:text-white dark:bg-[#332a2e]">
            <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
                <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
                    Something has gone very wrong.
                    <br />
                    Please contact me - I should have been notified already.
                </main>
            </body>
        </html>
    );
};

export default GlobalError;
