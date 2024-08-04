"use client"
import type { Metadata } from "next";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import AuthNavbar from "@/components/AuthNavbar";
import { Unbounded, Manrope } from 'next/font/google'
import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import UserContext from '@/contexts/UserContext';
import AuthContext  from '@/contexts/AuthContext';



const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      setToken(!!token);
      console.log(token);
    };
    checkToken();
  }, []);

  return (
    <html lang="fr" className={cn("light", `${unbounded.variable} ${manrope.variable}`)}>
      <head>
        <link rel="shortcut icon" href="https://www.kouiz.fr/favicon.ico?v=2" type="image/x-icon" />
        <title>Kouiz</title>
      </head>
      <body className={cn(
        'min-h-screen font-body antialiased grainy dark:bg-sBlue',
      )}>
        <AuthContext.Provider value={{ token, setToken }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Navbar />
            {children}
            {token ? <AuthNavbar /> : ""}
            <Toaster />
          </UserContext.Provider>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
