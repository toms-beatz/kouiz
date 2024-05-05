"use client"
import Link from "next/link";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Info } from 'lucide-react'
import { useState } from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const Step1 = ({ formData, updateFormData, nextStep }) => {

    const [emoji, setEmoji] = useState({ id: "", shortcodes: "", native: "", size: "", fallback: "", set: "", skin: "" });
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [categoryError, setCategoryError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');


    const validateForm = () => {
        // Réinitialiser toutes les erreurs
        setCategoryError('');
        setTitleError('');
        setDescriptionError('');

        let hasError = false;

        if (!category) {
            setCategoryError("Veuillez sélectionner une catégorie.");
            hasError = true;
        }

        if (!title.trim()) {
            setTitleError("Le titre est requis.");
            hasError = true;
        }

    if (!description.trim()) {
        setDescriptionError("La description est requise.");
        hasError = true;
    }

    // Si des erreurs sont détectées, arrêtez ici
    if (hasError) {
        return;
    }

    // Si pas d'erreurs, passer à l'étape suivante
    updateFormData({ emoji: emoji.native, category, title, description });
    nextStep();
};


return (
    <div className="w-full bg-pWhite dark:bg-pBlue border dark:border-0 rounded-lg flex flex-col justify-center shadow md:mt-0 xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <h2 className="font-title text-pBrown text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-8">
                <Info className='w-5 h-5 mr-2' />Informations générales.
            </h2>
            <div className="flex lg:flex-row flex-col lg:gap-8 w-full">
                <div className="lg:w-1/2">
                    <div className="flex"><Label className="block mb-2 text-lg font-bold font-body text-pBlue dark:text-pWhite">Emoji</Label></div>
                    <div className="flex items-start justify-around">
                        <Popover>
                            <PopoverTrigger>
                                <div className="rounded-full h-20 w-20 flex justify-center items-center bg-pBlue dark:bg-pBrown">
                                    {emoji.native ? (<div className="text-5xl">{emoji.native}</div>) : (<div className="text-xs text-pWhite">Cliquez pour choisir un emoji</div>)}
                                </div>
                                <div className="bg-pBlue dark:bg-pBrown w-20 h-20 rounded-full relative -top-20 opacity-0 hover:opacity-100 text-xs flex justify-center items-center text-pWhite font-medium">Cliquez pour changer</div>
                            </PopoverTrigger>
                            <PopoverContent className="flex justify-center items-center border-0 bg-transparent p-0">
                                <Picker locale="fr" data={data} onEmojiSelect={setEmoji} className="ml-24" />
                            </PopoverContent>
                        </Popover>
                        <div className="lg:hidden block mt-8">Cliquez pour changer l'emoji</div>
                    </div>

                </div>
                
            </div>
            <div className="flex lg:flex-row flex-col gap-8 w-full !-mt-12">
                <div className="lg:w-1/2">
                    <div className="flex"><Label htmlFor="title" className="block mb-2 text-lg font-bold font-body text-pBlue dark:text-pWhite">Titre</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                    <Input type="text" name="title" id="title" className="font-body bg-[#f3f3f3] border sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]" placeholder="Musique des années 2000" required onChange={(e) => setTitle(e.target.value)} />
                    {titleError && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {titleError} ⚠️</p>}
                </div>
                <div className="lg:w-1/2">
                    <div className="flex"><Label htmlFor="title" className="block mb-2 text-lg font-bold font-body text-pBlue dark:text-pWhite">Catégorie</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                    <Select onValueChange={setCategory}>
                        <SelectTrigger className="font-body bg-[#f3f3f3] border sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown w-full p-2.5 dark:text-[#000]">
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Éducation">📚 Éducation</SelectItem>
                            <SelectItem value="Divertissement">🍿 Divertissement</SelectItem>
                            <SelectItem value="Culture générale">🧠 Culture générale</SelectItem>
                        </SelectContent>
                    </Select>
                    {categoryError && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {categoryError} ⚠️</p>}
                </div>
            </div>
            <div className="">
                <div className="flex"><Label htmlFor="description" className="block mb-2 text-lg font-bold font-body text-pBlue dark:text-pWhite">Description</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                <Textarea name="description" className="font-body bg-[#f3f3f3] border sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]" placeholder="Entrez une description de votre Kouiz..." required onChange={(e) => setDescription(e.target.value)} />
                {descriptionError && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {descriptionError} ⚠️</p>}
            </div>
            <div className="w-full flex justify-end">
                <Link onClick={validateForm} href="" className={buttonVariants({
                    size: "lg",
                    className: '!bg-pBrown font-title dark:text-pWhite'
                })}>Étape suivante <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </div>
        </div>

    </div>

);
}

export default Step1;
