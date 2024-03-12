const cardTemplate = document.querySelector('#card');
const cardsSection = document.querySelector('.cards');

const createCards = (cards) => {
    cards.forEach(card => {
        const newCard = cardTemplate.content.cloneNode(true);
        const title = newCard.querySelector('.card-title');
        const content = newCard.querySelector('.card-content');
        const link = newCard.querySelector('.card-link');

        title.innerText = card.title;
        content.innerText = card.content;
        if (card.link !== ""){
            link.href = card.link;
            link.innerText = "Подробнее";
        }

        cardsSection.appendChild(newCard);
    })


}

export {createCards};