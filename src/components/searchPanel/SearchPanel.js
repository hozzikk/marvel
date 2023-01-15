import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './searchPanel.scss';
import useMarvelService from '../../services/MarvelService';

const SearchPanel = () => {
    const [isHave, setIsHave] = useState(false);
    const [charName, setCharName] = useState(null);
    const [charLink, setCharLink] = useState(null);
    const [char, setChar] = useState('');
    const [charList, setCharList] = useState([]);
    const { getAllCharacters } = useMarvelService();

    useEffect(() => {
        getAllCharacters()
            .then(data => setCharList(charList => [...data]))
    }, [])

    const onCharListLoaded = () => {

        for(let i = 0; i < charList.length; i++){
            if(charList[i].name.toLowerCase().indexOf(char.toLowerCase()) >= 0){
                console.log(charList[i])
                if(char.length === 0) {
                    return
                }
                setIsHave(true);
                setCharName(charList[i].name);
                setCharLink(charList[i].thumbnail);
            }
        }

        // for(let i = 0; i < charList.length; i++){
        //     if(charList[i].name.toLowerCase().includes(char.toLowerCase())){
        //         if(char.length === 0) {
        //             return
        //         }
        //         setIsHave(true);
        //         setCharName(charList[i].name);
        //         setCharLink(charList[i].thumbnail);
        //     }
        // }
    }

    return (
        <div className='searchPanel'>
            <label htmlFor="searchPanel">Or find a character by name:</label>
            <Formik
                initialValues={{ char: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.char) {
                        errors.char = 'This field is requied!'
                    }
                    return errors;
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='searchPanel__form'>
                            <Field
                                value={char}
                                onChange={(e) => setChar(e.target.value)}
                                type='input'
                                name='char'
                                placeholder='Enter name' />

                            <button onClick={onCharListLoaded} type="submit" disabled={isSubmitting} className='button button__main'>
                                <div className="inner">FIND</div>
                            </button>
                        </div>
                        {isHave ?  <View charName={charName} charLink={charLink} />
                                : <ErrorMessage className='error' name='char' component='div' />}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const View = ({charName, charLink}) => {

    return(
        <div className='view'>
            There is! Visit {charName} page?
            <a href="#" className='button button__secondary'>
                <div className='inner'>To Page</div>
            </a>
        </div>
    )
}

export default SearchPanel;