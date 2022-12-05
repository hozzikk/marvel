import { useEffect, useState, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = ({onSelectedChar}) => {
    
    const [charList, setCharList] = useState([]);
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const itemRefs = [];

    let marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
        .getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError);
    }

    function onCharListLoading () {
        setNewItemLoading(true);
    }

    function onError () {
        setLoading(false);
        setError(true);
    }

    function onCharListLoaded (newCharList) {
        let ended = false;
        if (newCharList.length < 9){
            ended = true
        }
        setCharList(() => ([...charList, ...newCharList]))
        setLoading(false);
        setNewItemLoading(false);
        setOffset(() => (offset + 9))
        setCharEnded(ended)
    }


    const setRef = (ref) => {
        itemRefs.push(ref)
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs[id].classList.add('char__item_selected');
        itemRefs[id].focus();
    }


    const charListView = (arr) => {
        
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    ref={setRef}
                    onClick={() => {
                        onSelectedChar(item.id);
                        // focusOnItem(i);
                    }}>
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

    const items = charListView(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(errorMessage || spinner) ? items : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;