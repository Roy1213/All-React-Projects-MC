// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();












import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import FormControl from "@mui/material/FormControl";
import './Scrollbar.css';
import MenuItem from '@mui/material/MenuItem';
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

var rangeArrayVar = []
var unitTextVar = ""
var allowedPeriodsVar = 0

const Remote = () => {
    const [isOpen, setOpen] = useState(false)
    const [open, setModalIsOpen] = useState(false)
    const [modalType, setModalType] = useState(false)
    const [currentText, setCurrentText] = useState("")
    const [currentValueText, setCurrentValueText] = useState("")
    const [newText, setNewText] = useState("");
    const [rangeArray, setRangeArray] = useState([]);
    const [unitText, setUnitText] = useState([])

    const popupStyle = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: `rgb(35, 35, 35)`,
        color: 'white',
        boxShadow: 24,
        pt: 2,
        px: 2,
        pb: 2,
        borderRadius: '10px'
    };

    const handleSave = () => {
        //TODO: Make popup settings save
    }

    const handleClick = () => {
        console.log('Clicked')
        setOpen(!isOpen)
    }
    const handleOpen = (i) => {
        setModalType(modalBooleans[i])
        setCurrentText("Current " + texts1[i])
        setCurrentValueText(texts2[i])
        setNewText("New " + texts1[i])
        setRangeArray(ranges[i])
        setUnitText(units[i])
        setModalIsOpen(true)
        rangeArrayVar = ranges[i]
        unitTextVar = units[i]
        allowedPeriodsVar = allowedPeriods[i]
    }
    const handleClose = () => {
        setModalIsOpen(false)
    }

    const texts1 = [
        "Dryer State:",
        "Disch Mode:",
        "Disch Speed SP:",
        "Mid-Grain SP:",
        "Disch Moist SP:",
        "Top Plenum(sp):",
        "Bot Plenum(sp):"
    ]
    const texts2 = [
        "Running",
        "Manual",
        "10 %",
        "120 F",
        "15.0 %",
        "180 F",
        "180 F"
    ]
    const modalBooleans = [
        false,
        false,
        true,
        true,
        true,
        true,
        true
    ]
    const ranges = [
        ["Running", "Off"],
        ["Manual", "Automatic"],
        [0, 100],
        [0, 220],
        [0, 100],
        [0, 220],
        [0, 220]

    ]
    const units = [
        "",
        "",
        "%",
        "F",
        "%",
        "F",
        "F"
    ]
    const allowedPeriods = [
        0,
        0,
        0,
        0,
        1,
        0,
        0
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
                        }}>{texts1[i]}</p>
                        <p style={{
                            paddingLeft: 5,
                            fontWeight: '1000',
                        }}>{texts2[i]}</p>
                    </div>

                    <Button onClick={() => handleOpen(i)} style={{
                        backgroundColor: `rgb(134, 38, 51)`,
                        borderWidth: 1,
                        color: 'white',
                        maxHeight: 40,
                        borderRadius: 10
                    }}>Change</Button>
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
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <h1 style={{
                        color: 'rgb(134, 38, 51)', '-webkit-text-stroke-width': '1px',
                        '-webkit-text-stroke-color': 'white'
                    }}>Remote Control</h1>
                </div>
            </button>
            <div style={{
                color: 'white',
                backgroundColor: `rgb(35, 35, 35)`,
                maxWidth: 350,
                minWidth: 350,
                margin: '0 auto',
                padding: 0,
                maxHeight: 360,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
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
                    <Fade in={open} style={{ outline: 'none' }}>
                        <Box sx={popupStyle}>
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
                                    <TempOrPercentInput /> :
                                    <StyledSelect />}
                            </div>
                            <br />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>

                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                                <PasswordField />
                                <div></div>
                                <Button onClick={handleClose} style={{
                                    backgroundColor: `rgb(134, 38, 51)`,
                                    borderWidth: 1,
                                    color: 'white',
                                    minHeight: 40,
                                    minWidth: 80,
                                    borderRadius: 10
                                }}>Cancel</Button>
                                <Button onClick={handleSave} style={{
                                    backgroundColor: `rgb(134, 38, 51)`,
                                    borderWidth: 1,
                                    color: 'white',
                                    minHeight: 40,
                                    minWidth: 80,
                                    borderRadius: 10
                                }}>Save</Button>
                            </div>
                        </Box>
                    </Fade>
                </Modal>


                <p style={{
                    background: 'linear-gradient(to right, rgb(255, 255, 255), rgb(134, 38, 51))',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
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
                <br />
            </div>
        </div>
    )
}
export default Remote

const color = 'rgb(134, 38, 51)'

function StyledSelect() {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>Selected State</InputLabel>
                <Select
                    sx={{
                        color: 'white',
                        minWidth: 155,
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '2px solid rgb(134, 38, 51)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: '3px solid rgb(134, 38, 51)'
                        },
                        '.MuiSvgIcon-root ': {
                            fill: "white !important",
                        },

                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                color: 'white',
                                backgroundColor: 'rgb(35, 35, 35)',
                                "& .MuiMenuItem-root.Mui-selected": {
                                    backgroundColor: "rgb(134, 38, 51)"
                                },
                                "& .MuiMenuItem-root:hover": {
                                    backgroundColor: "rgb(50, 50, 50)"
                                },
                                "& .MuiMenuItem-root.Mui-selected:hover": {
                                    backgroundColor: "rgb(149, 53, 66)"
                                }
                            }
                        }
                    }}
                    value={age}
                    label="Selected State"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>{rangeArrayVar[0]}</MenuItem>
                    <MenuItem value={1}>{rangeArrayVar[1]}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function PasswordField() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [val, setVal] = useState('')

    const handleChange = (event) => {
        setVal(event.target.value.replace(/\D/g, "").substring(0, 4))
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <FormControl sx={{ m: 0, width: '15ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>Security PIN</InputLabel>
                    <OutlinedInput
                        autoComplete='off'
                        autoCapitalize='off'
                        value={val}
                        sx={{
                            color: 'white',
                            minWidth: 155,
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '2px solid rgb(134, 38, 51)'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: '3px solid rgb(134, 38, 51)',
                            },
                            '.MuiSvgIcon-root ': {
                                fill: "white !important",
                            },
                        }}
                        onChange={handleChange}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Security PIN"
                    />
                </FormControl>
            </div>
        </Box>
    );
}

