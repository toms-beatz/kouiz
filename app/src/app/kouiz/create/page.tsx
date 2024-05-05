"use client"
import { useState } from "react";

// Importez vos composants d'étape
import Step1 from "@/components/KouizCreateForm/Step1";
import Step2 from "@/components/KouizCreateForm/Step2";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BackButton from "@/components/BackButton";

const KouizCreate = () => {
    // Utilisez useState pour gérer l'état local du formulaire et de l'étape actuelle
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    // Fonction pour passer à l'étape suivante
    const nextStep = () => {
        setStep(step + 1);
    };

    // Fonction pour passer à l'étape précédente
    const prevStep = () => {
        setStep(step - 1);
    };

    // Fonction pour mettre à jour les données du formulaire
    const updateFormData = (data) => {
        setFormData({ ...formData, ...data });
    };

    // Rendre le composant d'étape approprié en fonction de l'état actuel
    let currentStepComponent;
    switch (step) {
        case 1:
            currentStepComponent = <Step1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
            break;
        case 2:
            currentStepComponent = <Step2 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
            break;
        default:
            currentStepComponent = <Step1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    }

    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col w-full">
                            <BackButton />
                            <h1 className="text-3xl font-title font-bold text-pBrown">Création de Kouiz.</h1>
                            <div className="my-4">
                                Créez un Kouiz à l'aide du formulaire ci-dessous
                            </div>
                            {currentStepComponent}
                        </div>
                    </div>

                </div>
            </MaxWidthWrapper >
        </>
        
    );
};

export default KouizCreate;
