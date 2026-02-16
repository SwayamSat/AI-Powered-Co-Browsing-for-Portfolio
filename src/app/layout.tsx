import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
    title: "Swayam Satpathy — AI Engineer | ML Developer",
    description: "Portfolio of Swayam Satpathy — AI Engineer specializing in Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI.",
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-primary selection:text-primary-foreground`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
