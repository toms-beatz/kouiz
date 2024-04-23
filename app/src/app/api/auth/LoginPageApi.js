import { axiosInstance } from "../BaseAPI";

export const LoginAPICall = async (email, password) => {
     const response = await axiosInstance.post('/login', email, password);
    return response.data;
}