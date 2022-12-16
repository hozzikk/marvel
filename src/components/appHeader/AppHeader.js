import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {

    let activeStyle = {
        color: '#9f0013',
    }

    
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;