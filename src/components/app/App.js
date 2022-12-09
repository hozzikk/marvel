import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import PropTypes from 'prop-types'
import ComicsList from '../comicsList/ComicsList';

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);
    const onSelectedChar = (id) => {
        setSelectedChar(id);
    }
    return (
        <div className="app">
             <AppHeader/>
           {/* <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onSelectedChar={onSelectedChar}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> */}

            <ComicsList />
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default App;