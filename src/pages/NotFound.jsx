import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            404 Not Found <br/>
            <Link className='text-purple-700' to='/'>Turn to login screen</Link>
        </div>
    );
}

export default NotFound;
