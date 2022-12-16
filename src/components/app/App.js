import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import CharList from "../charList/CharList";
import PropTypes from 'prop-types';
import { MainPage, ComicsPage, Page404 } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path='*' element={<Page404 /> } />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default App;