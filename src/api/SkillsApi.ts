import {BASE_URL, createRequestConfig} from "./BaseApi.ts";
import {Skill} from "../types/skill.ts";

export const getSkills = async () : Promise<Skill[]> => {
    try {
        const response = await fetch(`${BASE_URL}/skills/all`, {
            ...createRequestConfig("GET")
        });
        const data: object = await response.json();
        return data as Skill[]
    } catch (error) {
        console.error(error);
        return [];
    }
};