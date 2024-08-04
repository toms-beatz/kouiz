"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { Rocket, Blocks } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);
  console.log(`%c
     ((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
   ((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((///,         ,*((((((((((((((((((((/*,.        .,*//((((((((((((((((((((
((((((((///,         ,*((((((((((((((((((/**.        .,///((((((((((((((((((((((
((((((((///,         ,*(((((((((((((((///,.        .,///((((((((((((((((((((((((
((((((((///,         ,*(((((((((((((///,         .,*/(((((((((((((((((((((((((((
((((((((///,         ,*(((((((((((((*,.        .,*/(((((((((((((((((((((((((((((
((((((((///,         ,*((((((((((/*,.        .,/((((((((((((((((((((((((((((((((
((((((((///,         ,*((((((((/*,.        .,///((((((((((((((((((((((((((((((((
((((((((///,         ,*(((((///,.        .,///((((((((((((((((((((((((((((((((((
((((((((///,         ,*(((///,            .,*/((((((((((((((((((((((((((((((((((
((((((((///,         ,*(((*,.               ,*//((((((((((((((((((((((((((((((((
((((((((///,         ,*/*,.                  .,*((((((((((((((((((((((((((((((((
((((((((///,         .,,.        .,*,.         ,*//(((((((((((((((((((((((((((((
((((((((///,                   .*//(/*,.         ,///(((((((((((((((((((((((((((
((((((((///,                 ,*//(((///,          .,/((((((((///*****///((((((((
((((((((///,              .,*//(((((((//*,         .,*//((///*.       .,*(((((((
((((((((///,            .,*/(((((((((((((*,.         .,////**,         .*///((((
((((((((///,          ..*/(((((((((((((((//*,         .,*///*,.        .*//(((((
((((((((///,         ,*//((((((((((((((((((/*,.         .,///*,.     .,*/(((((((
(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((///////((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
   ((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
     (((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((  
     
     © Kouiz. 2024 - Coded with ❤️ by TOM$ - https://www.thomas-mazeau.com
`, 'color: #9D775D');

  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm-mt:40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-24 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-pBrown text-pWhite px-3 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className='text-sm font-body font-semibold text-gray-700 flex'>
            <Blocks className='w-5 h-5 mr-2' /> Kouiz est toujours en construction
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <h1 className='font-title max-w-4xl text-4xl font-bold md:text-6xl lg-:text-7xl text-pBlue dark:text-pWhite'>
            Bienvenue sur <span className='text-pBrown font-black'>Kouiz</span>.
          </h1>
        </div>
        <p className='font-body my-5 max-w-prose text-zinc-700 sm:text-lg text-pBlue dark:text-pWhite'>
          Créez des quiz et partagez-les avec vos amis, votre famille ou le monde entier.
        </p>
        {/* <Link className={buttonVariants({
          size: 'lg',
          className: 'font-title mt-5 !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite'
        })} href='/register'>
          Commencer <ArrowRight className='w-5 h-5 ml-2' />
        </Link> */}
      </MaxWidthWrapper>
      <div>
        <div className='relative isolate'>

          <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9d775d] to-[#ffe3cb] opacity-3 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-12 flow-root sm:mt-14'>
                <Image
                  src="/dashboard-preview.png"
                  alt='Kouiz dashboard preview'
                  width={2880}
                  height={1574}
                  quality={100}
                  className='!text-pBrown rounded-md shadow-2xl border dark:hidden'
                />
                <Image
                  src="/dashboard-preview-dark.png"
                  alt='Kouiz dashboard preview dark'
                  width={2880}
                  height={1574}
                  quality={100}
                  className='!text-pBrown rounded-md shadow-2xl hidden dark:flex'
                />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'></div>
          </div>
        </div>
      </div>
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56 flex flex-col justify-center items-center'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='font-title mt-2 font-bold text-4xl text-gray-900 sm:text-5xl text-pBlue dark:text-pWhite'>
              Créez des Kouiz dès <span className='text-pBrown'>maintenant</span>
            </h2>
          </div>
        </div>

        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:boder-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-black text-blue-600 font-body text-pBlue dark:text-pWhite'>Étape 1</span>
              <span className='text-xl font-semibold font-title text-pBrown'>Créez un compte</span>
              <span className='mt-2 text-zinc-700 font-body'>
                <Link href='/register' className='text-blue-700 underline underline-offset-2'>Créez un compte</Link> pour démarrer l'aventure !
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:boder-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-black text-blue-600 font-body text-pBlue dark:text-pWhite'>Étape 2</span>
              <span className='text-xl font-semibold font-title text-pBrown'>Créez votre premier Kouiz</span>
              <span className='mt-2 text-zinc-700 font-body'>
                Commencez dès maintenant à créér des Kouiz grâce à notre interface intuitive et facile à prendre en main.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:boder-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-black text-blue-600 font-body text-pBlue dark:text-pWhite'>Étape 3</span>
              <span className='text-xl font-semibold font-title text-pBrown'>Répondez à des Kouiz</span>
              <span className='mt-2 text-zinc-700 font-body'>
                Répondez à des kouiz proposés par d'autres utilisateurs.
              </span>
            </div>
          </li>
        </ol>
        <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-12 flow-root sm:mt-14'>
                <Image
                  src="/kouiz-preview.png"
                  alt='Kouiz preview'
                  width={2880}
                  height={1574}
                  quality={100}
                  className='!text-pBrown rounded-md shadow-2xl border dark:hidden'
                />
                <Image
                  src="/kouiz-preview-dark.png"
                  alt='Kouiz preview dark'
                  width={2880}
                  height={1574}
                  quality={100}
                  className='!text-pBrown rounded-md shadow-2xl hidden dark:flex'
                />
              </div>
            </div>
          </div>
        <Link className={buttonVariants({
          size: 'lg',
          className: 'font-title mt-12 !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite w-64 rocket-label overflow-hidden'
        })} href='/register'>
          Je m'inscris <Rocket className='w-5 h-5 ml-2 rocket' />
        </Link>
        <Link className="underline underline-offset-2 text-sm mt-4 font-medium" href='/login'>
          J'ai déjà un compte
        </Link>
      </div>
    </>
  );
}
