const cardTemplate = document.querySelector('#card');
const cardsSection = document.querySelector('.cards');

const createCards = () => {
    for (let i = 0; i < 10; i++) {
        const card = cardTemplate.content.cloneNode(true);
        const title = card.querySelector('.card-title');
        const content = card.querySelector('.card-content');
        const link = card.querySelector('.card-link');
        title.innerText = "ТестКарточка";
        content.innerText = "Контент карточки\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
        link.href = "https://google.com/";
        cardsSection.appendChild(card);
    }



}

export {createCards};