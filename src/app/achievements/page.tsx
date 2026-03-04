"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AchievementsSection from "@/components/AchievementsSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AchievementsPage() {
    const [data, setData] = useState<null | {
        title: string;
        desc: string;
        year: string;
        category: string;
    }[]>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/portfolio/achievements`)
            .then((r) => r.json())
            .then(setData)
            .catch(console.error);
    }, []);

    const categories = data ? data.map((a) => a.category).filter((c, i, arr) => arr.indexOf(c) === i) : [];

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
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {categories.map((c) => (
                                <span key={c} className="text-xs px-3 py-1 rounded-full bg-glow-purple/10 text-glow-purple border border-glow-purple/20">
                                    {c}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <AchievementsSection />
            </main>
            <Footer />
        </div>
    );
}
