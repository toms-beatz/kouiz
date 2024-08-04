"use client";
import { useState } from "react";
import { FileQuestion, CirclePlus, Trash2, Check } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createKouiz } from "@/app/api/auth/CreateKouiz";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Step2 = ({ formData, updateFormData }) => {
    const [questions, setQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: [] }]);
    };

    const handleQuestionChange = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = text;
        setQuestions(updatedQuestions);
    };

    const addOption = (questionIndex, text, is_correct) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push({ text, is_correct });
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].text = text;
        setQuestions(updatedQuestions);
    };

    const handleCorrectChange = (questionIndex, optionIndex, isChecked) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].is_correct = isChecked ? 1 : 0;
        setQuestions(updatedQuestions);
    };



    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const removeOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const { toast } = useToast();

    const validateForm = () => {
        const newErrors = {};
        let hasErrors = false;

        questions.forEach((question, index) => {
            if (!question.text.trim()) {
                newErrors[`question${index}`] = "La question est requise.";
                hasErrors = true;
            }

            if (question.options.length < 2) {
                newErrors[`question${index}-options`] = "La question doit avoir au moins 2 réponses.";
                hasErrors = true;
            }

            const hasCorrectAnswer = question.options.some((option) => option.is_correct);
            if (!hasCorrectAnswer) {
                newErrors[`question${index}-correct-answer`] = "La question doit avoir au moins une réponse correcte.";
                hasErrors = true;
            }

            question.options.forEach((option, optionIndex) => {
                if (!option.text.trim()) {
                    newErrors[`option${index}-${optionIndex}`] = "La réponse est requise.";
                    hasErrors = true;
                }
            });
        });

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleSubmit = async () => {
        const dataToSend = { ...formData, questions };
        const token = localStorage.getItem("token");

        try {
            const response = await createKouiz(token, dataToSend);

            if (response.success) {
                console.log("Changements effectués avec succès", response);
                toast({
                    description: "Kouiz créé avec succès !",
                    className: "dark:bg-pBlue",
                });
                router.push("/kouiz");
            } else {
                console.log("Une erreur est survenue", response);
                toast({
                    description: "Une erreur est survenue lors de la création du kouiz. Veuillez réessayer plus tard",
                    className: "dark:bg-pBlue",
                });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations:", error);
        }
    };

    const handleValidationAndSubmit = () => {
        if (validateForm()) {
            updateFormData({ questions });
            console.log("Data to be sent:", { ...formData, questions });
            handleSubmit();
        }
    };

    return (
        <div className="w-full bg-pWhite dark:bg-pBlue border dark:border-0 rounded-lg flex flex-col justify-center shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
                <h2 className="font-title text-pBrown text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">
                    <FileQuestion className="w-5 h-5 mr-2" />
                    Questions.
                </h2>

                {questions.map((question, index) => (
                    <div key={index}>
                        <div className="">
                            <div className="flex">
                                <Label
                                    htmlFor="title"
                                    className="block mb-2 text-lg font-bold font-body text-pBlue dark:text-pWhite"
                                >
                                    Question {index + 1}
                                </Label>
                                <span className="text-pBrown font-title font-black pl-1">*</span>
                            </div>
                            <div className="flex">
                                <Input
                                    className="font-body bg-[#f3f3f3] border border-r-0 rounded-lg rounded-r-none sm:text-sm  focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]"
                                    type="text"
                                    placeholder={`Question ${index + 1}`}
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    required
                                />
                                <Button
                                    onClick={() => removeQuestion(index)}
                                    className="bg-[#D22B2B] border-0 font-title rounded-lg rounded-l-none"
                                >
                                    <Trash2 className="w-5" />
                                </Button>
                            </div>
                            {errors[`question${index}`] && (
                                <div className="text-[#D22B2B] font-body font-black text-sm pt-2">
                                    ⚠️ {errors[`question${index}`]} ⚠️
                                </div>
                            )}
                            {errors[`question${index}-options`] && (
                                <div className="text-[#D22B2B] font-body font-black text-sm pt-2">
                                    ⚠️ {errors[`question${index}-options`]} ⚠️
                                </div>
                            )}
                            {errors[`question${index}-correct-answer`] && (
                                <div className="text-[#D22B2B] font-body font-black text-sm pt-2">
                                    ⚠️ {errors[`question${index}-correct-answer`]} ⚠️
                                </div>
                            )}
                        </div>

                        <div className="flex lg:flex-row flex-col flex-wrap mt-4 lg:gap-12 gap-4">
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="lg:w-5/12">
                                    <div className="">
                                        <div className="flex">
                                            <Label
                                                htmlFor="title"
                                                className="block mb-2 text-md font-bold font-body text-pBlue dark:text-pWhite"
                                            >
                                                Question {index + 1} - Réponse {optionIndex + 1}
                                            </Label>
                                            <span className="text-pBrown font-title font-black pl-1">*</span>
                                        </div>
                                        <div className="flex">
                                            <Input
                                                className="font-body bg-[#f3f3f3] border border-r-0 sm:text-sm rounded-lg rounded-r-none focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]"
                                                type="text"
                                                placeholder={`Réponse ${optionIndex + 1}`}
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                required
                                            />
                                            <Button
                                                onClick={() => removeOption(index, optionIndex)}
                                                className="bg-[#D22B2B] font-title rounded-lg rounded-l-none"
                                            >
                                                <Trash2 className="w-5" />
                                            </Button>
                                        </div>
                                        {errors[`option${index}-${optionIndex}`] && (
                                            <div className="text-[#D22B2B] font-body font-black text-sm pt-2">
                                                ⚠️ {errors[`option${index}-${optionIndex}`]} ⚠️
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center">
                                            <Label
                                                htmlFor="is_correct"
                                                className="block text-sm font-bold font-body text-pBlue dark:text-pWhite"
                                            >
                                                Est correcte ?
                                            </Label>
                                            <Input
                                                type="checkbox"
                                                className="w-4 ml-4"
                                                checked={option.is_correct === 1} // Assurez-vous que le bon état de la case à cocher est reflété
                                                onChange={(e) => handleCorrectChange(index, optionIndex, e.target.checked)}
                                            />

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex lg:justify-end">
                            <Button
                                onClick={() => addOption(index, "", 0)}
                                className="font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite my-4"
                            >
                                <CirclePlus className="w-5 h-5 mr-2" />
                                Ajouter une réponse
                            </Button>
                        </div>
                        <div className="w-full border-t border-pBrown my-12"></div>
                    </div>
                ))}
                <div className="flex flex-wrap lg:justify-between">
                    <Button
                        onClick={addQuestion}
                        className="font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite lg:m-0 mb-4"
                    >
                        <CirclePlus className="w-5 h-5 mr-2" />
                        Ajouter une question
                    </Button>
                    {questions.length > 0 && (
                        <Button
                            onClick={handleValidationAndSubmit}
                            className="font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite my-4"
                        >
                            <Check className="w-5 h-5 mr-2" />
                            Valider
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step2;
