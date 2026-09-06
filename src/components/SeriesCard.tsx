"use client";

import { useState } from "react";
import Link from "next/link";
import { Series } from "@/types/series";
import { useSeries } from "@/context/ContextoSeries";
import ConfirmModal from "./ConfirmModal";

export default function SeriesCard({ item }: { item: Series }) {
    const { toggleFavorite, deleteSeries } = useSeries();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    {/* Imagen o recuadro de respaldo */}
                    <div className="h-44 bg-slate-800 overflow-hidden relative">
                        {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500 text-sm">Sin imagen</div>
                        )}
                        {/* Botón de Favorito */}
                        <button
                            onClick={() => toggleFavorite(item.id)}
                            className="absolute top-2 right-2 bg-slate-900/80 p-2 rounded-full hover:scale-110 transition"
                        >
                            {item.isFavorite ? "⭐" : "☆"}
                        </button>
                    </div>

                    {/* Contenido textual */}
                    <div className="p-4">
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
                            <span>{item.genre}</span>
                            <span>{item.year}</span>
                        </div>
                        <h3 className="font-bold text-white text-lg line-clamp-1">{item.title}</h3>
                        <p className="text-slate-400 text-sm mt-2 line-clamp-2">{item.description}</p>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="p-4 pt-0 border-t border-slate-800/50 flex items-center justify-between gap-2 mt-4">
                    <Link
                        href={`/series/${item.id}`}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                        Ver detalles →
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/series/${item.id}/editar`}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-xs bg-red-950/40 hover:bg-red-900/60 text-red-400 px-2 py-1 rounded"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación vinculado */}
            <ConfirmModal
                isOpen={isModalOpen}
                title={item.title}
                onConfirm={() => deleteSeries(item.id)}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
}