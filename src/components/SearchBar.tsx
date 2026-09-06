"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [text, setText] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(text);
        }, 300); 

        return () => clearTimeout(timer);
    }, [text, onSearch]);

    return (
        <div className="w-full max-w-md">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Buscar series por nombre..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
        </div>
    );
}