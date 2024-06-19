import {createCards} from "./cards.js";
import {insertSkills} from "./skills.js";

const BASE_URL = 'http://localhost:5226';

const getCards = () => {
    fetch(`${BASE_URL}/Cards/all`)
        .then((response) => response.json())
        .then((data) => {
            createCards(data);
        })
        .catch((err) => {
            console.log(err)
        });
};

const getSkills = () => {
    fetch(`${BASE_URL}/Skills/all`)
        .then((response) => response.json())
        .then((data) => {
            insertSkills(data);
        })
        .catch((err) => {
            console.log(err)
        });
};

export {getCards, getSkills}