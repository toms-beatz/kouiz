"use client"
import { useState } from 'react';
import { FileQuestion, CirclePlus, Trash2, Check } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button, buttonVariants } from '../ui/button';


const Step2 = ({ formData, updateFormData, nextStep }) => {
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        const newQuestion = { text: '', options: [] };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = text;
        setQuestions(updatedQuestions);
    };

    const addOption = (questionIndex, text, isCorrect) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push({ text, isCorrect });
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].text = text;
        setQuestions(updatedQuestions);
    };

    const handleCorrectChange = (questionIndex, optionIndex, isCorrect) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].isCorrect = isCorrect;
        setQuestions(updatedQuestions);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     updateFormData({ questions });
    //     nextStep();
    // };

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

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        let hasErrors = false;

        // Validation des questions
        questions.forEach((question, index) => {
            if (!question.text.trim()) {
                newErrors[`question${index}`] = "La question est requise.";
                hasErrors = true;
            }

            // Validation du nombre minimum de réponses
            if (question.options.length < 2) {
                newErrors[`question${index}-options`] = "La question doit avoir au moins 2 réponses.";
                hasErrors = true;
            }

            // Validation de la présence d'au moins une réponse correcte
            const hasCorrectAnswer = question.options.some((option) => option.isCorrect);
            if (!hasCorrectAnswer) {
                newErrors[`question${index}-correct-answer`] = "La question doit avoir au moins une réponse correcte.";
                hasErrors = true;
            }

            // Validation des options
            question.options.forEach((option, optionIndex) => {
                if (!option.text.trim()) {
                    newErrors[`option${index}-${optionIndex}`] = "La réponse est requise.";
                    hasErrors = true;
                }
            });
        });

        setErrors(newErrors);

        if (!hasErrors) {
            // Si aucune erreur, procédez à la soumission du formulaire
            updateFormData({ questions });
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        console.log('coucou')
    }

    return (
        <div className="w-full bg-pWhite dark:bg-pBlue border dark:border-0 rounded-lg flex flex-col justify-center shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
                <h2 className="font-title text-pBrown text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">
                    <FileQuestion className='w-5 h-5 mr-2' />Questions.
                </h2>


                {questions.map((question, index) => (
                    <div key={index}>
                        <div className="">
                            <div className="flex">
                                <Label htmlFor="title" className="block mb-2 text-lg font-bold font-body text-pBlue dark:text-pWhite">Question {index + 1}</Label>
                                <span className="text-pBrown font-title font-black pl-1">*</span>
                            </div>
                            <div className='flex'>
                                <Input className="font-body bg-[#f3f3f3] border border-r-0 rounded-lg rounded-r-none sm:text-sm  focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]" type="text" placeholder={`Question ${index + 1}`} value={question.text} onChange={(e) => handleQuestionChange(index, e.target.value)} required />
                                <Button onClick={() => removeQuestion(index)} className="bg-[#D22B2B] border-0 font-title rounded-lg rounded-l-none"><Trash2 className='w-5' /></Button>
                            </div>
                            {errors[`question${index}`] && <div className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errors[`question${index}`]} ⚠️</div>}
                            {errors[`question${index}-options`] && <div className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errors[`question${index}-options`]} ⚠️</div>}
                            {errors[`question${index}-correct-answer`] && <div className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errors[`question${index}-correct-answer`]} ⚠️</div>}
                        </div>


                        <div className='flex lg:flex-row flex-col flex-wrap mt-4 lg:gap-12 gap-4'>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className='lg:w-5/12'>
                                    <div className="">
                                        <div className="flex">
                                            <Label htmlFor="title" className="block mb-2 text-md font-bold font-body text-pBlue dark:text-pWhite">Question {index + 1} - Réponse {optionIndex + 1}</Label>
                                            <span className="text-pBrown font-title font-black pl-1">*</span>
                                        </div>
                                        <div className='flex'>
                                            <Input className="font-body bg-[#f3f3f3] border border-r-0 sm:text-sm rounded-lg rounded-r-none focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:text-[#000]" type="text" placeholder={`Réponse ${optionIndex + 1}`} value={option.text} onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)} required />
                                            <Button onClick={() => removeOption(index, optionIndex)} className="bg-[#D22B2B] font-title rounded-lg rounded-l-none"><Trash2 className='w-5' /></Button>
                                        </div>
                                        {errors[`option${index}-${optionIndex}`] && (
                                            <div className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errors[`option${index}-${optionIndex}`]} ⚠️</div>
                                        )}
                                    </div>
                                    <div className=" mb-4">
                                        <div className="flex items-center">
                                            <Label htmlFor="title" className="block text-sm font-bold font-body text-pBlue dark:text-pWhite">Est correcte ?</Label>
                                            <Input type="checkbox" className="w-4 ml-4" checked={option.isCorrect} onChange={(e) => handleCorrectChange(index, optionIndex, e.target.checked)} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className='flex lg:justify-end'>
                            <Button onClick={() => addOption(index, '', false)} className='font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite my-4'>
                                <CirclePlus className='w-5 h-5 mr-2' />Ajouter une réponse
                            </Button>
                        </div>
                        <div className="w-full border-t border-pBrown my-12"></div>
                    </div>
                ))}



                <div className='flex flex-wrap lg:justify-between'>
                    <Button onClick={addQuestion} className='font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite lg:m-0 mb-4'>
                        <CirclePlus className='w-5 h-5 mr-2' />Ajouter une question
                    </Button>
                    {questions.length > 0 && (
                        <Button onClick={validateForm} className='font-title !bg-pBrown !text-pWhite dark:bg-pBrown dark:text-pWhite my-4'>
                            <Check className='w-5 h-5 mr-2' />Valider
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Step2;
