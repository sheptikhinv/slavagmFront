const skillsList = document.querySelector(".skills-list");

const insertSkills = (skills) => {
    childrenToNode(skills, skillsList);
};

const childrenToNode = (children, node) => {
    children.sort((a, b) => a.priority - b.priority);
    children.forEach(child => {
        const skillElement = document.createElement("li");
        skillElement.innerText = child.title;
        if (child.children) {
            const skillChildrenElements = document.createElement("ul");
            skillElement.appendChild(skillChildrenElements);
            childrenToNode(child.children, skillChildrenElements);
        }
        node.appendChild(skillElement);
    })
}

export {insertSkills};