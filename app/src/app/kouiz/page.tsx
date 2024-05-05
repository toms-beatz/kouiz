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


const Kouiz = () => {

    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-title font-bold text-pBrown">Mes Kouiz.</h1>
                            <p className="font-body lg:my-4 my-2 text-md">Gérez vos Kouiz ici.</p>
                        </div>
                        <Link className={buttonVariants({
                            className: 'font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite lg:m-0 my-4'
                        })} href='/kouiz/create'>
                            <CirclePlus className='w-5 h-5 mr-2' />Crééz un Kouiz
                        </Link>
                    </div>


                    <div className="grid lg:grid-cols-3 lg:grid-rows-3 grid-cols-1 lg:gap-2 gap-4 *:p-6 mt-4">
                        <KouizCard id="1" emoji="💥" title="Blockbusters Hollywoodiens" description="Kouiz sur les plus grand blockbusters d'Hollywood" category="Divertissement"/>
                        <KouizCard id="2" emoji="🇬🇧" title="Present Perfect" description="Le present perfect est un temps du passé qui est souvent utilisé en anglais. Il se construit à l’aide de l’auxiliaire HAVE et du participe passé. On l’utilise principalement pour parler d’une action passée liée au présent,  comme un constat, ou une action dont on voit la continuité dans le présent." category="Éducation"/>
                        <KouizCard id="3" emoji="🚀" title="L'Homme et l'espace" description="Apprenez en plus sur la relation si particulière que l'Homme entretien avec l'espace à travers ce Kouiz." category="Culture générale"/>

                        <KouizCard id="1" emoji="💥" title="Blockbusters Hollywoodiens" description="Kouiz sur les plus grand blockbusters d'Hollywood" category="Divertissement"/>
                        <KouizCard id="2" emoji="🇬🇧" title="Present Perfect" description="Le present perfect est un temps du passé qui est souvent utilisé en anglais. Il se construit à l’aide de l’auxiliaire HAVE et du participe passé. On l’utilise principalement pour parler d’une action passée liée au présent,  comme un constat, ou une action dont on voit la continuité dans le présent." category="Éducation"/>
                        <KouizCard id="3" emoji="🚀" title="L'Homme et l'espace" description="Apprenez en plus sur la relation si particulière que l'Homme entretien avec l'espace à travers ce Kouiz." category="Culture générale"/>

                        <KouizCard id="1" emoji="💥" title="Blockbusters Hollywoodiens" description="Kouiz sur les plus grand blockbusters d'Hollywood" category="Divertissement"/>
                        <KouizCard id="2" emoji="🇬🇧" title="Present Perfect" description="Le present perfect est un temps du passé qui est souvent utilisé en anglais. Il se construit à l’aide de l’auxiliaire HAVE et du participe passé. On l’utilise principalement pour parler d’une action passée liée au présent,  comme un constat, ou une action dont on voit la continuité dans le présent." category="Éducation"/>
                        <KouizCard id="3" emoji="🚀" title="L'Homme et l'espace" description="Apprenez en plus sur la relation si particulière que l'Homme entretien avec l'espace à travers ce Kouiz." category="Culture générale"/>
                    </div>
                    {/* <div className="mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div> */}
                </div>
            </MaxWidthWrapper>
        </>
    );
}

export default Kouiz;