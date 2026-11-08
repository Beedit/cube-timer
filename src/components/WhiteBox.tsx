export default function WhiteBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-1 shadow-xl">
            {children}
        </div>
    );
}
