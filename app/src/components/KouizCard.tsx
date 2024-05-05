import Link from "next/link";
import { Eye, PenLine, Delete, PencilRuler, Trash2 } from "lucide-react";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

export const KouizCard = ({ id, emoji, title, description, category }) => {

    const getColorClass = (category) => {
        switch (category) {
            case 'Éducation':
                return 'bg-[#FEC89A] hover:bg-sBlue';
            case 'Divertissement':
                return 'bg-[#FCD5CE] hover:bg-sBlue';
            case 'Culture générale':
                return 'bg-[#FFB5A7] hover:bg-sBlue';
            default:
                return 'bg-[#f1f1f1] hover:bg-sBlue';
        }
    };

    const colorClass = getColorClass(category);

    const getCategoryEmoji = (category) => {
        switch (category) {
            case 'Éducation':
                return '📚';
            case 'Divertissement':
                return '🍿';
            case 'Culture générale':
                return '🧠';
            default:
                return '';
        }
    };

    const categoryEmoji = getCategoryEmoji(category);
    const formattedCategory = category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-zA-Z0-9]/g, "-");


    return (
        <>
            <div className="bg-pWhite dark:bg-pBlue border dark:border-0 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between mb-4">
                        <div className="text-2xl">{emoji}</div>
                        <Link href={`/category/${formattedCategory}`} className={cn(badgeVariants({ variant: "default" }), `${colorClass} hover:text-pWhite text-pBlue`)}>
                            {categoryEmoji} {category}
                        </Link>
                    </div>

                    <h2 className="font-title font-bold text-xl l">{title}</h2>
                    <div className="text-md break-al">{description}</div>
                </div>


                <div className="flex mt-auto justify-between">
                    <Link href={`/kouiz/view/${id}`} className="hover:underline text-pBrown font-title flex items-center text-sm">Voir<Eye className="ml-1 w-4 h-4" /></Link>
                    <Link href={`/kouiz/edit/${id}`} className="hover:underline text-pBrown font-title flex items-center text-sm">Modifier<PencilRuler className="ml-1 w-4 h-4" /></Link>
                    <Link href={`/kouiz/delete/${id}`} className="hover:underline text-pBrown font-title flex items-center text-sm">Supprimer<Trash2 className="ml-1 w-4 h-4" /></Link>
                </div>
            </div>
        </>
    );
}
