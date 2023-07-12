import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));



const App = () => {
   return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>
                            <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComicLayout} dataType='comic'/>
                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType='character'/>
                            </Route>
                            <Route path="*">
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

    // <div className="app">

    // {/*<main>*/}
    // {/*    /!*<ErrorBoundary>*!/*/}
    // {/*    <RandomChar/>*/}
    // {/*    /!*{this.state.showRandomChar ? <RandomChar/> : null}*!/*/}
    //      {/*<button onClick={this.toggleRandomChar}>Click me</button>*/}
    //      {/*</ErrorBoundary>*/}
    //
    // {/*    <div className="char__content">*/}
    // {/*        /!*<ErrorBoundary>*!/*/}
    // {/*        <CharList onCharSelected={onCharSelected}/>*/}
    // {/*        /!*</ErrorBoundary>*!/*/}
    //
    // {/*        /!*<ErrorBoundary>*!/*/}
    // {/*        <CharInfo charId={selectedChar}/>*/}
    // {/*        /!*</ErrorBoundary>*!/*/}
    // {/*    </div>*/}
    // {/*    <img className="bg-decoration" src={decoration} alt="vision"/>*/}
    // {/*</main>*/}

    //         <Routes>
    //             <Route path="/" element={<AppHeader/>}>
    //              <Route path="/" element={<Main/>}/>
    //              <Route path="/comicsList" element={<ComicsList onComicsSelected={onComicsSelected} comicsId={selectedComics}/>}/>
    //             </Route>
    //         </Routes>
    //     </div>
    // );
};


export default App;