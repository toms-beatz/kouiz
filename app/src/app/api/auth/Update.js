import { axiosInstance } from "../BaseAPI";

export const update = async (token, username, email, password) => {
    try {
        const response = await axiosInstance.put('/user/profile', {
            username,
            email,
            password
        }, {
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
