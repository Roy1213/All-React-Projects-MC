import Open from "./Open";
import OpenContent from "./OpenContent";
import Closed from "./Closed";
import { useState } from 'react';

const Remote = () => {
    const [isOpen, setOpen] = useState(false)
    const handleClick = () => {
        console.log('Clicked')
        setOpen(!isOpen)
    } 
    return (
        <div>
            <button onClick={handleClick} style={{
                backgroundColor: `rgb(35, 35, 35)`,
                borderColor: `rgb(35, 35, 35)`,
                minWidth: '50%',
                border: 0,
                ...(isOpen ? {borderTopLeftRadius: '10px', borderTopRightRadius: '10px', } : {borderRadius: '10px'})
            }}>
                <div>
                    {isOpen ? (<Open/>) : (<Closed/>)}
                </div>
            </button>
            <div>
                {isOpen ? (<OpenContent/>) : (<></>)}
            </div>
            
            
        </div>
    )
}
export default Remote