function TempOrPercentInput() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const [val, setVal] = useState('')
    const handleChange = (event) => {
        var value = event.target.value
        var periodsFound = 0;
        for (let i = 0; i < value.length; i++) {
            if (value.substring(i, i + 1) === ".") {
                periodsFound++
            }
            if (periodsFound > allowedPeriodsVar || "0123456789.".indexOf(value.substring(i, i + 1)) === -1) {
                value = value.substring(0, i) + value.substring(i + 1)
                periodsFound--
                i--
            }
            if (periodsFound === 1 && value.substring(i, i + 1) !== ".") {
                value = value.substring(0, i + 1)
            }
        }
        if (parseFloat(value) > rangeArrayVar[1]) {
            value = rangeArrayVar[1]
        } else if (parseFloat(value) < rangeArrayVar[0]) {
            value = rangeArrayVar[0]
        }
        setVal(value)
    };


    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <FormControl sx={{ width: '16ch' }} variant="outlined">
                    <OutlinedInput
                        value={val}
                        autoComplete='off'
                        autoCapitalize='off'
                        sx={{
                            color: 'white',
                            minWidth: 155,
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '2px solid rgb(134, 38, 51)'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: '3px solid rgb(134, 38, 51)'
                            },
                            '.MuiSvgIcon-root ': {
                                fill: "white !important",
                            },
                        }}
                        onChange={handleChange}
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="middle"><p style={{
                            color: 'white'
                        }}>{unitTextVar}</p></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text" style={{
                        color: 'white', minWidth: '150px'
                    }}>{(unitTextVar === '%' ? "Percentage" : "Temperature") + " (" + rangeArrayVar[0] + " - " + rangeArrayVar[1] + " " + unitTextVar + ")"}</FormHelperText>
                </FormControl>
            </div>
        </Box>
    );
}



































































































// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import './Scrollbar.css';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FormHelperText from '@mui/material/FormHelperText';
// //import InputAdornment from '@mui/material/InputAdornment';
// //import FormHelperText from '@mui/material/FormHelperText';
// //import FormControl from '@mui/material/FormControl';

