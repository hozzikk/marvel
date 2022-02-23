import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    

    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }



    const onCharLoaded = (char) => {
        setChar(char);
    }

    const setContent = (process, char) => {
        switch (process) {
            case 'waiting':
                return <Skeleton/>;
                break;
            case 'loading':
                return <Spinner/>;
                break;
            case 'confirmed':
                return <View char={char}/>;
                break;
            case 'error':
                return <ErrorMessage/>;
                break;
            default:
                throw new Error('Unex[ected process state');
        }
    }

    

    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char)? <View char={char}/> : null;

    return (
        <div className="char__info">
            {setContent(process, char)}
        </div>
    )
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'}
    }

    let newComics = comics.slice(0, 10);
    return(
        <>
        <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
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
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {
                        
                        newComics.map((item, i) => {
                            return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;