import { useState } from 'react';
import './WatchedButton.css';

/* Very similar to the favorite button as it is also a toggle button.  */
/* When the movie has not been seen or watched the eye has a slash through it. 
When the user presses the button to signal that they have seen the movie, the slash will no longer appear. */ 
const WatchedButton = () => {
    const [seen, setSeen] = useState(false);
    const toggleVisibility = () => {
        setSeen(!seen);
    }

    return (
        <button className='visibility-button' onClick={toggleVisibility}>
            <i className={`fa ${seen ? 'fa-eye' : 'fa-eye-slash'}`}></i>
        </button>
    )
}

export default WatchedButton;