// import { useDispatch, useSelector } from 'react-redux';
// //import { registerPin } from 'react-redux'
// //import Button from '@mui/material/Button';
// //import Menu, { MenuProps } from '@mui/material/Menu';
// //import MenuItem from '@mui/material/MenuItem';
// // import EditIcon from '@mui/icons-material/Edit';
// // import Divider from '@mui/material/Divider';
// // import ArchiveIcon from '@mui/icons-material/Archive';
// // import FileCopyIcon from '@mui/icons-material/FileCopy';
// // import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// var rangeArrayVar = []
// var unitTextVar = ""
// var allowedPeriodsVar = 0

// const Remote = () => {
//     const [isOpen, setOpen] = useState(false)
//     const [open, setModalIsOpen] = useState(false)
//     const [open2, setDropdownIsOpen] = useState(false)
//     const [modalType, setModalType] = useState(false)
//     const [currentText, setCurrentText] = useState("")
//     const [currentValueText, setCurrentValueText] = useState("")
//     const [newText, setNewText] = useState("");
//     const [rangeArray, setRangeArray] = useState([]);
//     const [unitText, setUnitText] = useState([])

//     const popupStyle = {
//         position: 'absolute',
//         top: '60%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 350,
//         bgcolor: `rgb(35, 35, 35)`,
//         color: 'white',
//         //border: '2px solid white',
//         boxShadow: 24,
//         pt: 2,
//         px: 2,
//         pb: 2,
//         borderRadius: '10px'
//     };

//     const handleSave = () => {
//         //TODO: Make popup settings save
//     }

//     const handleClick = () => {
//         console.log('Clicked')
//         setOpen(!isOpen)
//     }
//     const handleOpen = (i) => {
//         setModalType(modalBooleans[i])
//         setCurrentText("Current " + texts1[i])
//         setCurrentValueText(texts2[i])
//         setNewText("New " + texts1[i])
//         setRangeArray(ranges[i])
//         setUnitText(units[i])
//         setModalIsOpen(true)
//         rangeArrayVar = ranges[i]
//         unitTextVar = units[i]
//         allowedPeriodsVar = allowedPeriods[i]
//     }
//     const handleClose = () => {
//         setModalIsOpen(false)
//     }

//     const texts1 = [
//         "Dryer State:",
//         "Disch Mode:",
//         "Disch Speed SP:",
//         "Mid-Grain SP:",
//         "Disch Moist SP:",
//         "Top Plenum(sp):",
//         "Bot Plenum(sp):"
//     ]
//     const texts2 = [
//         "Running",
//         "Manual",
//         "10 %",
//         "120 F",
//         "15.0 %",
//         "180 F",
//         "180 F"
//     ]
//     const modalBooleans = [
//         false,
//         false,
//         true,
//         true,
//         true,
//         true,
//         true
//     ]
//     const ranges = [
//         ["Running", "Off"],
//         ["Manual", "Automatic"],
//         [0, 100],
//         [0, 220],
//         [0, 100],
//         [0, 220],
//         [0, 220]

//     ]
//     const units = [
//         "",
//         "",
//         "%",
//         "F",
//         "%",
//         "F",
//         "F"
//     ]
//     const allowedPeriods = [
//         0,
//         0,
//         0,
//         0,
//         1,
//         0, 
//         0
//     ]

//     const generateContent = () => {
//         const rows = []
//         for (let i = 0; i < 7; i++) {
//             rows.push(
//                 <div key={i} style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     paddingLeft: 10,
//                     paddingRight: 10
//                 }}>
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'center'
//                     }}>
//                         <p style={{
//                             paddingLeft: 5
//                         }}>{texts1[i]}</p>
//                         <p style={{
//                             paddingLeft: 5,
//                             //textShadow: 'rgb(134, 38, 51) 1.5px 1px 0px, rgb(0, 0, 0) 2px 1px 0px'
//                             fontWeight: '1000',
//                             //fontSize: '20px',
//                         }}>{texts2[i]}</p>
//                     </div>

//                     <Button onClick={() => handleOpen(i)} style={{
//                         backgroundColor: `rgb(134, 38, 51)`,
//                         borderWidth: 1,
//                         color: 'white',
//                         maxHeight: 40,
//                         borderRadius: 10
//                     }}>Change</Button>
//                 </div>)
//         }
//         return <div>{rows}</div>
//     }
//     return (
//         <div style={{
//             alignItems: 'center'
//         }}>
//             <button onClick={handleClick} style={{
//                 backgroundColor: `rgb(35, 35, 35)`,
//                 // borderBottom: '1px solid white',

