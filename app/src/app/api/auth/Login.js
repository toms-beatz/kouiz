import { axiosInstance } from "../BaseAPI";

export const login = async (email, password) => {
    const response = await axiosInstance.post('/login', email, password );
    return response.data;
}