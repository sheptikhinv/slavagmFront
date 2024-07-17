export interface Skill {
    id: number
    title: string
    priority: number
    children: Array<Skill> | null
}

export interface SkillChange {
    type: "ADD" | "DELETE" | "CHANGE"
    id?: number
    title?: string
    priority?: number
    parentId?: number
    children?: Array<Skill>
}

export interface SkillCreate {
    title: string
    priority?: number
    parentId?: number
}

export interface SkillUpdate {
    title: string
    priority?: number
    id: number
}