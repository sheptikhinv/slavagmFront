import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = 'access_token';

export const setToken = (access_token: string) => {
    localStorage.setItem(TOKEN_KEY, access_token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
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
