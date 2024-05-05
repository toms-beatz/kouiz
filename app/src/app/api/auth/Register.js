import { axiosInstance } from "../BaseAPI";

export const register = async (username, avatar_url, birthdate, email, password) => {
     const response = await axiosInstance.post('/register', username, avatar_url, birthdate, email, password);
    return response.data;
}