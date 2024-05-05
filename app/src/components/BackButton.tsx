"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';


const BackButton = () => {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    return (
        <>
            <Link href="" onClick={handleClick} className="flex items-center hover:underline absolute top-20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
            </Link>
        </>
    );
}

export default BackButton;