"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";

const Dashboard = () => {

    // useEffect(() => {
    //     const apiKey = 'cEYS65q9UZmtLQ8Q5llQcQ==9PGwWlMlqpH9aGxW';

    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=knowledge`, {
    //                 headers: {
    //                     'X-Api-Key': apiKey
    //                 }
    //             });
    //             setAuthor(response.data[0].author)
    //             setQuote(response.data[0].quote)
    //         } catch (error) {
    //             console.error('Error:', error.response.data);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <>

            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-title font-bold text-pBrown">Mon dashboard</h1>
                        <p className="font-body lg:my-4 my-2 text-md">Visualiser des données sur vos Kouiz.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 *:bg-pWhite *:dark:bg-pBlue *:p-12 mt-4">
                        <div className="lg:row-span-2 col-span-2 lg:col-span-1 grid rounded-lg border dark:border-0">
                            <div className="text-2xl wave-title font-title font-bold text-pBrown mb-4">
                                Hello TOM$, <span className="wave">👋</span>
                            </div>
                            <div className="font-body w-full flex font-black text-md text-[#999999]">
                                Vous êtes inscris depuis le 29 Avril 2024 🫶
                            </div>
                            <div className="font-body w-full flex font-black text-md text-[#999999]">
                                Vous êtes né le 09 Septembre 2001 🥳 Vous avez donc 22 ans
                            </div>
                            <div className="font-body w-full flex font-black text-md text-[#999999]">
                                Pour répondre à nos Kouiz, téléchargez notre app 👇
                            </div>
                            <div className="flex lg:mt-0 mt-8">
                                <div className="flex flex-row lg:gap-4 gap-2 justify-center items-center">
                                    <Image
                                        src="/apple.png"
                                        alt='Apple download badge'
                                        width={1280}
                                        height={403}
                                        quality={100}
                                        className='!text-pBrown rounded-md shadow-2xl lg:w-3/6 w-1/2'
                                    />
                                    <Image
                                        src="/google.svg"
                                        alt='Google download badge'
                                        width={861}
                                        height={255}
                                        quality={100}
                                        className='!text-pBrown rounded-md shadow-2xl lg:w-3/6 w-1/2'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid col-span-2 rounded-lg border dark:border-0">
                            <div className="flex items-center gap-4">
                                <div className="flex w-1/6 justify-center items-center text-5xl">
                                    🌟
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                    <div className="font-body w-full flex font-black text-md text-[#999999]">
                                        Votre Kouiz star.
                                    </div>

                                    <div className="font-title w-full flex text:xl lg:text-2xl font-bold text-pBrown">
                                        Musiques des années 2000
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid col-span-2 lg:col-span-1 rounded-lg border dark:border-0 bg-gray-200 dark:bg-gray-800">
                            <div className="flex flex-col lg:items-start items-center gap-4">
                                <div className="flex w-1/6 items-center text-5xl">
                                    📚
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                    <div className="font-body w-full lg:justify-start justify-center flex font-black text-md text-[#999999]">
                                        Vos Kouiz.
                                    </div>
                                    <div className="font-title w-full lg:justify-start justify-center flex text-3xl lg:text-4xl font-bold text-pBrown">
                                        18
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid col-span-2 lg:col-span-1 rounded-lg border dark:border-0 bg-gray-200 dark:bg-gray-800">
                            <div className="flex flex-col lg:items-start items-center gap-4">
                                <div className="flex w-1/6 items-center text-5xl">
                                    📝
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                    <div className="font-body w-full lg:justify-start justify-center flex font-black text-md text-[#999999]">
                                        Réponses totales à vos Kouiz.
                                    </div>

                                    <div className="font-title w-full lg:justify-start justify-center flex text-3xl lg:text-4xl font-bold text-pBrown">
                                        56
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </MaxWidthWrapper>
        </>
    );
}

export default Dashboard;