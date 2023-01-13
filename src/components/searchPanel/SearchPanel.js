import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './searchPanel.scss';

const SearchPanel = () => {
    return (
        <div className='searchPanel'>
            <label htmlFor="searchPanel">Or find a character by name:</label>
            <Formik
                initialValues={{ char: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.char) {
                        errors.char = 'Required!'
                    }
                    return errors;
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='input' name='char' placeholder='Enter name' />
                        <button type="submit" disabled={isSubmitting}>
                            FIND
                        </button>
                        <ErrorMessage name='char' component='div' />
                        
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SearchPanel;