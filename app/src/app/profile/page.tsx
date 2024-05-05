"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect } from "next/navigation";
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react";
import { update } from '@/app/api/auth/Update'
import { log } from "console";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";



const Profile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifie si l'utilisateur est authentifié au chargement initial
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        // Effectue la déconnexion et met à jour l'état d'authentification
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        redirect('/')
    }

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowNewPasswordConfirmation = () => {
        setShowNewPasswordConfirmation(!showNewPasswordConfirmation);
    };

    // const handleSubmit = async () => {

    //     try {
    //         const user_data = { email, password }
    //         const response = await update(user_data);
    //         console.log(response);
    //         if (response.success == true) {
    //             localStorage.setItem('token', response.token);

    //             window.location.replace('/dashboard');
    //             toast({
    //                 description: "Connexion réussie ✅",
    //                 className: 'dark:bg-pBlue'
    //             })
    //         }
    //     } catch (error: any) {
    //         if (axios.isAxiosError(error) && error.response?.data.errorsList) {
    //             setErrorMessages(error.response?.data.errorsList);
    //             toast({
    //                 variant: "destructive",
    //                 title: "Erreur",
    //                 description: "Veuillez remplir les champs correctement"
    //             })
    //         } else {
    //             if (error.response?.data.message) {
    //                 console.log(error)
    //                 setErrorMessage(error.response?.data.message);
    //             }
    //             toast({
    //                 variant: "destructive",
    //                 title: "Erreur",
    //                 description: "Veuillez remplir les champs correctement"
    //             })
    //         }
    //     }
    // }



    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { toast } = useToast()



    // Fonctions de gestion de la soumission des formulaires
    const handleSubmitPersonalInfo = async () => {
        const token = localStorage.getItem('token')
        axios({
            method: 'put',
            url: 'https://api.kouiz.fr/api/user/profile',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                username: username,
                email: email,
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    toast({
                        description: "Changements effectués avec succès ✅",
                        className: 'dark:bg-pBlue'
                    })

                }
            })
            .catch((error) => {
                let errorMessages = '';
            }
            )





    };


    // const handleSubmitPasswordInfo = () => {

    //     try {
    //         // Envoyer les données au serveur
    //         const response = update({ token, passwordInfo });
    //         console.log(response);
    //         // Mettre à jour l'état ou rediriger si nécessaire
    //     } catch (error) {
    //         setErrors(error.response?.data.errors || {});
    //         console.log(errors)
    //     }

    // };

    return (
        <>
            <MaxWidthWrapper className="md:pr-0 px-0 mt-14">
                <div className="sm:pt-20 sm:pl-52 pt-20 md:pr-20 dark:bg-sBlue w-full pb-32 px-6">
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

                        <div className="w-full border-t border-pBrown my-24"></div>

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
                        </div>

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
                                    <Link
                                        href='/'
                                        className={`lg:w-1/2 w-8/12 font-title ${buttonVariants({ variant: 'destructive', size: 'lg' })}`}
                                    >
                                        Supprimer mon compte
                                    </Link>
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