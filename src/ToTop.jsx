import './ToTop.css';

/* Takes us back to the top of the page when clicked. Added it because otherwise there can be a lot scrolling to get back to the top of the movie list displayed.  */
const ToTop = () => {
    return (
        
        <a href="#" id='to_top'>
            <div id='ToTop_container'>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </div>
        </a>
    )
}

export default ToTop;