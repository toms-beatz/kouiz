"use client"
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import UserContext from '@/contexts/UserContext';
import AuthContext from '@/contexts/AuthContext';
import { update } from "@/app/api/auth/Update";
import { deleteAccount } from "@/app/api/auth/deleteAccount";
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
import { useRouter } from 'next/navigation';
import {userProfile} from "@/app/api/auth/UserProfile";



const EditForm = () => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { toast } = useToast();
    // const { setUser, user } = useContext(UserContext);
    const router = useRouter();
    // const [detailsInfo, setDetailsInfo] = useState<any>(null);
    const [error, setError] = useState(null);
    const handleSubmitPersonalInfo = async () => {
        const dataToSend = {username: '', email: ''}
        dataToSend.username = username;
        dataToSend.email = email;
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                description: "Vous devez être connecté pour modifier vos informations.",
                className: 'dark:bg-pBlue'
            });
            return;
        }

        try {
            const response = await update(token, username, email);

            if (response.success === true) {
                toast({
                    description: "Changements effectués avec succès ✅",
                    className: 'dark:bg-pBlue'
                });
            } else {
                // Handle case where success is false
                toast({
                    description: "Une erreur est survenue. Veuillez réessayer. 🚨",
                    className: 'dark:bg-pBlue'
                });
            }
        } catch (error) {
            // Handle errors from the API call
            console.error('Erreur lors de la mise à jour des informations:', error);
            toast({
                description: "Une erreur est survenue. Veuillez réessayer. 🚨",
                className: 'dark:bg-pBlue'
            });
        }
    };



    return (
        <div className="bg-pWhite lg:p-12 p-6 lg:w-6/12 w-full ml-auto lg:mt-0 mt-12 rounded-lg dark:bg-pBlue border dark:border-0">
            <div className="flex flex-col space-y-8">
                <div>
                    <div className="flex">
                        <Label htmlFor="pseudo" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Pseudo.</Label>
                    </div>
                    <Input type="text" name="pseudo" id="pseudo" className="font-body bg-[#f3f3f3] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-[#000]" placeholder="John Doe"
                        onChange={(e) => setUsername(e.target.value)} value={username} required />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    <div className="flex">
                        <Label htmlFor="email" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Email.</Label>
                    </div>
                    <Input type="email" name="email" id="email" autoComplete="username" className="font-body bg-[#f3f3f3] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-[#000]" placeholder="contact@kouiz.fr" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <Link
                    href="" className={buttonVariants({
                        size: "lg",
                        className: '!bg-pBrown font-title dark:text-pWhite w-full lg:w-2/6 lg:ml-auto'
                    })} onClick={handleSubmitPersonalInfo}
                >
                    Modifier
                </Link>
            </div>
        </div>
    );
}

export default EditForm;



