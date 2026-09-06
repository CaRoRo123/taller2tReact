"use client";

import { use } from "react";
import Link from "next/link";
import { useSeries } from "@/context/ContextoSeries";

export default function DetalleSeriePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { getSeriesById, toggleFavorite } = useSeries();

    const serie = getSeriesById(id);

    if (!serie) {
        return (
            <div className="text-center py-12 space-y-4">
                <p className="text-red-400 font-semibold">Serie no encontrada.</p>
                <Link href="/" className="text-indigo-400 underline">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6 space-y-4">
            {serie.imageUrl && (
                <img src={serie.imageUrl} alt={serie.title} className="w-full h-64 object-cover rounded-lg" />
            )}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{serie.title}</h1>
                <button
                    onClick={() => toggleFavorite(serie.id)}
                    className="text-2xl hover:scale-110 transition"
                >
                    {serie.isFavorite ? "⭐" : "☆"}
                </button>
            </div>
            <div className="flex gap-4 text-sm text-slate-400">
                <span><strong>Género:</strong> {serie.genre}</span>
                <span><strong>Año:</strong> {serie.year}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{serie.description}</p>
            <div className="flex gap-3 pt-4 border-t border-slate-800">
                <Link href="/" className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg">
                    ← Volver
                </Link>
                <Link
                    href={`/series/${serie.id}/editar`}
                    className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                    Editar
                </Link>
            </div>
        </div>
    );
}