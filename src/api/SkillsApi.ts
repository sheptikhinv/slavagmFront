import {BASE_URL, createRequestConfig} from "./BaseApi.ts";
import {Skill, SkillCreate, SkillUpdate} from "../types/skill.ts";

export const getSkills = async (): Promise<Skill[]> => {
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

export const addSkill = async (skill: SkillCreate) => {
    const url = `${BASE_URL}/skills/add`;
    return await fetch(url, {
        ...createRequestConfig("POST"),
        body: JSON.stringify(skill)
    });
};

export const editSkill = async (skill: SkillUpdate) => {
    const url = `${BASE_URL}/skills/update`
    return await fetch(url, {
        ...createRequestConfig("PUT"),
        body: JSON.stringify(skill)
    });
};

export const removeSkill = async (id: number) => {
    const url = `${BASE_URL}/skills/delete/${id}`;
    return await fetch(url, {
        ...createRequestConfig("DELETE")
    });
};