import {Skill, SkillChange, SkillCreate, SkillUpdate} from "../../types/skill.ts";
import {useState} from "react";
import styles from "./CollapsibleRecursiveList.module.css";
import {getRandomInt} from "../../utlis/random.ts";
import {addSkill, editSkill, removeSkill} from "../../api/SkillsApi.ts";
import {useNavigate} from "react-router-dom";

const CollapsibleSkillList = ({items}: { items: Array<Skill> }) => {
    const [skills, setSkills] = useState(items);
    const [changes, setChanges] = useState<SkillChange[]>([]);
    const navigate = useNavigate();

    const deleteSkill = (id: number) => {
        setSkills(skills.filter(x => x.id !== id));
    }

    const handleSave = () => {
        changes.forEach(change => {
            if (change.type === "ADD") {
                const skill: SkillCreate = {
                    title: change.title,
                    priority: change.priority,
                    parentId: change.parentId
                };
                addSkill(skill).then(response => {
                    if (response.status === 401) {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                    }
                });
            } else if (change.type === "CHANGE") {
                const skill: SkillUpdate = {
                    title: change.title,
                    priority: change.priority,
                    id: change.id,
                };
                editSkill(skill).then(response => {
                    if (response.status === 401) {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                    }
                });
            } else if (change.type === "DELETE") {
                removeSkill(change.id).then(response => {
                    if (response.status === 401) {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                    }
                })
            }
        })
        console.log(changes);
        setChanges([]);
    }

    const handleCreate = () => {
        const id = getRandomInt(-100, 1);
        const newSkill: SkillChange = {type: "ADD", priority: 0, parentId: 0, id: id, title: "New skill"};
        setChanges([...changes, newSkill]);
        setSkills([...skills, {id: id, priority: 0, title: "New skill", children: null}]);
    };

    return (
        <>
            <button className={`${styles.add} ${styles.skillButton}`} onClick={handleCreate}>+</button>
            <ul>
                {skills.sort((a, b) => a.priority - b.priority).map((skill: Skill) => {
                    return <CollapsibleSkill key={skill.id} skill={skill} changes={changes} onDelete={deleteSkill}
                                             setChanges={setChanges}/>;//>
                })}
            </ul>
            <button onClick={handleSave}>Сохранить</button>
        </>
    )
}

const CollapsibleSkill = ({skill, changes, onDelete, setChanges}: {
    skill: Skill,
    changes: Array<SkillChange>,
    onDelete: (id: number) => void,
    setChanges: (changes: Array<SkillChange>) => void
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [children, setChildren] = useState(skill.children ?? []);

    const deleteSkill = (id: number) => {
        setChildren(children.filter(child => child.id !== id));
    };

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    const handleCreate = () => {
        const id = getRandomInt(-100, 1);
        const newSkill: SkillChange = {type: "ADD", priority: 0, parentId: skill.id, id: id, title: "New skill"};
        setChanges([...changes, newSkill]);
        setChildren([...children, {id: id, priority: 0, title: "New skill", children: null}]);
    };

    const handleDelete = () => {
        const skillToDelete: SkillChange = {type: "DELETE", id: skill.id};
        setChanges([...changes, skillToDelete]);
        console.log(changes);
        onDelete(skill.id);
    }

    const handleEdit = (event) => {
        const index = changes.findIndex(e => e.id === skill.id && e.type === "CHANGE");
        const change = {type: "CHANGE", id: skill.id, title: skill.title, priority: skill.priority};

        switch (event.target.id) {
            case "title":
                change.title = event.target.value;
                break;
            case "priority":
                change.priority = event.target.value;
                break;
        }

        if (index !== -1) {
            changes[index] = change;
            setChanges([...changes]);
        } else {
            setChanges(prevChanges => [...prevChanges, change]);
        }
        console.log(changes);
    };

    return (
        <li>
            <div className={styles.skill}>
                <input className={styles.skillTitle} defaultValue={skill.title} id={"title"} onBlur={handleEdit}/>
                <input className={styles.skillPriority} defaultValue={skill.priority} id={"priority"}
                       onBlur={handleEdit} type={"number"}
                       onChange={handleEdit}/>
                <div className={styles.skillButtons}>
                    {children.length > 0 &&
                        <button className={`${styles.toggle} ${styles.skillButton}`}
                                onClick={toggleSection}>{isOpen ? "↑" : "↓"}</button>}
                    <button className={`${styles.add} ${styles.skillButton}`} onClick={handleCreate}>+</button>
                    <button className={`${styles.delete} ${styles.skillButton}`} onClick={handleDelete}>-</button>
                </div>
            </div>
            {isOpen && children.length > 0 && (
                <ul>
                    {children.sort((a, b) => a.priority - b.priority).map((child: Skill) => {
                        return <CollapsibleSkill key={child.id} skill={child} changes={changes}
                                                 onDelete={deleteSkill} setChanges={setChanges}/>;
                    })}
                </ul>
            )}
        </li>
    )
};

export default CollapsibleSkillList;