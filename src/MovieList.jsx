import './MovieList.css';
import MovieCard from './MovieCard';
import { useState, useEffect } from 'react';

function MovieList() {

    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [query, setQuery] = useState('');
    const [sortby, setSortby] = useState('');

    {/* The useEffect will be triggered each time query (what we are searching for), the page, or sortby (how we choose to sort the movies) is changed.  
    */}

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTk4ZTdhNDAzODljYmRlYjQwMTQ0OTQ1ZGQwYTMxZiIsInN1YiI6IjY2Njc3MTY3ZGQzYTMzZDdhZjg1YTVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DMEfKAm2887y-Rm2Qj9F66yNZjFJ28QrgcE2ktrx8tc'
            }
        };
        if (sortby === "" && query === "") {


            fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => setMovieList([...movieList, ...response.results]))
                .catch(err => console.error(err));
        }
        else if (query !== "") {


            fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => setMovieList([...movieList, ...response.results]))
                .catch(err => console.error(err));
        }
        else if (sortby !== "") {


            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortby}`, options)
                .then(response => response.json())
                .then(response => setMovieList([...movieList, ...response.results]))
                .catch(err => console.error(err));
        }
    }, [page, query, sortby])

    


    {/* Everytime the value in the input tag is changed we will update the query value. This will set off the useEffect as well. This is how the movies are 
    populated as the user is actively typing. Page is set to one as we want the movies that have titles that are the closest is resemblance to our query (search value) 
    Lastly, we are resetting the movielist as we do not want to append to the current list. */}
    const updateSearch = (e) => {
        setQuery(e.target.value);
        setMovieList([])
        setPage(1);
    }

    {/* Whenever the container with all of the sortby options (the drop down) is changed, we update sortby and set the page equal to 1.
    Similarly, we set the movie list to empty as we are not appending movies to the current movie list.  */}
    const updateSortby = (e) => {
        setSortby(e.target.value);
        setPage(1);
        setMovieList([]);
        setQuery("");
    }


    const increasePage = () => {
        setPage(page + 1);
    }






    return (
        <div>
            <div className='search_bar_container'>
                <input id="search_bar" placeholder='Search for movies...' onChange={updateSearch}>

                </input> {/* This is the drop down menu which allows the user te choose how the movies are sorted.  */}
                <div id='dropdown_container'>
                    <select className='dropdown_button' onChange={updateSortby}>
                        <option value="">Now Playing</option>
                        <option value="title.asc">A-Z</option>
                        <option value="title.desc">Z-A</option>
                        <option value="primary_release_date.desc">Release Date</option>
                        <option value="vote_average.desc">Best Rating</option>
                        <option value="popularity.desc">Most Popular</option>

                    </select>
                </div>

            </div>
            {/* This will create all of the movie cards. Used the .map function this week as suggested through last weeks feedback.  */}
            <div className='movies'>
                {movieList?.map((movie, i) => {
                    return (
                        <MovieCard key={i}
                            title={movie.title}
                            avgRating={movie.vote_average}
                            imgSrc={movie.poster_path}
                            description={movie.overview}
                            releaseDate={movie.release_date}
                            trailer=''
                            genres={movie.genre_ids}
                            runtime=''
                            backdrop_photo={movie.backdrop_path}
                            movieID={movie.id}
                        />)

                })}

            </div>

                {/* Whenever the load more button is pressed the page is incremented by 1. This will then cause the useEffect to be triggered as we are taking into account
                when the page variable changes. This will lead to the api be called and loading the next page of movies. This applies to now playing and all of the
                various ways that the movies can be sorted.  */}

            <div className='loadMore-container'>
                <button onClick={increasePage} id='loadMore'>
                    Load More
                </button>
            </div>


        </div>
    );

}





export default MovieList;