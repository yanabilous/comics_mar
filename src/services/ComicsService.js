import {useHttp} from "../hooks/http.hook";


const useComicsService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=26bf773b3288c2d35df092385ce05b83";
    const _baseOffset = 522;





    const getAllComics= async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey} `);
        return _transformComics(res.data.results[0]);
    };
     const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'


        }
    }

    // const _transformComics = (comic) => {
    //     return {
    //         id: comic.id,
    //         items: comic.items,
    //         title: comic.title,
    //         issueNumber: comic.issueNumber,
    //         thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
    //         prices: comic.prices
    //     };
    //
    // };
    return {loading, error, getAllComics, getComic, clearError};
}



export default useComicsService;