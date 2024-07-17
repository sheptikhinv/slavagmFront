const memPhrases = [
    "Вот бы slavagm.dev купить...",
    "РТФ бухать готов",
    "Приемлемо",
    "404 Not found"
];

export const timeGreeting = () => {
    const hours = new Date().getHours();
    switch (true) {
        case hours >= 5 && hours <= 12:
            return "Доброе утро!";
        case hours >= 12 && hours <= 17:
            return "Хорошего дня!";
        case hours >= 17 && hours < 24:
            return "Приятного вечера!";
        case hours >= 0 && hours <= 5:
            return "Чзх, а спать?"
    }
}

export const randomPhrase = () => memPhrases[Math.floor(Math.random() * memPhrases.length)];