"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect } from "next/navigation";
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Eye, Delete, CirclePlus, PenLine } from "lucide-react";
import { KouizCard } from "@/components/KouizCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const Answers = () => {

    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-title font-bold text-pBrown">Mes Réponses.</h1>
                            <p className="font-body lg:my-4 my-2 text-md">Visualisez vos réponses ici.</p>
                        </div>
                        <Link href="exp://192.168.0.13:8081">
                            <span className="ml-2">Nouvelle réponse</span>
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    );
}

export default Answers;