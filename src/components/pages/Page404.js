import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return (
        <div style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>
            <ErrorMessage />
            Sorry bro, you're lost, I'll help you get <Link to='/' style={{color: '#9f0013'}}>back</Link>
        </div>
    );
};

export default Page404;