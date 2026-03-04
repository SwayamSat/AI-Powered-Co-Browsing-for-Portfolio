"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="grain-overlay min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24">
                <div className="max-w-[1200px] mx-auto px-6 mb-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
                <ServicesSection />
            </main>
            <Footer />
        </div>
    );
}
