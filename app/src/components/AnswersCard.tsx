import Link from "next/link";
import { Eye, PenLine, Delete, PencilRuler, Trash } from "lucide-react";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteKouiz } from "@/app/api/auth/DeleteKouiz";

export const AnswersCard = ({ id, kouiz, option, question, questions_total, bonnes_reponses }) => {
    const { toast } = useToast();
    const router = useRouter();

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
            const response = await deleteKouiz(token, id);

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
            console.error('Erreur lors de la suppression du kouiz:', error);
            toast({
                description: "Une erreur est survenue. Veuillez réessayer.",
                className: 'dark:bg-pBlue'
            });
        }
    };

    const handleDeleteKouiz = async () => {
        await handleConfirmDeleteKouiz();
        location.reload();

    };

    return (
        <>
            <div className="bg-pWhite dark:bg-pBlue border dark:border-0 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between mb-4">
                        {bonnes_reponses > questions_total / 2 ? (
                            <div className="text-2xl">✅</div>
                        ) : (
                            bonnes_reponses < questions_total / 2 ? (
                                <div className="text-2xl">❌</div>
                            ) : (
                                <div className="text-2xl">😬</div>
                            )
                        )}
                    </div>

                    <h2 className="font-title font-semibold text-xl">{kouiz.title}</h2>
                    <div className="text-md">{question.id}</div>
                </div>


                <div className="flex mt-auto justify-between">
                    <Link href={`/answers/${id}`} className="hover:underline text-pBrown font-title flex items-center text-sm">Voir<Eye className="ml-1 w-4 h-4" /></Link>
                </div>
            </div>
        </>
    );
}
