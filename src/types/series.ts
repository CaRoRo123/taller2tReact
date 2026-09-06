export interface Series {
    id: string;
    title: string;
    description: string;
    genre: string;
    year: number;
    isFavorite: boolean;
    imageUrl?: string; // Opcional, por si no tienen imagen a mano
}

export interface SeriesFormData {
    title: string;
    description: string;
    genre: string;
    year: number;
    imageUrl?: string;
}
export interface FormErrors {
    title?: string;
    description?: string;
    genre?: string;
    year?: string;
}