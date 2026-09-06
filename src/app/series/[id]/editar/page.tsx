"use client";

import { use } from "react";
import Link from "next/link";
import { useSeries } from "@/context/ContextoSeries";
import SeriesForm from "@/components/SeriesForm";

export default function EditarSeriePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { getSeriesById, updateSeries } = useSeries();

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
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Editar {serie.title}</h1>
            <SeriesForm
                initialData={serie}
                onSubmit={(data) => updateSeries(serie.id, data)}
                buttonText="Actualizar Cambios"
            />
        </div>
    );
}