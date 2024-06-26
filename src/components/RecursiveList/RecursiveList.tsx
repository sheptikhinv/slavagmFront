import {Skill} from "../../types/skill.ts";

const RecursiveList = ({items}: { items: Array<Skill> }) => {
    return (
        <ul>
            {items.sort((a, b) => a.priority - b.priority).map((skill: Skill) => {
                return <Item key={skill.id} skill={skill}/>
            })}
        </ul>
    );
};

const Item = ({skill}: { skill: Skill }) => {
    return (
        <li>
            {skill.title}
            {skill.children && skill.children.length > 0 && (
                <ul>
                    {skill.children.sort((a, b) => a.priority - b.priority).map((skill: Skill) => {
                        return <Item key={skill.id} skill={skill}/>;
                    })}
                </ul>
            )}
        </li>
    )
}

export default RecursiveList;