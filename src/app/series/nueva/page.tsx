"use client";

import { useSeries } from "@/context/ContextoSeries";
import SeriesForm from "@/components/SeriesForm";

export default function NuevaSeriePage() {
    const { addSeries } = useSeries();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Agregar Nueva Serie</h1>
            <SeriesForm onSubmit={addSeries} buttonText="Guardar Serie" />
        </div>
    );
}