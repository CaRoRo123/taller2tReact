"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SeriesFormData, FormErrors } from "@/types/series";

interface SeriesFormProps {
    initialData?: SeriesFormData;
    onSubmit: (data: SeriesFormData) => void;
    buttonText: string;
}

export default function SeriesForm({ initialData, onSubmit, buttonText }: SeriesFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<SeriesFormData>(
        initialData || {
            title: "",
            description: "",
            genre: "Drama",
            year: new Date().getFullYear(),
            imageUrl: ""
        }
    );

    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
        if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
        if (!formData.genre.trim()) newErrors.genre = "El género es obligatorio";
        if (!formData.year || formData.year < 1900 || formData.year > 2099) {
            newErrors.year = "Ingresa un año válido entre 1900 y 2099";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "year" ? Number(value) : value
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
            router.push("/"); // Regresa a la página principal
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-slate-900 p-6 rounded-xl border border-slate-800">
            {/* Título */}
            <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Título</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                    placeholder="Ej. The Bear"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Género y Año en dos columnas */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Género</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                    >
                        <option value="Drama">Drama</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Acción">Acción</option>
                        <option value="Terror">Terror</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Año</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                    />
                    {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
                </div>
            </div>

            {/* URL de Imagen */}
            <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">URL de Portada (Opcional)</label>
                <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                    placeholder="https://ejemplo.com/poster.jpg"
                />
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Descripción</label>
                <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                    placeholder="Breve resumen de la trama..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition mt-4"
            >
                {buttonText}
            </button>
        </form>
    );
}