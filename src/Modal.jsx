import { useEffect, useState } from "react";
import PropType from 'prop-types';
import "./Modal.css";

export default function Modal({ title, releaseDate, overview, backdrop_path, movieID }) {
  const [modal, setModal] = useState(false); /* Default state set to false as the modal should not be displayed unless the view button is clicked.  */ 
  const [movieKey, setMovieKey] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  /* If the modal variable is true then we will append to the class name. This will now lead to the visibility of the modal being changed thus allowing us to see the modal.
  The same can be said for if the modal variable is false. Now we are removing from the class name and thus changing the visibility to hidden.  */ 
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }





  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTk4ZTdhNDAzODljYmRlYjQwMTQ0OTQ1ZGQwYTMxZiIsInN1YiI6IjY2Njc3MTY3ZGQzYTMzZDdhZjg1YTVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DMEfKAm2887y-Rm2Qj9F66yNZjFJ28QrgcE2ktrx8tc'
      }
    };

    /* This API call's purpose is to find the movie trailer id for each movie that is being displayed. I am matching the movie id to the trailer id by making sure that the 
    site is YouTube and that the type is Trailer withing the data.  */

    fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => response.results)
      .then(response => response.find(
        (movie) => movie.site === "YouTube" && movie.type === "Trailer"
      ))
      .then((movie) => {
        setMovieKey(`https://www.youtube.com/embed/${movie.key}`)      /* Add the trailer key to the rest of the url to get a valid link.*/
      })


  }, [movieID]) /* Is called when movieID is changed. Basically everytime we are processing a different movie.  */





  return (
    <>
      <button onClick={toggleModal} className="btn-modal"> {/* This button is what enables users to open up the modal.  */}
        <h3 className="view-button">View</h3>
      </button>

      {modal && (  
        <div className="overlay" onClick={toggleModal}>
          <div className="background-image" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`
          }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} > {/* Means we can't close the modal by clicking anywhere within the modal-content container. 
            This does however enable the user to click outside of the modal on the window to close the modal. Additionally, the user could utilize the close button.  */}


              <h2>{title}</h2>
              <h3>Released on: {releaseDate}</h3>

              <p>
                Overview: {overview}
              </p>
              <div className="trailer_container">
                <div className="trailer_wrapper">
                  {modal ? <iframe className="trailer" title="YouTube Video Player" allowFullScreen src={movieKey} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                  </iframe> : null} {/* To make the site quicker and more efficient, I am only loading in the movie trailer when the modal is displayed otherwise it is null.  */}
                </div>
              </div>


              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
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



