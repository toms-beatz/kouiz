"use client"

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://api.kouiz.fr/api/login', {
                email: email,
                password: password
            });
            if (response.data.success == true) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                router.push('/dashboard');
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.data.errorsList) {
                setErrorMessages(error.response?.data.errorsList);

            } else {
                if (error.response?.data.message) {
                    setErrorMessage(error.response?.data.message);
                }
            }
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Connexion
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</Label>
                                <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
                                {errorMessages.email && <p className="text-red-500">{errorMessages.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setPassword(e.target.value)} />
                                {errorMessages.password ? <p className="text-red-500">{errorMessages.password}</p> : <p className="text-red-500">{errorMessage}</p>}                            </div>
                            <div className="flex items-center justify-between">
                                <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div>
                            <Link href="#" className={buttonVariants({
                                size: "lg"
                            })} onClick={handleSubmit}>Sign in</Link>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
