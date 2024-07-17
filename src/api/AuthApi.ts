import {BASE_URL, createRequestConfig} from "./BaseApi.ts";

export const login = ({password}: { password: string }) => {
    return fetch(`${BASE_URL}/auth/login`, {
        ...createRequestConfig("POST"),
        body: JSON.stringify({password})
    }).then(response => {
        return response.json()
    })
        .catch(error => console.error(error));
}