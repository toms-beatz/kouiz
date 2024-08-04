"use client"
// Importez vos composants d'étape
import EditForm from "@/components/KouizEditForm/EditForm";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { notFound, useSearchParams } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { kouizDetails } from "@/app/api/auth/KouizDetails";
import AuthContext from "@/contexts/AuthContext";
import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, PlusCircle, SquarePen, Trash, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteKouiz } from "@/app/api/auth/DeleteKouiz";
import { buttonVariants } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Params = {
    id: string;
};

const EditKouiz = ({ params }: { params: Params }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const { toast } = useToast();
    const router = useRouter();
    // Fonction pour mettre à jour les données du formulaire
    const updateFormData = (data) => {
        setFormData({ ...formData, ...data, id: detailsInfo.id });
    };
    // Rendre le composant d'étape approprié en fonction de l'état actuel
    let currentStepComponent;
    

    const { token, setToken } = useContext(AuthContext);
    const [detailsInfo, setDetailsInfo] = useState<any>(null);
    const [idListAll, setIdList] = useState<any>([]);
    const [error, setError] = useState(null);

    switch (step) {
        case 1:
            currentStepComponent = <EditForm formData={formData} updateFormData={updateFormData} id={params.id} detailsInfo={detailsInfo} />;
            break;
        default:
            currentStepComponent = <EditForm formData={formData} updateFormData={updateFormData} id={params.id} detailsInfo={detailsInfo}/>;
    }
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
    }, []);

    useEffect(() => {
        if (error === 'Quiz not found') {
            notFound();
        }
    });

    const handleConfirmDeleteKouiz = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    description: "Vous devez être connecté pour supprimer votre kouiz.",
                    className: 'dark:bg-pBlue'
                });
                return;
            }

            // Faites appel à votre fonction d'API pour supprimer le compte
            const response = await deleteKouiz(token, detailsInfo.id);

            if (response.success === true) {
                toast({
                    description: "Votre kouiz a été supprimé avec succès.",
                    className: 'dark:bg-pBlue'
                });
            } else {
                toast({
                    description: "Une erreur est survenue lors de la suppression de votre kouiz. Veuillez réessayer.",
                    className: 'dark:bg-pBlue'
                });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            toast({
                description: "Une erreur est survenue. Veuillez réessayer.",
                className: 'dark:bg-pBlue'
            });
        }
    };

    const handleDeleteKouiz = async () => {
        await handleConfirmDeleteKouiz();
        router.push('/kouiz');

    };

    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex items-center justify-between">
                        {detailsInfo ? (
                            <>
                                <div className="flex flex-col w-full">
                                    <BackButton />
                                    <h1 className="text-3xl font-title font-bold text-pBrown">Modifier le Kouiz.</h1>
                                    <div className="flex justify-between items-center">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className={`font-title bg-pBrown flex gap-4 hover:bg-pBrown dark:text-pWhite my-8`}
                                                ><Trash/>Supprimer ce Kouiz.</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Êtes vous sûr(e) de vouloir supprimer ce Kouiz ?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Cette action est irréversible.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                    <AlertDialogAction className={`font-title ${buttonVariants({ variant: 'destructive' })}`} onClick={handleDeleteKouiz}>Supprimer</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                    {currentStepComponent}
                                </div>
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

export default EditKouiz;
