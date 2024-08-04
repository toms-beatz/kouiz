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



const Profile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { toast } = useToast();
    const router = useRouter();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             let localToken = localStorage.getItem("token");
    //             if (!localToken) {
    //                 throw new Error("No token found");
    //             }

    //             const userProfileDetails = await userProfile(localToken, user.id);
    //             if (userProfileDetails.success) {
    //                 const detailsInfo = userProfileDetails.data;
    //                 setDetailsInfo(detailsInfo);
    //                 console.log("detailsInfo:", detailsInfo);
    //             } else {
    //                 setError("Failed to fetch user details");
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             if (error.status === 404) {
    //                 setError("User not found");
    //             } else {
    //                 setError("An unexpected error occurred");
    //             }
    //         }
    //     };
    //     fetchData();
    // }, []);
        


    const handleLogout = () => {
        // Perform logout and update authentication state
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        redirect('/');
    };

    const handleConfirmDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    description: "Vous devez être connecté pour supprimer votre compte.",
                    className: 'dark:bg-pBlue'
                });
                return;
            }

            // Faites appel à votre fonction d'API pour supprimer le compte
            const response = await deleteAccount(token);

            if (response.success === true) {
                // Déconnexion de l'utilisateur
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                // setUser(null); // Réinitialisation des données utilisateur
                toast({
                    description: "Votre compte a été supprimé avec succès.",
                    className: 'dark:bg-pBlue'
                });
            } else {
                toast({
                    description: "Une erreur est survenue lors de la suppression de votre compte. Veuillez réessayer.",
                    className: 'dark:bg-pBlue'
                });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            toast({
                description: "Une erreur est survenue. Veuillez réessayer.",
                className: 'dark:bg-pBlue'
            });
        }
    };
    const handleDeleteAccount = async () => {
        await handleConfirmDeleteAccount();
        localStorage.removeItem('token');
        router.push('/');

    };

    const handleSubmitPersonalInfo = async () => {
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
                localStorage.setItem('user', JSON.stringify({username: username == "" ? JSON.parse(localStorage.getItem('user')).username : username, email: email == "" ? JSON.parse(localStorage.getItem('user')).email : email}));
                console.log(localStorage.getItem('user'));
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
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-8 sm:pl-52 pt-8 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-title font-bold text-pBrown">Mon profil.</h1>
                        <p className="font-body lg:my-4 my-2 text-md">Gérez votre compte ici.</p>
                    </div>
                    <div className="flex flex-col mt-12">
                        <div className="flex lg:flex-row flex-col">
                            <div>
                                <h2 className="text-xl font-title font-bold text-pBrown">Informations personnelles.</h2>
                                <p className="font-body text-md">Modifiez votre pseudo ou votre email.</p>
                            </div>
                            <div className="bg-pWhite lg:p-12 p-6 lg:w-6/12 w-full ml-auto lg:mt-0 mt-12 rounded-lg dark:bg-pBlue border dark:border-0">
                                <div className="flex flex-col space-y-8">
                                    <div>
                                        <div className="flex">
                                            <Label htmlFor="pseudo" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Pseudo.</Label>
                                        </div>
                                        <Input type="text" name="pseudo" id="pseudo" className="font-body bg-[#f3f3f3] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-[#000]" placeholder="John Doe"
                                            onChange={(e) => setUsername(e.target.value)} required />
                                        {errors.username && <p>{errors.username}</p>}
                                    </div>
                                    <div>
                                        <div className="flex">
                                            <Label htmlFor="email" className="block mb-2 text-sm font-bold font-body text-pBlue dark:text-pWhite">Email.</Label>
                                        </div>
                                        <Input type="email" name="email" id="email" autoComplete="username" className="font-body bg-[#f3f3f3] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:!ring-pBlue focus:border-pBrown block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-[#000]" placeholder="contact@kouiz.fr" onChange={(e) => setEmail(e.target.value)} required />
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
                        </div>

                        {/* <div className="w-full border-t border-pBrown my-24"></div>

                        <div className="flex lg:flex-row flex-col">
                            <div>
                                <h2 className="text-xl font-title font-bold text-pBrown">Mot de passe.</h2>
                                <p className="font-body text-md">Modifiez votre mot de passe.</p>
                            </div>
                            <div className="bg-pWhite lg:p-12 p-6 lg:w-6/12 w-full ml-auto lg:mt-0 mt-12 rounded-lg dark:bg-pBlue border dark:border-0">
                                <form className="flex flex-col space-y-8">

                                    <div>
                                        <div className="flex">
                                            <Label htmlFor="currentPassword" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white font-body text-pBlue dark:text-pWhite">Mot de passe actuel</Label>
                                            <span className="text-pBrown font-title font-black pl-1">*</span>
                                        </div>
                                        <div className="font-body bg-[#f3f3f3] sm:text-sm rounded-lg flex w-full items-center justify-end border focus:!ring-pBlue focus:border-pBrown">
                                            <Input autoComplete="current-password username" className="border-0 rounded-lg dark:text-[#000] !bg-transparent w-full !focus:ring-0" type={showCurrentPassword ? "text" : "password"} name="currentPassword" id="currentPassword" placeholder="********" required />
                                            <span className="mr-3 cursor-pointer text-pBrown absolute" onClick={toggleShowCurrentPassword}>
                                                {showCurrentPassword ?
                                                    <EyeOff />
                                                    :
                                                    <Eye />
                                                }
                                            </span>
                                        </div>
                                    </div>


                                    <div>
                                        <div className="flex">
                                            <Label htmlFor="newPassword" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white font-body text-pBlue dark:text-pWhite">Nouveau mot de passe</Label>
                                            <span className="text-pBrown font-title font-black pl-1">*</span>
                                        </div>
                                        <div className="font-body bg-[#f3f3f3] sm:text-sm rounded-lg flex w-full items-center justify-end border focus:!ring-pBlue focus:border-pBrown">
                                            <Input autoComplete="new-password username" className="border-0 rounded-lg dark:text-[#000] !bg-transparent w-full !focus:ring-0" type={showNewPassword ? "text" : "password"} name="newPassword" id="newPassword" placeholder="********" required />
                                            <span className="mr-3 cursor-pointer text-pBrown absolute" onClick={toggleShowNewPassword}>
                                                {showNewPassword ?
                                                    <EyeOff />
                                                    :
                                                    <Eye />
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex">
                                            <Label htmlFor="newPasswordConfirmation" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white font-body text-pBlue dark:text-pWhite">Confirmer votre nouveau mot de passe</Label>
                                            <span className="text-pBrown font-title font-black pl-1">*</span>
                                        </div>
                                        <div className="font-body bg-[#f3f3f3] sm:text-sm rounded-lg flex w-full items-center justify-end border focus:!ring-pBlue focus:border-pBrown">
                                            <Input autoComplete="new-password username" className="border-0 rounded-lg dark:text-[#000] !bg-transparent w-full !focus:ring-0" type={showNewPasswordConfirmation ? "text" : "password"} name="newPasswordConfirmation" id="newPasswordConfirmation" placeholder="********" required />
                                            <span className="mr-3 cursor-pointer text-pBrown absolute" onClick={toggleShowNewPasswordConfirmation}>
                                                {showNewPasswordConfirmation ?
                                                    <EyeOff />
                                                    :
                                                    <Eye />
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href="" className={buttonVariants({
                                            size: "lg",
                                            className: '!bg-pBrown font-title dark:text-pWhite w-full lg:w-2/6 lg:ml-auto'
                                        })}
                                    >
                                        Modifier
                                    </Link>
                                </form>
                            </div>
                        </div> */}

                        <div className="w-full border-t border-pBrown my-24"></div>

                        <div className="flex lg:flex-row flex-col">
                            <div>
                                <h2 className="text-xl font-title font-bold text-pBrown">Actions sur le compte</h2>
                                <p className="font-body text-md">Déconnectez vous ou supprimez votre compte.</p>
                            </div>
                            <div className="lg:p-12 py-6 lg:w-6/12 w-full ml-auto">
                                <div className="flex lg:flex-row flex-col items-center gap-8">
                                    <Link
                                        href='/'
                                        className={`lg:w-1/2 w-8/12 font-title !bg-pBrown dark:text-pWhite ${buttonVariants({ size: 'lg' })}`}
                                        onClick={handleLogout}
                                    >
                                        Me déconnecter
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className={`lg:w-1/2 w-8/12 font-title ${buttonVariants({ variant: 'destructive', size: 'lg' })}`}
                                            >Supprimer mon compte</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Êtes vous sûr(e) de vouloir supprimer votre compte ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action est irréversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction className={`font-title ${buttonVariants({ variant: 'destructive'})}`} onClick={handleDeleteAccount}>Supprimer</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    );
}

export default Profile;
