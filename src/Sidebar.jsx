import { useState } from 'react';
import './Sidebar.css';


const Sidebar = () =>{
    
    const [sidebar_toggled, set_sidebar_toggled] = useState(false);
    const toggleShow = () =>{
        set_sidebar_toggled(!sidebar_toggled);
        console.log("Sidebar show:", sidebar_toggled);

    }

    return(
        <>
            <nav>
                <div className='sidebar-container'>
                    <button className='sidebar-toggle' onClick ={toggleShow}>
                        
                    </button>
                </div>
            </nav>

            <aside className={`${sidebar_toggled ? "visible" : ""}`}>
                
            </aside>
         
        </>
    )
}

export default Sidebar;