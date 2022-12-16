

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <RandomChar />
            <div className="char__content">
                <CharList onSelectedChar={onSelectedChar} />
                <CharInfo charId={selectedChar} />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage