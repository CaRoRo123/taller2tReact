"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Series, SeriesFormData } from "@/types/series";

const INITIAL_SERIES: Series[] = [
    {
        id: "1",
        title: "Breaking Bad",
        description: "Un profesor de química diagnosticado con cáncer comienza a fabricar metanfetamina.",
        genre: "Drama",
        year: 2008,
        isFavorite: true,
        imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&auto=format&fit=crop"
    },
    {
        id: "2",
        title: "Stranger Things",
        description: "Un grupo de niños descubre experimentos secretos y fuerzas sobrenaturales en su pueblo.",
        genre: "Ciencia Ficción",
        year: 2016,
        isFavorite: false,
        imageUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&auto=format&fit=crop"
    }
];

interface SeriesContextType {
    series: Series[];
    loading: boolean;
    addSeries: (data: SeriesFormData) => void;
    updateSeries: (id: string, data: SeriesFormData) => void;
    deleteSeries: (id: string) => void;
    toggleFavorite: (id: string) => void;
    getSeriesById: (id: string) => Series | undefined;
}

const SeriesContext = createContext<SeriesContextType | undefined>(undefined);

export function SeriesProvider({ children }: { children: ReactNode }) {
    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);

    // PASO A: Leer localStorage una sola vez al cargar la página en el navegador
    useEffect(() => {
        const saved = localStorage.getItem("series_data");
        if (saved !== null) {
            try {
                setSeries(JSON.parse(saved));
            } catch {
                setSeries(INITIAL_SERIES);
            }
        } else {
            setSeries(INITIAL_SERIES);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem("series_data", JSON.stringify(series));
        }
    }, [series, loading]);

    const addSeries = (data: SeriesFormData) => {
        const newEntry: Series = {
            ...data,
            id: crypto.randomUUID(), // al parecer da un id
            isFavorite: false,
        };
        setSeries((prev) => [newEntry, ...prev]);
    };

    const updateSeries = (id: string, data: SeriesFormData) => {
    setSeries((prev) => {
        return prev.map((serie) => {
            if (serie.id !== id) {
                return serie; //SOLO CAMVIAR LA QUE QUEREMOS
            }
            return {
                ...serie,
                ...data,
            };
        });});};


    const deleteSeries = (id: string) => {
        setSeries((prev) => prev.filter((s) => s.id !== id));
    };

    const toggleFavorite = (id: string) => {
        setSeries((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
            )
        );
    };

    const getSeriesById = (id: string) => {
        return series.find((s) => s.id === id);
    };

    return (
        <SeriesContext.Provider
            value={{
                series,
                loading,
                addSeries,
                updateSeries,
                deleteSeries,
                toggleFavorite,
                getSeriesById,
            }}
        >
            {children}
        </SeriesContext.Provider>
    );
}

export function useSeries() {
    const context = useContext(SeriesContext);
    if (!context) {
        throw new Error("useSeries debe usarse dentro de un SeriesProvider");
    }
    return context;
}