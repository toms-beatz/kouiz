import { axiosInstance } from "../BaseAPI";

export const deleteAccount = async (token) => {
    try {
        const response = await axiosInstance.delete('/profile',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici, par exemple, renvoyer une erreur ou un message d'erreur
        throw error;
    }
}