//                 borderColor: `rgb(35, 35, 35)`,
//                 minWidth: 350,
//                 maxWidth: 350,
//                 overflowX: 'hidden',
//                 paddingLeft: 30,
//                 paddingRight: 30,
//                 maxHeight: 50,
//                 border: 0,
//                 overflow: 'hidden',
//                 ...(isOpen ? { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' } : { borderTopLeftRadius: '10px', borderTopRightRadius: '10px', })
//             }}>
//                 <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                 }}>
//                     <h1 style={{ color: 'rgb(134, 38, 51)', '-webkit-text-stroke-width': '1px',
//                             '-webkit-text-stroke-color': 'white'}}>Remote Control</h1>
//                     {/*<h1 style={{ color: `rgb(35, 35, 35)` }}>_</h1>*/}
//                     {isOpen ? <h1 style={{ color: 'white' }}>⊖</h1> : <h1 style={{ color: 'white'}}>⊕</h1>}
//                 </div>
//             </button>
//             <div style={{
//                 color: 'white',
//                 backgroundColor: `rgb(35, 35, 35)`,
//                 maxWidth: 350,
//                 minWidth: 350,
//                 margin: '0 auto',
//                 padding: 0,
//                 //paddingBottom: 10,
//                 //opacity: isOpen ? '1' : '0',
//                 //vh or vw
//                 maxHeight: isOpen ? 360 : 0,
//                 transition: isOpen ? 'all ease-out .35' : 'all ease-in .35s',
//                 overflowY: 'auto',
//                 overflowX: 'hidden',

//                 //scrollbarColor: `rgb(134, 38, 51) rgb(35, 35, 35)`

//                 //visibility: isOpen ? 'visible' : 'hidden'
//             }}>

//                 {/*<a href='https://www.google.com/' style={{ color: 'white' }}>Click this link</a>*/}
//                 <br />
//                 {generateContent()}

//                 <Modal
//                     aria-labelledby="transition-modal-title"
//                     aria-describedby="transition-modal-description"
//                     open={open}
//                     onClose={handleClose}
//                     closeAfterTransition
//                     slots={{ backdrop: Backdrop }}
//                     slotProps={{
//                         backdrop: {
//                             timeout: 500,
//                         },
//                     }}
//                 >
//                     <Fade in={open} style={{ outline: 'none' }}>
//                         <Box sx={popupStyle}>
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 paddingLeft: 10,
//                                 paddingRight: 10
//                             }}>
//                                 <p>{currentText}</p>
//                                 <p>{currentValueText}</p>
//                             </div>
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 paddingLeft: 10,
//                                 paddingRight: 10
//                             }}>
//                                 <p>{newText}</p>
//                                 {modalType ?
//                                     <TempOrPercentInput /> :
//                                     <StyledSelect />}
//                             </div>
//                             <br />
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-around'
//                             }}>

//                             </div>
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-around'
//                             }}>

//                                 {/* <div></div> */}
//                                 <PasswordField />
//                                 <div></div>
//                                 <Button onClick={handleClose} style={{
//                                     backgroundColor: `rgb(134, 38, 51)`,
//                                     borderWidth: 1,
//                                     color: 'white',
//                                     minHeight: 40,
//                                     minWidth: 80,
//                                     borderRadius: 10
//                                 }}>Cancel</Button>
//                                 <Button onClick={handleSave} style={{
//                                     backgroundColor: `rgb(134, 38, 51)`,
//                                     borderWidth: 1,
//                                     color: 'white',
//                                     //maxHeight: 40,
//                                     minHeight: 40,
//                                     minWidth: 80,
//                                     borderRadius: 10
//                                 }}>Save</Button>

//                             </div>
//                         </Box>
//                     </Fade>
//                 </Modal>


