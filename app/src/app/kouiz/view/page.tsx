"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from 'lucide-react';
import BackButton from "@/components/BackButton";


const KouizCreate = () => {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <BackButton/>
                            <h1 className="text-3xl font-title font-bold text-pBrown">Création de Kouiz.</h1>
                        </div>
                    </div>

                </div>
            </MaxWidthWrapper>
        </>
    );
}

export default KouizCreate;