"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EducationSection from "@/components/EducationSection";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function EducationPage() {
    const [data, setData] = useState<null | {
        title: string;
        institution: string;
        period: string;
        highlights: string[];
    }[]>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/portfolio/education`)
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
                        <div className="mt-6 mb-2 grid sm:grid-cols-2 gap-4">
                            {data.map((d) => (
                                <div key={d.institution} className="p-4 rounded-2xl border border-border bg-secondary/30 flex gap-3">
                                    <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-primary font-medium mb-1">{d.period}</p>
                                        <p className="font-heading text-sm font-semibold">{d.title}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{d.institution}</p>
                                        <ul className="mt-2 space-y-1">
                                            {d.highlights.map((h) => (
                                                <li key={h} className="text-xs text-muted-foreground">• {h}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <EducationSection />
            </main>
            <Footer />
        </div>
    );
}
