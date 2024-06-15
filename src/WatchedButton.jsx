import { useState } from 'react';
import './WatchedButton.css';



const WatchedButton = () => {
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <button className='visibility-button' onClick={toggleVisibility}>
            <i className={`fa ${isVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
    )
}

export default WatchedButton;