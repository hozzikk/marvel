import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])
    
    const onRequest = () => {
        setNewItemLoading(true)
        getAllComics()
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(false)
    }

    const comicsListView = (arr) => {
        const items = arr.map((item, i) => 
            <li className="comics__item" key={i}>
                <a href="#">
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">9.99$</div>
                </a>
            </li>
        )

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = comicsListView(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            onClick={onRequest}>
                <div className="inner">
                    load more
                </div>
            </button>
        </div>
    )
}

export default ComicsList;