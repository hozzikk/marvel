import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = ({onSelectedChar}) => {

    const [char, setChar] = useState([]);
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const notImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    let marvelService = new MarvelService();

    useEffect(() => {
        marvelService
        .getAllCharacters()
        .then(onCharListLoaded)
        .catch(onError);
    }, [])

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharListLoaded = (charList) => {
        setChar(charList)
        setLoading(false);
    }

    const charListView = (arr) => {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => onSelectedChar(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = charListView(char);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(errorMessage || spinner) ? items : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;