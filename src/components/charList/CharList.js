import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = () => {

    const [char, setChar] = useState([]);
    const notImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    let marvelService = new MarvelService();

    useEffect(() => {
        marvelService
        .getAllCharacters()
        .then(res => setChar(res))
    }, [])


    return (
        <div className="char__list">
            <ul className="char__grid">
                {char.map((item) => 
                    <li className="char__item" key={item.name}>
                        <img src={item.thumbnail} 
                             style={item.thumbnail===notImage ? {objectFit: 'contain'} : {objectFit: 'cover'}} alt="abyss" />
                        <div className="char__name">{item.name}</div>
                    </li>
                )}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;