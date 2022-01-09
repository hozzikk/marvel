import { useState } from 'react';
import './logging.css';
const Logging = ({updateData}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkLogging, setCheckLoging] = useState(false)
    const clickLogging = (e) => {
        e.preventDefault();
        if(login === 'Khatsava' && password === 'Open3210'){
            setCheckLoging(true);
        }
    }

    updateData(checkLogging);
    return (
        <div className="login-form">
            <div className="text">
                LOGIN
            </div>
            <form className='myForm'>
                <div className="field">
                    <div className="fas fa-envelope"></div>
                    <input 
                    className='logInput'
                    type="text" 
                    placeholder="Email or Phone"
                    value={login}
                    onChange={e => setLogin(e.target.value)}/>
                </div>

                <div className="field">
                    <div className="fas fa-lock"></div>
                    <input 
                    className='logInput'
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                </div>

                <button className='logBtn' onClick={clickLogging}>LOGIN</button>
            </form>
        </div>
    );
};

export default Logging;