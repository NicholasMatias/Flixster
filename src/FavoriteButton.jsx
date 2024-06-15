import './FavoriteButton.css';
import PropType from 'prop-types';
import { useState } from 'react';




const FavoriteButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }
    return (
        <div className='button_container'>
            <button className={`favorite-button ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite}>
                <i className={`fa ${isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}></i>
            </button>
        </div>
    )
}


FavoriteButton.propTypes = {
    isFavorite: PropType.bool.isRequired,
    onToggle: PropType.bool.isRequired
};
export default FavoriteButton;