import { useEffect, useState } from "react";
import PropType from 'prop-types';
import "./Modal.css";

export default function Modal({ title, releaseDate, overview, backdrop_path, movieID }) {
  const [modal, setModal] = useState(false);
  const [movieKey, setMovieKey] = useState("")
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  useEffect(()=>{
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTk4ZTdhNDAzODljYmRlYjQwMTQ0OTQ1ZGQwYTMxZiIsInN1YiI6IjY2Njc3MTY3ZGQzYTMzZDdhZjg1YTVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DMEfKAm2887y-Rm2Qj9F66yNZjFJ28QrgcE2ktrx8tc'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => response.results)
        .then(response => response.find(
          (movie) => movie.site === "YouTube" && movie.type ==="Trailer"
          ))
        .then((movie)=>setMovieKey(`https://www.youtube.com/embed/${movie.key}`))

        .catch(err => console.error(err));
  },[movieID])
    

  
    

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        View
      </button>

      {modal && (
        <div className="overlay" onClick={toggleModal}>
          <div className="modal" ></div>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="Image could not be loaded." />
            <h2>{title}</h2>
            <h3>Released on: {releaseDate}</h3>
            {/* <h3>Genres: {genres}</h3> */}
            {/* <h3>Runtime: {runtime}</h3> */}
            <p>
              Overview: {overview}
            </p>
            <div className="trailer_container">
              <div className="trailer_wrapper">
                <iframe className= "trailer" title="YouTube Video Player"  allowFullScreen src={movieKey} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
              </div>
            </div>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  title: PropType.string.isRequired,
  releaseDate: PropType.string.isRequired,
  overview: PropType.string.isRequired,
  genres: PropType.array.isRequired,
  trailer: PropType.string.isRequired,
  runtime: PropType.string.isRequired,
  backdrop_path: PropType.string.isRequired,
  movieID: PropType.number.isRequired
}



