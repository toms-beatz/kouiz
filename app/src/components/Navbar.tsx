"use client"
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { UserRoundCheck, UserRoundPlus, ArrowRight, Sun, Moon } from "lucide-react";
import { useEffect, useState } from 'react';
import MobileNav from "./MobileNav";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Icons } from './Icons'
import { Switch } from './ui/switch'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Router from "next/router"
import { usePathname } from 'next/navigation'



const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Vérifie si l'utilisateur est authentifié au chargement initial
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        // Effectue la déconnexion et met à jour l'état d'authentification
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/');
    }

    useEffect(() => {
        // Force le rechargement de la page après la connexion réussie
        if (isAuthenticated) {
            router.refresh();
        }
    }, [isAuthenticated]);

    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    useEffect(() => {
        const rootElement = document.documentElement;
        if (darkModeEnabled) {
            rootElement.classList.add('dark');
            rootElement.classList.remove('light');
            document.body.classList.add('dark:bg-sBlue');
            document.body.classList.remove('grainy');
        } else {
            rootElement.classList.add('light');
            rootElement.classList.remove('dark');
            document.body.classList.add('grainy');
            document.body.classList.remove('dark:bg-sBlue');
        }
    }, [darkModeEnabled]);
    const darkEnabled = (isChecked: boolean) => {
        setDarkModeEnabled(isChecked);
    };
    const pathname = usePathname()
    return (
        <nav className={` ${pathname == '/' ? 'sticky' : 'fixed'} h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-20 bg-pWhite lg:bg-pWhite/30 backdrop-blur-lg transition-all dark:bg-sBlue dark:border-pBlue`}>
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-pBlue">
                    <Link href="/">
                        <div className="text-pBrown font-title font-black text-xl">
                            Kouiz.
                        </div>
                    </Link>

                    <div className="flex justify-end items-center">
                        {!isAuthenticated ? (
                            <>
                                <div className="ml-auto mr-4"><MobileNav /></div>
                                <div className="hidden items-center space-x-4 sm:flex">

                                    <Link href="/login" className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                        className: 'font-title dark:hover:bg-pBlue'
                                    })} >
                                        <UserRoundCheck className='w-5 h-5 mr-2' />Connexion.
                                    </Link>
                                    <Link href="/register" className={buttonVariants({
                                        size: "sm",
                                        className: 'font-title !bg-pBrown text-pWhite dark:bg-pBrown dark:text-pWhite'
                                    })} >
                                        <UserRoundPlus className='w-5 h-5 mr-2' />Inscription.
                                    </Link>
                                </div>
                            </>
                        ) :
                            (
                                <>
                                </>
                            )}
                        <div className="flex items-center justify-evenly ml-8">
                            <Sun color="#9D775D" fill={darkModeEnabled ? "transparent" : "#9D775D"} className="w-5 h-5" />
                            <Switch onCheckedChange={darkEnabled} className="mx-2 data-[state=checked]:bg-pBlue data-[state=checked]:border-pBrown data-[state=checked]:border-0 dark:[&>*]:bg-sBlue [&>*]:ml-px" aria-label="darkmode-switch" />
                            <Moon color="#9D775D" fill={darkModeEnabled ? "#9D775D" : "transparent"} className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default Navbar;