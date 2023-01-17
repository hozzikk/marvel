import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import SearchForm from "../searchForm/SearchForm";

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
                <div>
                    <CharInfo charId={selectedChar} />
                    <SearchForm />
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage
