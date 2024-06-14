import './FavoriteButton.css';




const FavoriteButton = ({isFavorite, onToggle}) =>{
    return(
        <div className='button_container'>
            <button className={`favorite-button ${isFavorite ? 'favorite': ''}`} onClick={onToggle}>
                <i className={`fa ${isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}></i>
            </button>
        </div>
    )
}

export default FavoriteButton;