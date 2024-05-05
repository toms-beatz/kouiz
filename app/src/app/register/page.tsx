"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link";
import { useState, useEffect } from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { fr } from 'date-fns/locale'
import { UserRoundPlus, CalendarIcon, Eye, EyeOff } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns';
import { register } from '@/app/api/auth/Register';
import { useToast } from "@/components/ui/use-toast"


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>();
    const [birthdate, setBirthdate] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let currentYear = date.getFullYear() - 13;
    let year100YearsAgo = date.getFullYear() - 100;
    let currentDateObject = new Date(currentYear, month, day);
    let date100YearsAgoObject = new Date(year100YearsAgo, month, day);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    useEffect(() => {
        if (selectedDay) {
            const formattedDate = format(selectedDay, 'yyyy-MM-dd');
            setBirthdate(formattedDate);
        }
    }, [selectedDay]);
    const { toast } = useToast()
    const handleSubmit = async () => {
        setErrorMessages({});
        setErrorMessage('');
        try {
            const avatar_url = `/public/avatar-users/${username}`;
            console.log(avatar_url)

            const user_data = { username, avatar_url, birthdate, email, password }
            const response = await register(user_data);
            console.log(response)
            if (response.success == true) {
                toast({
                    title: "Inscription réussie ✅",
                    description: "Vous pouvez maintenant vous connecter 🚀",
                    className: 'dark:bg-pBlue'
                })
                router.push('/login');
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.data.errorsList) {
                setErrorMessages(error.response?.data.errorsList);
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Veuillez remplir les champs correctement"
                })

            } else {
                if (error.response?.data.message) {
                    setErrorMessage(error.response?.data.message);
                }
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Veuillez remplir les champs correctement"
                })
            }
        }
    }

    return (
        <>

            <div>
                <div className='relative isolate'>
                    <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-70 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-100'>
                        <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pBrown to-pBeige opacity-3 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
                    </div>

                    <div className="flex flex-col items-center justify-center px-6 mx-auto my-24">
                        <div className="w-full bg-pWhite dark:bg-pBlue rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="font-title text-pBrown text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    <UserRoundPlus className='w-5 h-5 mr-2' />Inscription.
                                </h1>
                                <form className="space-y-8 md:space-y-6">
                                    <div>
                                        <div className="flex"><Label htmlFor="pseudo" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Pseudo</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                                        <Input type="text" name="pseudo" id="pseudo" className="font-body bg-[#f3f3f3] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-[#000]" placeholder="John Doe" required onChange={(e) => setUsername(e.target.value)} />
                                        {errorMessages.username && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errorMessages.username}</p>}
                                    </div>
                                    <div>
                                        <div className="flex"><Label htmlFor="birthdate" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Date de naissance</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="pl-3 text-left font-normal bg-[#f3f3f3] w-full dark:hover:bg-pWhite hover:text-[#000] text-[#000]">
                                                    {selectedDay ? <span className="font-body">{format(selectedDay, 'dd/MM/yyyy')}</span> : <span className="text-[#717179] font-body">Choisissez une date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 text-pBrown" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 ">
                                                <Calendar
                                                    mode="single"
                                                    required
                                                    onSelect={setSelectedDay}
                                                    selected={selectedDay}
                                                    locale={fr}
                                                    captionLayout="dropdown" fromDate={date100YearsAgoObject} toDate={currentDateObject} className="dark:bg-pBlue"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errorMessages.birthdate && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errorMessages.birthdate}</p>}
                                    </div>
                                    <div>
                                        <div className="flex"><Label htmlFor="email" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Email</Label><span className="text-pBrown font-title font-black pl-1">*</span></div>
                                        <Input type="email" name="email" id="email" autoComplete="username" className="font-body bg-[#f3f3f3] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-[#000]" placeholder="contact@kouiz.fr" required onChange={(e) => setEmail(e.target.value)} />
                                        {errorMessages.email && <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errorMessages.email}</p>}
                                    </div>
                                    <div>
                                        <div className="flex">
                                            <Label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white font-body text-pBlue dark:text-pWhite">Mot de passe</Label>
                                            <span className="text-pBrown font-title font-black pl-1">*</span>
                                        </div>
                                        <div className="font-body bg-[#f3f3f3] sm:text-sm rounded-lg flex w-full items-center justify-end border focus:!ring-pBlue focus:border-pBrown">
                                            <Input autoComplete="username new-password" className="border-0 rounded-lg dark:text-[#000] !bg-transparent w-full !focus:ring-0" type={showPassword ? "text" : "password"} name="password" id="password" placeholder="********" required onChange={(e) => setPassword(e.target.value)} />
                                            <span className="mr-3 cursor-pointer text-pBrown absolute" onClick={toggleShowPassword}>
                                                {showPassword ?
                                                    <EyeOff />
                                                    :
                                                    <Eye />
                                                }
                                            </span>
                                        </div>
                                        {errorMessages.password ? <p className="text-[#D22B2B] font-body font-black text-sm pt-2">⚠️ {errorMessages.password}</p> : <p className="text-red-500">{errorMessage}</p>}
                                    </div>
                                    <div>
                                        <Link href="" className={buttonVariants({
                                            size: "lg",
                                            className: '!bg-pBrown font-title dark:text-pWhite'
                                        })} onClick={handleSubmit}>S'inscrire</Link>
                                        <p className="text-sm font-medium font-body text-pBlue dark:text-pWhite mt-6">
                                            Déjà un compte ? <Link href="/login" className="font-black hover:underline text-pBrown">Connectez-vous.</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-40 dark:!-top-70 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-100'>
                        <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pBrown to-pBlue opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
