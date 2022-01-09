import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {MainPage, ComicsPage, SingleComicPage} from '../components/pages';
import AppHeader from "../components/appHeader/AppHeader";
const Page404 = lazy(() => import ('../components/pages/404'))

const MarvelRoute = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes>
                            <Route  path="/" element={<MainPage/>}/>
                                
                            <Route  path="/comics" element={<ComicsPage/>}/>

                            <Route  path="/comics/:comocId" element={<SingleComicPage/>}/>

                            <Route path="*" element={<Page404/>}/>
                            
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default MarvelRoute;