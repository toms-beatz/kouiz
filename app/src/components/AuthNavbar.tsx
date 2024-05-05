"use client"
import { redirect } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { UserRound, LayoutGrid, GalleryVerticalEnd, LogOut, Send, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'

const AuthNavbar = () => {
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifie si l'utilisateur est authentifié au chargement initial
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        redirect('/')
    }

    const showNavbar = ['/dashboard', '/kouiz', '/profile', '/answers'].some(path => pathname.startsWith(path));

    if (!showNavbar) {
        return null; 
    }

    return (
        <>
            <div className="sm:hidden">
                <nav className="fixed h-14 inset-x-0 bottom-0 z-30 w-full border-t border-gray-20 bg-pWhite lg:bg-pWhite/30 backdrop-blur-lg transition-all dark:bg-sBlue dark:border-pBlue *:!px-0">
                    <MaxWidthWrapper>
                        <div className="flex h-14 dark:border-pBlue">
                            <Link href="/dashboard" className={`${pathname.startsWith('/dashboard') ? "bg-pGray dark:bg-pBlue" : ""} w-3/12 h-full flex items-center justify-center`}>
                                <div className="text-pBrown font-title font-black text-xl">
                                    <LayoutGrid />
                                </div>
                            </Link>

                            <Link href="/kouiz" className={`${pathname.startsWith('/kouiz') ? "bg-pGray dark:bg-pBlue" : ""} w-3/12 h-full flex items-center justify-center`}>
                                <div className="text-pBrown font-title font-black text-xl">
                                    <GalleryVerticalEnd />
                                </div>
                            </Link>

                            <Link href="/answers" className={`${pathname.startsWith('/answers') ? "bg-pGray dark:bg-pBlue" : ""} w-3/12 h-full flex items-center justify-center`}>
                                <div className="text-pBrown font-title font-black text-xl">
                                    <Send />
                                </div>
                            </Link>

                            <Link href="/profile" className={`${pathname.startsWith('/profile') ? "bg-pGray dark:bg-pBlue" : ""} w-3/12 h-full flex items-center justify-center`}>
                                <div className="text-pBrown font-title font-black text-xl">
                                    <UserRound />
                                </div>
                            </Link>
                        </div>
                    </MaxWidthWrapper>
                </nav>
            </div>

            <div className="hidden sm:flex">
                <aside className="fixed top-0 left-0 z-20 w-64 h-full transition-transform bg-pWhite dark:bg-pBlue border-r mt-14">
                    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">
                        <ul className="font-medium *:py-4 *:px-6">
                            <li className={`${pathname.startsWith('/dashboard') ? "bg-pGray dark:bg-sBlue" : ""} hover:bg-pGray dark:hover:bg-sBlue`}>
                                <Link href="/dashboard" className="w-full h-full">
                                    <div className={`w-full h-full flex items-center font-title font-black text-xl  ${pathname.startsWith('/dashboard') ? 'text-pBrown' : ''}`}>
                                        <LayoutGrid /><span className="font-title font-medium text-sm ml-4">Dashboard.</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${pathname.startsWith('/kouiz') ? "bg-pGray dark:bg-sBlue" : ""} hover:bg-pGray dark:hover:bg-sBlue`}>
                                <Link href="/kouiz" className="w-full h-full">
                                    <div className={`w-full h-full flex items-center font-title font-black text-xl  ${pathname.startsWith('/kouiz') ? 'text-pBrown' : ''}`}>
                                        <GalleryVerticalEnd /><span className="font-title font-medium text-sm ml-4">Kouiz.</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${pathname.startsWith('/answers') ? "bg-pGray dark:bg-sBlue" : ""} hover:bg-pGray dark:hover:bg-sBlue`}>
                                <Link href="/answers" className="w-full h-full">
                                    <div className={`w-full h-full flex items-center font-title font-black text-xl  ${pathname.startsWith('/answers') ? 'text-pBrown' : ''}`}>
                                        <Send /><span className="font-title font-medium text-sm ml-4">Réponses.</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${pathname.startsWith('/profile') ? "bg-pGray dark:bg-sBlue" : ""} hover:bg-pGray dark:hover:bg-sBlue`}>
                                <Link href="/profile" className="w-full h-full">
                                    <div className={`w-full h-full flex items-center font-title font-black text-xl  ${pathname.startsWith('/profile') ? 'text-pBrown' : ''}`}>
                                        <UserRound /><span className="font-title font-medium text-sm ml-4">Profil.</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <div className="p-4 text-sm mt-auto mb-14">
                            <Link
                                href='/'
                                className="font-body text-pBrown flex items-center *:hover:opacity-100 *:hover:translate-x-0"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-2 translate-x-0" />
                                <div className="transition ease-in-out opacity-0 -translate-x-10 font-bold">Me déconnecter</div>
                            </Link>
                        </div>

                    </div>

                </aside>
            </div>
        </>
    );
}

export default AuthNavbar;