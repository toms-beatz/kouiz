"use client"
import Link from 'next/link';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <MaxWidthWrapper className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className='text-9xl font-title font-bold text-pBrown'>404</h1>
        <div className='text-xl mt-4 mb-8'>Cette page n'existe pas</div>
        <div>
          {!isAuthenticated ?
            (
              <Link className={buttonVariants({
                className: 'font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite'
              })} href='/'>
                <Home className='w-5 h-5 lg:mr-2' /> Aller sur la page d'accueil
              </Link>
            ) :
            (
              <Link className={buttonVariants({
                className: 'font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite mt-8'
              })} href='/dashboard'>
                <ArrowLeft className='w-5 h-5 lg:mr-2' /> Retourner au dashboard
              </Link>
            )
          }
        </div>
      </MaxWidthWrapper>
    </>
  );
}