//                 <p style={{
//                     background: 'linear-gradient(to right, rgb(255, 255, 255), rgb(134, 38, 51))',
//                     '-webkit-background-clip': 'text',
// 	                '-webkit-text-fill-color': 'transparent',
//                     textAlign: 'left',
//                     paddingLeft: 15
//                 }}>
//                     NOTE: This reflects the current status of the dryer and may not match values displayed elsewhere in M-C Trax (data on M-C Trax is updated from the dryer every 60 seconds).
//                 </p>
//             </div>
//             <div style={{
//                 borderBottomLeftRadius: '10px',
//                 borderBottomRightRadius: '10px',
//                 backgroundColor: `rgb(35, 35, 35)`,
//                 borderColor: `rgb(35, 35, 35)`,
//                 minWidth: 350,
//                 maxWidth: 350,
//                 margin: '0 auto'
//             }}>
//                 <br />
//             </div>
//         </div>
//     )
// }
// export default Remote

// // const useStyles = makeStyles({

// // })

// const color = 'rgb(134, 38, 51)'

// function StyledSelect() {
//     const [age, setAge] = React.useState("");

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };

//     //const classes = useStyles()

//     return (
//         <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>Selected State</InputLabel>
//                 <Select
//                     sx={{
//                         color: 'white',
//                         minWidth: 155,
//                         '.MuiOutlinedInput-notchedOutline': {
//                             borderColor: 'white',
//                         },
//                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             border: '2px solid rgb(134, 38, 51)'
//                         },
//                         '&:hover .MuiOutlinedInput-notchedOutline': {
//                             border: '3px solid rgb(134, 38, 51)'
//                         },
//                         '.MuiSvgIcon-root ': {
//                             fill: "white !important",
//                         },

//                     }}
//                     MenuProps={{
//                         PaperProps: {
//                             sx: {
//                                 color: 'white',
//                                 backgroundColor: 'rgb(35, 35, 35)',
//                                 "& .MuiMenuItem-root.Mui-selected": {
//                                     backgroundColor: "rgb(134, 38, 51)"
//                                 },
//                                 "& .MuiMenuItem-root:hover": {
//                                     backgroundColor: "rgb(50, 50, 50)"
//                                 },
//                                 "& .MuiMenuItem-root.Mui-selected:hover": {
//                                     backgroundColor: "rgb(149, 53, 66)"
//                                 }
//                             }
//                         }
//                     }}
//                     value={age}
//                     label="Selected State"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value={0}>{rangeArrayVar[0]}</MenuItem>
//                     <MenuItem value={1}>{rangeArrayVar[1]}</MenuItem>
//                 </Select>
//             </FormControl>
//         </Box>
//     );
// }

// function PasswordField() {
//     const [showPassword, setShowPassword] = React.useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const [val, setVal] = useState('')

//     const handleChange = (event) => {
//         setVal(event.target.value.replace(/\D/g, "").substring(0, 4))
//     };

//     return (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//             <div>
//                 <FormControl sx={{ m: 0, width: '15ch' }} variant="outlined">
//                     <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>Security PIN</InputLabel>
//                     <OutlinedInput
//                     autoComplete='off'
//                     autoCapitalize='off'
//                         value={val}
//                         sx={{
//                             color: 'white',
//                             minWidth: 155,
//                             '.MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'white',
//                             },
//                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                 border: '2px solid rgb(134, 38, 51)'
//                             },
//                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 border: '3px solid rgb(134, 38, 51)',
//                             },
//                             '.MuiSvgIcon-root ': {
//                                 fill: "white !important",
//                             },
//                         }}
//                         onChange={handleChange}
//                         id="outlined-adornment-password"
//                         type={showPassword ? 'text' : 'password'}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                     edge="end"
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         }
//                         label="Security PIN"
//                     />
//                 </FormControl>
//             </div>
//         </Box>
//     );
// }

// function TempOrPercentInput() {
//     const [showPassword, setShowPassword] = React.useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const [val, setVal] = useState('')

//     const handleChange = (event) => {
//         //var value = event.target.value.replace(/\D/g, "")
//         var value = event.target.value
//         var periodsFound = 0;
//         for (let i = 0; i < value.length; i++) {
//             if (value.substring(i, i + 1) === ".") {
//                 periodsFound++
//             }
//             if (periodsFound > allowedPeriodsVar || "0123456789.".indexOf(value.substring(i, i + 1)) === -1) {
//                 value = value.substring(0, i) + value.substring(i + 1)
//                 periodsFound--
//                 i--
//             }
//             if (periodsFound === 1 && value.substring(i, i + 1) !== ".") {
//                 value = value.substring(0, i + 1)
//             }
//         }
//         if (parseFloat(value) > rangeArrayVar[1]) {
//             value = rangeArrayVar[1]
//         } else if (parseFloat(value) < rangeArrayVar[0]) {
//             value = rangeArrayVar[0]
//         }
//         setVal(value)
//     };


