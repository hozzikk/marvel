import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    const [arrChar, setArrChar] = useState(null);
    const onCharSelected = (id) => {
        setChar(id);
    }

    const getCharList = (charList) => {
        if(charList.length != 0){
            setArrChar(charList)
        }
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} list={getCharList}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;