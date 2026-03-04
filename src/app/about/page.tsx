"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    const [data, setData] = useState<null | {
        bio: string;
        stats: { label: string; value: number; suffix: string }[];
        highlights: string[];
    }>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/portfolio/about`)
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
                        <div className="mt-6 mb-2 p-5 rounded-2xl border border-border bg-secondary/30">
                            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-2">Quick Highlights</p>
                            <ul className="grid sm:grid-cols-2 gap-2">
                                {data.highlights.map((h) => (
                                    <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-accent mt-0.5">✦</span> {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
}
