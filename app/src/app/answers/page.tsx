"use client";
import { AnswersCard } from "@/components/AnswersCard";
import { useEffect, useState, useContext } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { listAllAnswerstoMyKouiz } from '@/app/api/auth/listAllAnswerstoMyKouiz';
import AuthContext from "@/contexts/AuthContext";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Answers = () => {
    const [kouiz, setKouiz] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);
    const [activePage, setActivePage] = useState(1);

    const [dataKouiz, setDataKouiz] = useState({
        current_page: 1,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 0,
        last_page_url: '',
        links: [],
        next_page_url: '',
        path: '',
        per_page: 9,
        prev_page_url: null,
        to: 0,
        total: 0,
    });


    const fetchData = async (page) => {
        try {
            let localToken = localStorage.getItem('token');
            const response = await listAllAnswerstoMyKouiz(localToken);
            if (response.success) {
                setDataKouiz({
                    current_page: response.data.current_page,
                    data: response.data.data,
                    first_page_url: response.data.first_page_url,
                    from: response.data.from,
                    last_page: response.data.last_page,
                    last_page_url: response.data.last_page_url,
                    links: response.data.links,
                    next_page_url: response.data.next_page_url,
                    path: response.data.path,
                    per_page: response.data.per_page,
                    prev_page_url: response.data.prev_page_url,
                    to: response.data.to,
                    total: response.data.total,
                });
            } else {
                console.error('Failed to fetch answers:', response.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData(activePage);
    }, [token, activePage]);


    const fetchKouiz = async (pageUrl) => {
        try {
            let localToken = localStorage.getItem('token');
            const response = await fetch(pageUrl, {
                headers: {
                    'Authorization': `Bearer ${localToken}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setKouiz(data.data.data);
                setDataKouiz({
                    current_page: data.data.current_page,
                    data: data.data.data,
                    first_page_url: data.data.first_page_url,
                    from: data.data.from,
                    last_page: data.data.last_page,
                    last_page_url: data.data.last_page_url,
                    links: data.data.links,
                    next_page_url: data.data.next_page_url,
                    path: data.data.path,
                    per_page: data.data.per_page,
                    prev_page_url: data.data.prev_page_url,
                    to: data.data.to,
                    total: data.data.total,
                });
            } else {
                console.error('Failed to fetch kouiz:', data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log(dataKouiz);

    return (
        <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
            <div className="sm:pt-8 sm:pl-52 pt-8 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-title font-bold text-pBrown">Réponses à mes Kouiz.</h1>
                        <p className="font-body lg:my-4 my-2 text-md">Visualisez les réponses à vos Kouiz ici.</p>
                    </div>
                </div>

                {!loading ? (
                    dataKouiz.data.length > 0 ? (
                        <div className="grid lg:grid-cols-3 lg:grid-rows-3 grid-cols-1 lg:gap-2 gap-4 *:p-6 lg:mt-4 mt-12">
                            {dataKouiz.data.map((answer) => (
                                <AnswersCard
                                    key={answer.id}
                                    id={answer.id}
                                    kouiz={answer.kouiz}
                                    option={answer.id}
                                    question={answer.id}
                                    questions_total={answer.nombre_question_total}
                                    bonnes_reponses={answer.nombre_bonnes_reponses}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-pWhite dark:bg-pBlue border dark:border-0 rounded-xl space-y-2 flex flex-col w-full p-12">
                            <div className="flex flex-col justify-center items-center w-full gap-8">
                                <p className="text-center text-gray-500 dark:text-gray-300">
                                    Vous n'avez pas encore de réponses à vos Kouiz.
                                </p>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="bg-pWhite dark:bg-pBlue border dark:border-0 rounded-xl space-y-2 flex flex-col w-full p-12">
                        <div className="flex flex-col justify-center items-center w-full gap-8">
                            <svg
                                aria-hidden="true"
                                className="inline w-8 h-8 text-pGray animate-spin dark:text-gray-600 fill-pBrown dark:fill-pBrown"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* SVG path */}
                            </svg>
                        </div>
                    </div>
                )}


                <div className="flex lg:w-1/2 w-full justify-center lg:mx-auto">

                    {dataKouiz.total > dataKouiz.per_page && (
                        <Pagination className="mt-8">
                            <PaginationContent className="flex flex-col flex-wrap gap-4">
                                <div className="flex gap-2">
                                    {Array.from({ length: dataKouiz.last_page }, (_, i) => i + 1)
                                        .filter(
                                            (pageNumber) =>
                                                pageNumber === 1 ||
                                                pageNumber === dataKouiz.last_page ||
                                                pageNumber === dataKouiz.current_page
                                        )
                                        .map((pageNumber, index, array) => (
                                            <>
                                                {index > 0 && array[index - 1] !== pageNumber - 1 && (
                                                    <PaginationEllipsis>...</PaginationEllipsis>
                                                )}
                                                <PaginationItem>
                                                    <PaginationLink
                                                        onClick={() =>
                                                            fetchData(pageNumber)
                                                        }
                                                        isActive={dataKouiz.current_page === pageNumber}
                                                    >
                                                        {pageNumber}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            </>
                                        ))}
                                </div>
                                <div className="flex gap-2">
                                    {dataKouiz.prev_page_url && (
                                        <PaginationPrevious
                                            onClick={() => fetchData(dataKouiz.prev_page_url)}
                                            className="!border-pGray"
                                        >
                                            Précédent
                                        </PaginationPrevious>
                                    )}
                                    {dataKouiz.next_page_url && (
                                        <PaginationNext
                                            onClick={() => fetchData(dataKouiz.next_page_url)}
                                            className="!border-pGray"
                                        >
                                            Suivant
                                        </PaginationNext>
                                    )}
                                </div>
                            </PaginationContent>
                        </Pagination>
                    )}

                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default Answers;
