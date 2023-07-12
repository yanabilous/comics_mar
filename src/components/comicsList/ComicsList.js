import "./comicsList.scss";
import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {Link } from "react-router-dom";
import useComicsService from "../../services/ComicsService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = (props) => {
    console.log("ComicsList");
    const [comicsList, setComicsList] = useState([]);
    const {loading, error, getAllComics} = useComicsService();
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);


    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    };


    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        // console.log(newComicsList);
        // console.log([...comicsList, ...newComicsList]);

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    };
    // const itemRefs = useRef([]);
    //
    // const focusOnItem = (id) => {
    //     itemRefs.current.forEach(item => item.classList.remove("comics__item_selected"));
    //     itemRefs.current[id].classList.add("comics__item_selected");
    //     itemRefs.current[id].focus();
    // };




    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    // function renderItems(arr) {
    //     const items = arr.map((item, i) => {
    //         let imgStyle = {"objectFit": "cover"};
    //         if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    //             imgStyle = {"objectFit": "unset"};
    //         }
    //
    //         return (
    //             <li
    //                 className="comics__item"
    //                 key={i}
    //                 tabIndex={0}
    //                 // ref={el => itemRefs.current[i] = el}
    //                 // key={item.id}
    //                 onClick={() => {
    //                     props.onComicsSelected(item.id);
    //                     // focusOnItem(i);
    //                 }}
    //                 onKeyPress={(e) => {
    //                     if (e.key === " " || e.key === "Enter") {
    //                         props.onComicsSelected(item.id);
    //                         // focusOnItem(i);
    //                     }
    //                 }}>
    //                 <img src={item.thumbnail} alt={item.name} style={imgStyle} className="comics__item-img"/>
    //                 <div className="comics__item-name">{item.title}</div>
    //                 <div className="comics__item-price">{item.prices[0].price}</div>
    //
    //             </li>
    //         );
    //     });
    //
    //     return (
    //         <ul className="comics__grid">
    //             {items}
    //         </ul>
    //     );
    // }
    //
    // const items = renderItems(comicsList);
    //
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;
    //
    // return (
    //
    //     <div className="comics__list">
    //         {errorMessage}
    //         {spinner}
    //         {items}
    //         <button
    //             className="button button__main button__long"
    //             disabled={newItemLoading}
    //             style={{"display": comicsEnded ? "none" : "block"}}
    //             onClick={() => onRequest(offset)}>
    //             <div className="inner">load more</div>
    //         </button>
    //     </div>
    // );
    //

    // return (
    //     <div className="comics__list">
    //         <ul className="comics__grid">
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //         </ul>
    //         <button className="button button__main button__long">
    //             <div className="inner">load more</div>
    //         </button>
    //     </div>
    // );
};

// ComicsList.propTypes = {
//     onComicsSelected: PropTypes.func.isRequired
// };

export default ComicsList;