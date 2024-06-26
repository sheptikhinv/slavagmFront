import Surface from "../Surface/Surface.tsx";
import {CardType} from "../../types/cardType.ts";

const Card = ({card} : {card : CardType}) => {

    return (
        <Surface isPrimary={Math.random() < 0.5}>
            <>
                <h2 className={""}>{card.title}</h2>
                <p className={""}>{card.description}</p>
                {card.link && <a href={card.link} target={"_blank"} className={""}>Подробнее</a>}
            </>
        </Surface>
    );
};

export default Card;