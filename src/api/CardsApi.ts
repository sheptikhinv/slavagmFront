import {BASE_URL, createRequestConfig} from "./BaseApi.ts";
import {CardType} from "../types/cardType.ts";

export const getCards = async (): Promise<CardType[]> => {
    try {
        const response = await fetch(`${BASE_URL}/cards/all`, {
            ...createRequestConfig("GET")
        });
        const data: object = await response.json();
        return data as CardType[]
    } catch (error) {
        console.error(error);
        return []
    }
};