import { axiosInstance } from "../BaseAPI";

export const deleteKouiz = async (token, id) => {
    try {
        const response = await axiosInstance.delete(`/kouiz/${id}`,{
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
