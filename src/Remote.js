import Open from './Open';
import OpenContent from './OpenContent';
import Closed from './Closed';
import { useState } from 'react';

const Remote = () => {
    const [isOpen, setOpen] = useState(false)
    const handleClick = () => {
        console.log('Clicked')
        setOpen(!isOpen)
    }
    const click = () => {
        console.log('You clicked it')
    }
    const generateContent = () => {
        const text1 = [
            "Dryer State:",
            "Disch Mode:",
            "Disch Speed SP:",
            "Mid-Grain SP:",
            "Disch Moist SP:",
            "Top Plenum(sp):",
            "Bot Plenum(sp):"
        ]
        const text2 = [
            "Running",
            "Manual",
            "10 %",
            "120 F",
            "15.0 %",
            "180 F",
            "180 F"
        ]
        const rows = []
        for (let i = 0; i < 7; i++) {
            rows.push(
                <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <p style={{
                            paddingLeft: 5
                        }}>{text1[i]}</p>
                        <p style={{
                            paddingLeft: 5,
                            color: 'lime'
                        }}>{text2[i]}</p>
                    </div>

                    <button onClick={click} style={{
                        backgroundColor: 'rgb(134, 38, 51)',
                        borderWidth: 1,
                        color: 'white',
                        maxHeight: 40,
                        borderRadius: 10
                    }}>Change...</button>
                </div>)
        }
        return <div>{rows}</div>
    }
    return (
        <div style={{
            alignItems: 'center'
        }}>
            <button onClick={handleClick} style={{
                backgroundColor: `rgb(35, 35, 35)`,
                borderColor: `rgb(35, 35, 35)`,
                minWidth: '50%',
                maxWidth: '50%',
                overflowX: 'hidden',
                paddingLeft: 30,
                paddingRight: 30,
                maxHeight: 50,
                border: 0,
                overflow: 'hidden',
                ...(isOpen ? { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' } : { borderTopLeftRadius: '10px', borderTopRightRadius: '10px', })
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h1 style={{ color: 'white' }}>Remote Control</h1>
                    {/*<h1 style={{ color: `rgb(35, 35, 35)` }}>_</h1>*/}
                    {isOpen ? <h1 style={{ color: 'white' }}>⊖</h1> : <h1 style={{ color: 'white' }}>⊕</h1>}
                </div>
            </button>
            <div style={{
                color: 'white',
                backgroundColor: `rgb(35, 35, 35)`,
                maxWidth: '50%',
                minWidth: '50%',
                margin: '0 auto',
                padding: 0,
                //paddingBottom: 10,
                //opacity: isOpen ? '1' : '0',
                //vh or vw
                maxHeight: isOpen ? 365 : 0,
                transition: isOpen ? 'all ease-out .35' : 'all ease-in .35s',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarColor: `rgb(134, 38, 51) rgb(35, 35, 35)`
                //visibility: isOpen ? 'visible' : 'hidden'
            }}>

                {/*<a href='https://www.google.com/' style={{ color: 'white' }}>Click this link</a>*/}
                <br/>
                {generateContent()}
                <p style={{
                    color: 'yellow',
                    textAlign: 'left',
                    paddingLeft: 15
                }}>
                    NOTE: This reflects the current status of the dryer and may not match values displayed elsewhere in M-C Trax (data on M-C Trax is updated from the dryer every 60 seconds).
                </p>
            </div>
            <div style={{
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                backgroundColor: `rgb(35, 35, 35)`,
                borderColor: `rgb(35, 35, 35)`,
                minWidth: '50%',
                maxWidth: '50%',
                margin: '0 auto'
            }}>
                <br></br>
            </div>
        </div>
    )
}
export default Remote