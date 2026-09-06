import Link from "next/link";

export default function Navbar() {
    return (
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400 transition">
                    📺 SeriesApp
                </Link>
                <Link
                    href="/series/nueva"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                    + Nueva Serie
                </Link>
            </div>
        </header>
    );
}