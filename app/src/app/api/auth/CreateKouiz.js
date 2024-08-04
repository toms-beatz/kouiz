import { axiosInstance } from "../BaseAPI";

export const createKouiz = async (token, dataToSend) => {
    try {
        const response = await axiosInstance.post('/kouiz/create', dataToSend, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
