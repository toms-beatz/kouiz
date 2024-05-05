"use client"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { redirect } from 'next/navigation'
import { RectangleEllipsis } from 'lucide-react'


const PasswordReset = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            redirect('/dashboard');
        }
    }, []);
    return (
        <>
            <div>
                <div className='relative isolate'>
                    <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-70 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-100'>
                        <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pBrown to-pBeige opacity-3 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
                    </div>

                    <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen">
                        <div className="w-full bg-pWhite dark:bg-pBlue rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="font-title text-pBrown text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    <RectangleEllipsis className='w-5 h-5 mr-2' />Mot de passe oublié.
                                </h1>
                                <div className="space-y-8 md:space-y-6">
                                    <div>
                                        <div className="flex"><Label htmlFor="email" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Email</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                                        <Input type="email" name="email" id="email" className="font-body bg-[#f3f3f3] border sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]" placeholder="contact@kouiz.fr" required />
                                        {/* {errorMessages.email && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errorMessages.email}</p>} */}
                                    </div>
                                    
                                    <div>
                                        <Link href="" className={buttonVariants({
                                            size: "lg",
                                            className: '!bg-pBrown font-title dark:text-pWhite'
                                        })}>Changer mon mot de passe</Link>
                                        <p className="text-sm font-medium font-body text-pBlue dark:text-pWhite mt-6">
                                            Vous avez retrouvé votre mot de passe ? <Link href="/login" className="font-black hover:underline text-pBrown">Connectez-vous.</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-40 dark:!-top-70 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-100'>
                        <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pBrown to-pBlue opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PasswordReset;