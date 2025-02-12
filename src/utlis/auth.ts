import {jwtDecode} from "jwt-decode";

export const setToken = (access_token: string) => {
    localStorage.setItem('access_token', access_token);
};

export const getToken = () => {
    return localStorage.getItem('access_token');
}

export const removeToken = () => {
    localStorage.removeItem('access_token');
}

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp && decoded.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
};