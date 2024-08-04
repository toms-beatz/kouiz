"use client"

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { notFound, useSearchParams } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { kouizDetails } from "@/app/api/auth/KouizDetails";
import AuthContext from "@/contexts/AuthContext";
import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, PlusCircle, SquarePen, X } from "lucide-react";

type Params = {
    id: string;
};

const KouizDetail = ({ params }: { params: Params }) => {
    const { token, setToken } = useContext(AuthContext);
    const [detailsInfo, setDetailsInfo] = useState<any>(null);
    const [idListAll, setIdList] = useState<any>([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let localToken = localStorage.getItem("token");
                if (!localToken) {
                    throw new Error("No token found");
                }

                const responseKouizDetails = await kouizDetails(localToken, params.id);
                if (responseKouizDetails.success) {
                    const detailsInfo = responseKouizDetails.data;
                    setDetailsInfo(detailsInfo);
                    console.log("detailsInfo:", detailsInfo);
                } else {
                    setError("Failed to fetch quiz details");
                }
            } catch (error) {
                // console.error(error);
                if (error.status === 404) {
                    setError("Quiz not found");
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };

        fetchData();
    }, [params.id]);

    useEffect(() => {
        if (error === 'Quiz not found') {
            notFound();
        }
    });

    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-12 sm:pl-52 pt-12 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex flex-col h-full">
                        <BackButton />
                        {detailsInfo ? (
                            <>
                                <div className="flex justify-between items-center w-10/12">
                                    <span className="text-5xl my-8">{detailsInfo && detailsInfo.emoji}</span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <h1 className="text-3xl font-title font-bold text-pBrown">{detailsInfo && detailsInfo.title.charAt(0).toUpperCase() + detailsInfo.title.slice(1)}</h1>

                                    <Link
                                        href={`/kouiz/${params.id}/edit`}

                                        className="font-body flex items-center *:hover:opacity-100 *:hover:translate-x-0"
                                    >
                                        <SquarePen className="mr-2 translate-x-0 hover:text-pBrown" />
                                        <div className="transition ease-in-out opacity-0 -translate-x-10 font-bold text-pBrown">Modifier</div>
                                    </Link>

                                </div>
                                <p className="font-body lg:my-4 my-2 text-md">{detailsInfo && detailsInfo.description.charAt(0).toUpperCase() + detailsInfo.description.slice(1)}</p>
                                {detailsInfo.questions.map((question: any, index: number) => (
                                    <div key={question.id} className="my-4">
                                        <h2 className="text-xl font-bold">{index + 1}. <span className="text-pBrown">{question.text}</span></h2>
                                        <ul className="flex lg:gap-4 gap-4 mt-8 flex-wrap">
                                            {question.options.map((option: any, optionIndex: number) => (
                                                <li key={option.id} className={cn(' bg-pWhite rounded-lg lg:w-5/12 w-full px-4 py-4 border border-pGray dark:bg-pBlue dark:border-pBlue flex justify-between', option.is_correct === 1 ? 'bg-[#e1eddb]' : 'bg-[#F2BFBF]')}>{option.text} {option.is_correct === 1 ? (<Check className="text-[#6aa84f]" />) : (<X className="text-[#CC0000]" />)}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}


                            </>
                        ) : (
                            <>
                                <div className="flex flex-col">
                                    <Skeleton className="w-[60px] h-[60px] my-8 rounded-full bg-[#999] dark:bg-pBlue" />
                                    <Skeleton className="w-[150px] h-[30px] rounded-full bg-[#999] dark:bg-pBlue" />
                                    <Skeleton className="w-[150px] h-[20px] lg:my-4 my-2 rounded-full bg-[#999] dark:bg-pBlue" />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    );
};

export default KouizDetail;
