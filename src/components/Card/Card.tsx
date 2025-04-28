import Surface from "../Surface/Surface.tsx";
import {CardType} from "../../types/cardType.ts";
import {getRandomInt} from "../../utlis/random.ts";

const Card = ({card}: { card: CardType }) => {

    return (
        <Surface isPrimary={getRandomInt(1, 2) == 1}>
            <>
                <h2 className={""}>{card.title}</h2>
                <p className={""}>{card.description}</p>
                {card.link && <a href={card.link} target={"_blank"} className={""}>Подробнее</a>}
            </>
        </Surface>
    );
};

export default Card;
