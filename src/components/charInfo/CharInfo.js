import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    let marvelService = new MarvelService();

    const updateChar = () => {
        if(!charId) {
            return;
        }
        setLoading(true)
        marvelService
        .getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError)
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    useEffect(updateChar, [charId])
    
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default CharInfo;


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Sorry bro, this character doesn't have a comic book"}
                {comics.map((item, i) => {
                    if(i > 9) return;
                    return (
                        <li key={i} className='char__comics-item'>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}