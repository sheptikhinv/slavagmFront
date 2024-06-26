export interface Skill {
    id: number
    title: string
    priority: number
    children: Array<Skill> | null
}