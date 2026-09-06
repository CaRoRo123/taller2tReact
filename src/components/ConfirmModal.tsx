"use client";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, onConfirm, onCancel }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 text-center space-y-4">
                <h3 className="text-lg font-bold text-white">¿Eliminar serie?</h3>
                <p className="text-sm text-slate-300">
                    Estás a punto de eliminar {title} Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                    >
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}