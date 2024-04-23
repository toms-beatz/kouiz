import { axiosInstance } from "../BaseAPI";

export const register = async (name, email, password, role) => {
     const response = await axiosInstance.post('/register', name, email, password, role);
    return response.data;
}