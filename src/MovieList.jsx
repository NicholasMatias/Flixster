import './MovieList.css';
import MovieCard from './MovieCard';
import {useState, useEffect} from 'react';

function MovieList(){
    
    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [query, setQuery] = useState('');
    const [sortby, setSortby] = useState('');
    
    

    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTk4ZTdhNDAzODljYmRlYjQwMTQ0OTQ1ZGQwYTMxZiIsInN1YiI6IjY2Njc3MTY3ZGQzYTMzZDdhZjg1YTVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DMEfKAm2887y-Rm2Qj9F66yNZjFJ28QrgcE2ktrx8tc'
            }
          };
        if(sortby==="" && query===""){
        
          
          fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options)
            .then(response => response.json())
            .then(response => setMovieList([...movieList, ...response.results]))
            .catch(err => console.error(err));
        }
        else if(query!==""){
            
              
              fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => setMovieList([...movieList, ...response.results]))
                .catch(err => console.error(err));
        }
        else if(sortby!==""){
            
              
              fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortby}`, options)
                .then(response => response.json())
                .then(response => setMovieList([...movieList, ...response.results]))
                .catch(err => console.error(err));
        }
    },[page, query, sortby])

   



    const updateSearch = (e) => {
        setQuery(e.target.value);
        setMovieList([])
        setPage(1);
    }


    const updateSortby = (e) =>{
        setSortby(e.target.value);
        setPage(1);
        setMovieList([]);
        setQuery("");
    }
     

    const increasePage = () =>{
        setPage(page+1);
    }



   


    return(
        <div>
            <div className='search_bar_container'>
                <input  id="search_bar" placeholder='Search for movies...' onChange={updateSearch}>
                
                </input>
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
            <div className='movies'>
                {movieList?.map((movie, i)=> {return (
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

            <div className='loadMore-container'>
                <button onClick={increasePage} id='loadMore'>
                    Load More
                </button>
            </div>
                

        </div>
    );
    
}





export default MovieList;