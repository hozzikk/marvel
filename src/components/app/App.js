import { useState } from 'react';
import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SinglePage from '../pages/SinglePage';
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout';
import {MainPage, ComicsPage, SingleComicPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Logging from '../logging/Logging';
const Page404 = lazy(() => import ('../pages/404'))

const App = () => {
    const [value, setValue] = useState(false)
    const updateData = (arg) => {
        setValue(arg)
    }
    console.log(value);
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes>
                            {/* <Route  path="/" element={<MainPage/>}/>
                            <Route  path="/" element={<Logging updateData={updateData}/>}/> */}
                            {value 
                                ?  <Route  path="/" element={<MainPage/>}/>
                                : <Route  path="/" element={<Logging updateData={updateData}/>}/>}
                            <Route  path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>

                            <Route  path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>

                            <Route  path="/comics/:comocId" element={<SingleComicPage/>}/>

                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;