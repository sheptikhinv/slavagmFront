import {createCards} from "./cards.js";

const baseUrl = 'http://localhost:5141/';

const getCards = () => {
    fetch(baseUrl + 'api/Cards/getCards')
        .then((response) => response.json())
        .then((data) => {
            createCards(data);
        })
        .catch((err) => {console.log(err)});
}

export {getCards}