"use client"
import Link from "next/link";

const Footer = () => {

    return (
        <footer className="font-title text-xs flex justify-center items-center h-14 inset-x-0 top-0 z-30 w-full border-t bg-pWhite lg:bg-pWhite/30 backdrop-blur-lg transition-all dark:bg-sBlue/50 dark:border-pBlue">
            ©<Link className="font-black hover:underline text-pBrown mx-1" href="/">Kouiz.</Link> 2024 - Coded with <span className="mx-1">❤️</span> by <Link target="_blank" className="font-bold hover:underline text-pBrown ml-1" href="https://thomas-mazeau.com">TOM$</Link>
        </footer>
    );
}

export default Footer;