import { axiosInstance } from "../BaseAPI";

export const editKouiz = async (token, dataToSend) => {
    try {
        const response = await axiosInstance.put(`/kouiz/edit/${dataToSend.id}`, dataToSend, {
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
