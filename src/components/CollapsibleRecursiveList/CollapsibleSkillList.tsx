import {Skill, SkillChange, SkillCreate, SkillUpdate} from "../../types/skill.ts";
import {useState} from "react";
import styles from "./CollapsibleRecursiveList.module.css";
import {getRandomInt} from "../../utlis/random.ts";
import {addSkill, editSkill, removeSkill} from "../../api/SkillsApi.ts";
import {useNavigate} from "react-router-dom";
import {optimizeChanges} from "../../utlis/changes.ts";

const CollapsibleSkillList = ({items}: { items: Array<Skill> }) => {
    const [skills, setSkills] = useState(items);
    const [changes, setChanges] = useState<SkillChange[]>([]);
    const navigate = useNavigate();

    const deleteSkill = (id: number) => {
        setSkills(skills.filter(x => x.id !== id));
    }

    const handleSave = async () => {
        optimizeChanges(changes).forEach(change => {
            console.log(change);
            if (change.type == "ADD") {
                const skillCreate: SkillCreate = {
                    title: change.title ?? "unnamed skill",
                    priority: change.priority,
                    parentId: change.parentId ?? 0,
                };

                addSkill(skillCreate).then(response => {
                    if (response.status === 401) {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                    }
                });
            } else if (change.type == "CHANGE") {
                const skillUpdate: SkillUpdate = {
                    title: change.title ?? "unnamed skill",
                    priority: change.priority,
                    id: change.id ?? 0
                };

                editSkill(skillUpdate).then(response => {
                    if (response.status === 401) {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                    }
                });
            } else if (change.type == "DELETE") {
                removeSkill(change.id ?? 0).then(response => {
                    if (response.status === 401) {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                    }
                })
            }
        });

        // сбросить состояние changes после сохранения
        setChanges([]);
    };

    const handleCreate = () => {
        const id = getRandomInt(-100, 1);
        const newSkill: SkillChange = {type: "ADD", priority: 0, parentId: 0, id: id, title: "New skill"};
        console.log(newSkill);
        setChanges([...changes, newSkill]);
        console.log(newSkill);
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
    const [title, setTitle] = useState<string>("");
    const [priority, setPriority] = useState<number>();

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
        onDelete(skill.id);
    }

    const handleEdit = () => {
        const change: SkillChange = {
            type: "CHANGE",
            id: skill.id,
            title: title,
            priority: priority
        };
        console.info(change);
        setChanges([...changes, change]);
    };

    return (
        <li>
            <div className={styles.skill}>

                <input className={styles.skillTitle} defaultValue={skill.title} id={"title"} onBlur={handleEdit}
                       onChange={e => setTitle(e.target.value)}
                />
                <input className={styles.skillPriority} defaultValue={skill.priority} id={"priority"}
                       onBlur={handleEdit} type={"number"}
                       onChange={e => setPriority(Number(e.target.value))}/>
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