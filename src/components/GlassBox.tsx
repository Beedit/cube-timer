export default function GlassBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl w-full h-full">
            {children}
        </div>
    );
}
