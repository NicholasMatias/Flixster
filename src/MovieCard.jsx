import './MovieCard.css';
import FavoriteButton from './FavoriteButton';
import Modal from './Modal';
import PropType from 'prop-types';
import WatchedButton from './WatchedButton';
import defaultCardImg from "./assets/DefaultCardPhoto.png"


function MovieCard({ title, imgSrc, avgRating, description, releaseDate, trailer, genres, runtime, backdrop_photo, movieID }) {

    return (
        <>

            <div className='movie-card'>
                {/* If the movie poster img is invalid or null then we will display the default card image that I made in figma. Otherwise we will display the 
                movie's respective poster.  */}
                {imgSrc ? <img src={`https://image.tmdb.org/t/p/w500${imgSrc}`} alt="Image could not be loaded." className='movieImage' /> : <img src={defaultCardImg} className='movieImage'></img>}
                <p className='movieAvgRating'>Rating: {avgRating}</p>
                <div className="button_container">

                    {/* passing in all of the information that will be utilized within the modal.  */}
                    <Modal
                        title={title}
                        releaseDate={releaseDate}
                        overview={description}
                        genres={genres}
                        trailer={trailer}
                        runtime={runtime}
                        backdrop_path={backdrop_photo}
                        movieID={movieID}

                    />
                    {/* Each card has a favorite and watched button unique to its card.  */}
                    <FavoriteButton />

                    <WatchedButton />
                </div>

            </div>

        </>
    );
}


MovieCard.propTypes = {
    title: PropType.string.isRequired,
    imgSrc: PropType.string.isRequired,
    avgRating: PropType.number.isRequired,
    description: PropType.string.isRequired,
    releaseDate: PropType.string.isRequired,
    trailer: PropType.string.isRequired,
    genres: PropType.array.isRequired,
    runtime: PropType.string.isRequired,
    backdrop_photo: PropType.string.isRequired,
    movieID: PropType.number.isRequired
};


export default MovieCard;