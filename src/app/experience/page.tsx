"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceSection from "@/components/ExperienceSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ExperiencePage() {
    const [data, setData] = useState<null | {
        role: string;
        company: string;
        period: string;
        location: string;
        tech: string[];
    }[]>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/portfolio/experience`)
            .then((r) => r.json())
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <div className="grain-overlay min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24">
                <div className="max-w-[1200px] mx-auto px-6 mb-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    {data && (
                        <div className="mt-6 mb-2 flex flex-wrap gap-2">
                            {data.flatMap((e) => e.tech).map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <ExperienceSection />
            </main>
            <Footer />
        </div>
    );
}
