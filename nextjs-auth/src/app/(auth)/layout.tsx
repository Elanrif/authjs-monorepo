import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {MenubarHeeader} from "@/components/menubarHeader";
import Link from "next/link";
import {GalleryVerticalEnd} from "lucide-react";
import {LoginForm} from "@/components/login-form";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Next Auth app",
    description: "Generated by create next app",
};

export default function Layout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div className="grid min-h-[95vh] lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/home" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        EL-tech
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/little_girl.webp"
                    alt="Image"
                    className="absolute bg-amber-600 inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
        </body>
        </html>
    );
}
