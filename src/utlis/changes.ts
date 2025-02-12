import {SkillChange} from "../types/skill.ts";

const mergeChanges = (a: SkillChange, b: SkillChange): SkillChange => {
    return {
        type: "CHANGE",
        id: a.id,
        title: b.title,
        priority: b.priority,
        parentId: b.parentId ?? a.parentId,
        children: b.children ?? a.children
    }
};

const changeAdd = (a: SkillChange, b: SkillChange): SkillChange => {
    return {
        type: "ADD",
        id: a.id,
        title: b.title,
        priority: b.priority,
        parentId: a.parentId,
    }
}

export const optimizeChanges = (changes: SkillChange[]): SkillChange[] => {
    const optimizedChanges: SkillChange[] = [];

    for (let change of changes) {
        let toDelete = false;
        for (const nextChange of changes) {
            console.log(changes);
            if (nextChange.id !== change.id) {
                console.log(change.id, nextChange.id);
                continue;
            }

            if (change.type === "ADD" && nextChange.type === "CHANGE") {
                change = changeAdd(change, nextChange);
            } else if ((change.type === "ADD" || change.type == "CHANGE") && nextChange.type === "DELETE") {
                toDelete = true;
                changes = changes.filter(item => item !== nextChange);
                break;
            } else if (change.type === "CHANGE" && nextChange.type === "CHANGE") {
                change = mergeChanges(change, nextChange);
                changes = changes.filter(item => item !== nextChange);
            }
            changes = changes.filter(item => item !== nextChange);
        }
        if (!toDelete) {
            optimizedChanges.push(change);
        }
        changes = changes.filter(item => item !== change);
    }
    console.log(optimizedChanges);
    return optimizedChanges;
};