//     return (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//             <div>
//                 <FormControl sx={{width: '16ch' }} variant="outlined">
//                     <OutlinedInput
//                     value={val}
//                     autoComplete='off'
//                     autoCapitalize='off'
//                         sx={{
//                             color: 'white',
//                             minWidth: 155,
//                             '.MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'white',
//                             },
//                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                 border: '2px solid rgb(134, 38, 51)'
//                             },
//                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 border: '3px solid rgb(134, 38, 51)'
//                             },
//                             '.MuiSvgIcon-root ': {
//                                 fill: "white !important",
//                             },
//                         }}
//                         onChange={handleChange}
//                         id="outlined-adornment-weight"
//                         endAdornment={<InputAdornment position="middle"><p style={{color: 'white'
//                         }}>{unitTextVar}</p></InputAdornment>}
//                         aria-describedby="outlined-weight-helper-text"
//                         inputProps={{
//                             'aria-label': 'weight',
//                         }}
//                     />
//                     <FormHelperText id="outlined-weight-helper-text" style={{color: 'white', minWidth: '150px'
//                         }}>{(unitTextVar === '%' ? "Percentage" : "Temperature") + " (" + rangeArrayVar[0] + " - " + rangeArrayVar[1] + " " + unitTextVar + ")"}</FormHelperText>
//                 </FormControl>
//             </div>
//         </Box>
//     );
// }













// // const StyledMenu = styled((props) => (
// //     <Menu
// //         elevation={0}
// //         anchorOrigin={{
// //             vertical: 'bottom',
// //             horizontal: 'middle',
// //         }}
// //         transformOrigin={{
// //             vertical: 'bottom',
// //             horizontal: 'middle',
// //         }}
// //         {...props}
// //     />
// // ))(({ theme }) => ({
// //     '& .MuiPaper-root': {
// //         borderRadius: 6,
// //         marginTop: theme.spacing(1),
// //         minWidth: 180,
// //         backgroundColor: `rgb(35, 35, 35)`,
// //         color:
// //             theme.palette.mode === 'light' ? 'white' : 'white',
// //         boxShadow:
// //             'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
// //         '& .MuiMenu-list': {
// //             padding: '4px 0',
// //         },
// //         '& .MuiMenuItem-root': {
// //             '& .MuiSvgIcon-root': {
// //                 fontSize: 18,
// //                 backgroundColor: 'red',
// //                 color: theme.palette.text.secondary,
// //                 marginRight: theme.spacing(1.5),
// //             },
// //             '&:active': {
// //                 backgroundColor: `rgb(134, 38, 51)`
// //                 // backgroundColor: alpha(
// //                 //   theme.palette.primary.main,
// //                 //   theme.palette.action.selectedOpacity,
// //                 // ),
// //             },
// //         },
// //     },
// // }));

// // function CustomizedMenu() {
// //     const [anchorEl, setAnchorEl] = useState(null);
// //     const open = Boolean(anchorEl);
// //     const handleClick = (event) => {
// //         setAnchorEl(event.currentTarget);
// //     };
// //     const handleClose = () => {
// //         setAnchorEl(null);
// //     };

// //     return (
// //         <div>
// //             <Button
// //                 id="demo-customized-button"
// //                 aria-controls={open ? 'demo-customized-menu' : undefined}
// //                 aria-haspopup="true"
// //                 aria-expanded={open ? 'true' : undefined}
// //                 variant="contained"
// //                 disableElevation
// //                 onClick={handleClick}
// //             //endIcon={<KeyboardArrowDownIcon />}
// //             >
// //                 Options
// //             </Button>
// //             <StyledMenu
// //                 id="demo-customized-menu"
// //                 MenuListProps={{
// //                     'aria-labelledby': 'demo-customized-button',
// //                 }}
// //                 anchorEl={anchorEl}
// //                 open={open}
// //                 onClose={handleClose}
// //             >
// //                 <MenuItem onClick={handleClose}>
// //                     Edit
// //                 </MenuItem>

// //             </StyledMenu>
// //         </div>
// //     );
// // }