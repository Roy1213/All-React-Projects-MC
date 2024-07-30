import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './Scrollbar.css';
import { colors } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Remote = () => {
    const [isOpen, setOpen] = useState(false)
    const [open, setModalIsOpen] = useState(false)
    const [open2, setDropdownIsOpen] = useState(false)
    const [modalType, setModalType] = useState(false)
    const [currentText, setCurrentText] = useState("")
    const [currentValueText, setCurrentValueText] = useState("")
    const [newText, setNewText] = useState("");
    const [rangeText, setRangeText] = useState("");

    const style = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: `rgb(35, 35, 35)`,
        color: 'white',
        //border: '2px solid white',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        borderRadius: '10px'
    };

    const handleClick = () => {
        console.log('Clicked')
        setOpen(!isOpen)
    }
    const handleOpen = (i) => {
        setModalType(textBoxOrMenu[i])
        setCurrentText("Current " + text1[i])
        setCurrentValueText(text2[i])
        setNewText("New " + text1[i])
        setModalIsOpen(true)
    }
    const handleClose = () => {
        setModalIsOpen(false)
    }

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
    const textBoxOrMenu = [
        false,
        false,
        true,
        true,
        true,
        true,
        true
    ]
    const range = [
        [],
        [],
        [0, 100],
        [0, 220],
        [0, 100],
        [0, 220],
        [0, 220]

    ]
    const rangeUnit = [
        "",
        "",
        "%",
        "F",
        "%",
        "F",
        "F"
    ]

    const generateContent = () => {
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

                    <Button onClick={() => handleOpen(i)} style={{
                        backgroundColor: `rgb(134, 38, 51)`,
                        borderWidth: 1,
                        color: 'white',
                        maxHeight: 40,
                        borderRadius: 10
                    }}>Change...</Button>
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
                minWidth: 350,
                maxWidth: 350,
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
                maxWidth: 350,
                minWidth: 350,
                margin: '0 auto',
                padding: 0,
                //paddingBottom: 10,
                //opacity: isOpen ? '1' : '0',
                //vh or vw
                maxHeight: isOpen ? 360 : 0,
                transition: isOpen ? 'all ease-out .35' : 'all ease-in .35s',
                overflowY: 'auto',
                overflowX: 'hidden',

                //scrollbarColor: `rgb(134, 38, 51) rgb(35, 35, 35)`

                //visibility: isOpen ? 'visible' : 'hidden'
            }}>

                {/*<a href='https://www.google.com/' style={{ color: 'white' }}>Click this link</a>*/}
                <br />
                {generateContent()}

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingRight: 10
                            }}>
                                <p>{currentText}</p>
                                <p>{currentValueText}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingRight: 10
                            }}>
                                <p>{newText}</p>
                                {modalType ?
                                    <p>hi</p> :
                                    <div>
                                        <BasicMenu/>
                                    </div>}
                            </div>
                        </Box>
                    </Fade>
                </Modal>


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
                minWidth: 350,
                maxWidth: 350,
                margin: '0 auto'
            }}>
                <br></br>
            </div>
        </div>
    )
}
export default Remote

function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const style = {
        color: 'white',
        backgroundColor: `rgb(134, 38, 51)`
    }
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          style={{
            
          }}
          className='menu'
        >
          <MenuItem onClick={handleClose} style={style}>Profile</MenuItem>
          <MenuItem onClick={handleClose} style={style}>My account</MenuItem>
          <MenuItem onClick={handleClose} style={style}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }