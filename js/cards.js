const cardTemplate = document.querySelector('#card');
const cardsSection = document.querySelector('.cards');

const createCards = () => {
    for (let i = 0; i < 10; i++) {
        const card = cardTemplate.content.cloneNode(true);
        const title = card.querySelector('.card-title');
        const content = card.querySelector('.card-content');
        const link = card.querySelector('.card-link');
        title.innerText = "ТестКарточка";
        content.innerText = "Контент карточки\nЭто пример очень длинного текста, чтоб проверить как карточка будет себя вести. Я люблю майнкрафт, очень сильно, игра хорошая. Еще на Питоне писать люблю, тоже прикольно в целом, даааа";
        link.href = "https://google.com/";
        cardsSection.appendChild(card);
    }



}

export {createCards};