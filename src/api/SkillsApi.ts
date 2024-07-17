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

export const addSkill = async (skill: { skill: SkillCreate }) => {
    try {
        return await fetch(`${BASE_URL}/skills/add`, {
            ...createRequestConfig("POST"),
            body: JSON.stringify(skill)
        });
    } catch (error) {
        console.error(error);
    }
};

export const removeSkill = async (id: int) => {
    try {
        return await fetch(`${BASE_URL}/skills/delete/${id}`, {
            ...createRequestConfig("DELETE")
        });
    } catch (error) {
        console.error(error);
        return;
    }
};

export const editSkill = async (skill: { skill: SkillUpdate }) => {
    console.log(skill);
    try {
        return await fetch(`${BASE_URL}/skills/update`, {
            ...createRequestConfig("PUT"),
            body: JSON.stringify(skill)
        });
    } catch (error) {
        console.error(error);
    }
};