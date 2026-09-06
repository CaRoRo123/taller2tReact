"use client";

import { useState } from "react";
import { useSeries } from "@/context/ContextoSeries";
import SeriesCard from "@/components/SeriesCard";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
    const { series, loading } = useSeries();
    const [search, setSearch] = useState("");

    const filteredSeries = series.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 text-slate-400">
                <span className="animate-spin text-3xl mr-2">⏳</span> Cargando series...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Catálogo de Series</h1>
                <SearchBar onSearch={setSearch} />
            </div>

            {filteredSeries.length === 0 ? (
                <p className="text-slate-500 text-center py-10">No se encontraron series.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredSeries.map((item) => (
                        <SeriesCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}