"use client"
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, Sun, Moon } from "lucide-react";
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


const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    useEffect(() => {
        const rootElement = document.documentElement;
        if (darkModeEnabled) {
          rootElement.classList.add('dark');
          rootElement.classList.remove('light');
        } else {
          rootElement.classList.add('light');
          rootElement.classList.remove('dark');
        }
      }, [darkModeEnabled]);
    const darkEnabled = (isChecked: boolean) => {
        setDarkModeEnabled(isChecked);
    };

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/90 backdrop-blur-lg transition-all dark:bg-pBlue/50 dark:border-pBlue">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-pBlue">
                    <Link
                        href="/"
                        className="flex z-40 font-semibold">
                        <span>Kouiz.</span>
                    </Link>
                    <div className="ml-auto mr-4"><MobileNav /></div>
                    <div className="flex justify-end items-center">
                        {!isAuthenticated ? (
                            <div className="hidden items-center space-x-4 sm:flex">
                                <>
                                    <Link href="/auth/login" className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })} >
                                        Sign in
                                    </Link>
                                    <Link href="auth/register" className={buttonVariants({
                                        size: "sm",
                                        className: ' !bg-pBrown text-pWhite dark:bg-pBrown dark:text-pWhite'
                                    })} >
                                        Get started <ArrowRight className="ml-1.5 w-5 h-5" />
                                    </Link>
                                </>
                            </div>
                        ) :
                            (
                                <>
                                    <Link
                                        href='/dashboard'
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'sm',
                                        })}>
                                        Dashboard
                                    </Link>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            className='overflow-visible'>
                                            <Button className='rounded-full h-8 w-8 aspect-square bg-slate-400'>
                                                <Avatar className='relative w-8 h-8'>
                                                    <AvatarFallback>
                                                        <span className='sr-only'>Test</span>
                                                        <Icons.user className='h-4 w-4 text-zinc-900' />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className='bg-white' align='end'>
                                            <div className='flex items-center justify-start gap-2 p-2'>
                                                <div className='flex flex-col space-y-0.5 leading-none'>
                                                    <p className='font-medium text-sm text-black'>
                                                        Test
                                                    </p>
                                                    <p className='w-[200px] truncate text-xs text-zinc-700'>
                                                        test@test.com
                                                    </p>
                                                </div>
                                            </div>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem asChild>
                                                <Link href='/dashboard'>Dashboard</Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem className='cursor-pointer'>
                                                <Link
                                                    href='#'
                                                    className={buttonVariants({
                                                        size: 'sm',
                                                    })}
                                                    onClick={handleLogout}
                                                >
                                                    Déconnexion
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )}
                        <div className="flex items-center justify-evenly ml-8">
                            <Sun color={darkModeEnabled ? "gray" : "gray"} fill={darkModeEnabled ? "transparent" : "gray"} className="w-5 h-5" />
                            <Switch onCheckedChange={darkEnabled} className="mx-2" />
                            <Moon color={darkModeEnabled ? "gray" : "gray"} fill={darkModeEnabled ? "gray" : "transparent"} className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default Navbar;