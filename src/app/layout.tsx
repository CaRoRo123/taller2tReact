import "./globals.css";
import { ReactNode } from "react";
import { SeriesProvider } from "@/context/ContextoSeries";
import Navbar from "@/components/NavBar";

export const metadata = {
    title: "Catálogo de Series",
    description: "App para gestionar series de TV",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
            <body className="bg-slate-950 text-slate-100 min-h-screen">
                <SeriesProvider>
                    <Navbar />
                    <main className="max-w-6xl mx-auto p-4">{children}</main>
                </SeriesProvider>
            </body>
        </html>
    );
}