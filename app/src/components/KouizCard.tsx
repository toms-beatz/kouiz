import Link from "next/link";
import { Eye, PencilRuler, Trash } from "lucide-react";
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
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteKouiz } from "@/app/api/auth/DeleteKouiz";

export const KouizCard = ({ id, emoji, title, description }) => {
    const { toast } = useToast();

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
                        <div className="text-2xl">{emoji}</div>
                    </div>

                    <h2 className="font-title font-bold text-xl">{title}</h2>
                    <div className="text-md">{description}</div>
                </div>


                <div className="flex mt-auto justify-between">
                    <Link href={`/kouiz/${id}`} className="hover:underline text-pBrown font-title flex items-center text-sm">Voir<Eye className="ml-1 w-4 h-4" /></Link>
                    <Link href={`/kouiz/${id}/edit`} className="hover:underline text-pBrown font-title flex items-center text-sm">Modifier<PencilRuler className="ml-1 w-4 h-4" /></Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Link className="hover:underline text-pBrown font-title flex items-center text-sm" href={''}>
                                Supprimer<Trash className="ml-1 w-4 h-4" />
                            </Link>
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
            </div>
        </>
    );
}
