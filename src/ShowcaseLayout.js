import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import './example-styles.css';
import './Scrollbar.css';
import Button from '@mui/material/Button';
import part1 from './images/part1.png'
import part2 from './images/part2.png'
import part3 from './images/part3.png'
import part4 from './images/part4.png'
import part5 from './images/part5.png'
import Data from "./Data";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import FormControl from "@mui/material/FormControl";
import Remote from "./Remote";
import InputLabel from "@mui/material/InputLabel";
import { Height } from "@mui/icons-material";
// import { ViewColumn } from "@mui/icons-material";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

let heights = [4, 6, 4, 8, 4]
let heightMultiplier = 0.5
let images = [part1, part2, part3, part4, part5]
let widths = ['50%', '50%', '50%', '100%', '100%']
let containerWidth = 200
let containerHeight = 850
let buttonArrayHeight = 75
var showcaseLayout = null

export default class ShowcaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: props.initialLayout }
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
  }

  buttonStyle = {
    minWidth: containerWidth / 5,
    height: buttonArrayHeight / 3,
    backgroundColor: 'rgb(134, 38, 51)',
    border: '1px solid black',
    color: 'white',
    borderRadius: '5px'
  }

  static buttonStyle2 = {
    maxHeight: 15,
    width: 15,
    backgroundColor: 'rgb(134, 38, 51)',
    border: '1px solid rgb(134, 38, 51)',
    color: 'white',
    borderRadius: '3px',
    fontSize: '10px'
  }

  formatPrice = () => {
    let USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    return USDollar.format(Data.totalPrice).toString()
  }

  generateContent = () => {
    let typesNum = [0, 0, 0, 0, 0]
    Data.totalPrice = 0
    for (let i = 0; i < Data.types.length; i++) {
      typesNum[Math.abs(Data.types[i]) - 1]++
      Data.totalPrice += Data.typePrices[Math.abs(Data.types[i]) - 1]
    }
    const rows = []
    for (let i = 0; i < 5; i++) {
      rows.push(
        <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10
        }}>
          <p>T{i + 1}: </p>  <p>{Data.typeNames[i]}</p> <p>{typesNum[i]}</p> <p><Button onClick={() => this.onNewLayout(i + 1)} style={this.buttonStyle}>+</Button></p><p><Button onClick={() => ShowcaseLayout.removeType(i + 1, this)} style={this.buttonStyle}>-</Button></p>
        </div>)
    }
    rows.push(
      <div key={6} style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20
      }}>
        <b>Total Price:</b> {this.formatPrice()}
      </div>)
    return <div>{rows}</div>
  }

  static setState() {
    super.setState()
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  static syncArrays() {
    for (let i = 0; i < Data.types.length; i++) {
      Data.types[i] = Data.typesUpdated[i]
    }
  }

  static removeAtIndex(index, showcaseLayout) {
    if (index != -1) {
      Data.types.splice(index, 1)
      showcaseLayout.setState({
        layouts: { lg: generateLayout() }
      });
    }
  }

  static removeType(type, showcaseLayout) {
    var index = Data.types.indexOf(-1 * type)
    if (index == -1) {
      index = Data.types.indexOf(type)
    }
    ShowcaseLayout.removeAtIndex(index, showcaseLayout)
  }

  static flipAtIndex(index, showcaseLayout) {
    Data.types[index] *= -1
    Data.updateArray()
    showcaseLayout.setState({
      layouts: { lg: generateLayout() }
    });
  }

  generateDOM(showcaseLayout) {
    return _.map(this.state.layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""} style={{ overflow: 'hidden' }}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (

            <div style={{ display: 'grid', transform: Data.types[i] > 0 ? '' : 'rotateY(180deg)' }}>
              <img src={images[Math.abs(Data.types[i]) - 1]} draggable={false} width={widths[Math.abs(Data.types[i]) - 1]} height={86 * heightMultiplier * heights[Math.abs(Data.types[i]) - 1] / 2} alt={"Part " + Data.types[i]} style={{ gridRow: 1, gridColumn: 1 }} />
              <div style={{ gridRow: 1, gridColumn: 1, display: 'flex', justifyContent: 'space-between', transform: Data.types[i] > 0 ? '' : 'rotateY(180deg)' }}>
                <button onClick={() => ShowcaseLayout.removeAtIndex(i, showcaseLayout)} style={ShowcaseLayout.buttonStyle2}>x</button>
                <button onClick={() => ShowcaseLayout.flipAtIndex(i, showcaseLayout)} style={ShowcaseLayout.buttonStyle2}>{Data.types[i] > 0 ? 'L' : 'R'}</button>
              </div>

            </div>


            // <span className="text">
            //   <img src={part1} width={100} height={100} alt="Part 1"/>
            //   {/* <button onClick={() => ShowcaseLayout.removeAtIndex(i, showcaseLayout)}>Remove</button> */}
            // </span>

          )}
        </div>
      );
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "vertical"
        ? null
        : "vertical";
    this.setState({ compactType });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
    showcaseLayout = this
    //Data.updateArray()
  }

  onNewLayout(type) {
    if (type === -1) {
      Data.types = []
    } else {
      Data.types[Data.types.length] = type
    }
    this.setState({
      layouts: { lg: generateLayout() }
    });
  }



  // onDragStop = () => {
  //   console.log("howdy hello world")
  //   //this.setState({ isDragging: false, height: 10 });

  // };

  dragging = () => {
    console.log("howdy world")
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center', /*overflow: 'hidden'*/ height: containerHeight
      }}>
        <div className="layoutJSON" style={{ overflowY: 'auto' }}>
          Type, Number, Quantity, Add, Remove

          {/* <p>{"Height: " + Data.height}</p> */}

          <div className="columns">{this.generateContent()}</div>
          <br />
          <br />
          {/* <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button onClick={() => this.onNewLayout(1)} style={this.buttonStyle}>Add Type 1</Button>
            <Button onClick={() => this.onNewLayout(2)} style={this.buttonStyle}>Add Type 2</Button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button onClick={() => this.onNewLayout(3)} style={this.buttonStyle}>Add Type 3</Button>
            <Button onClick={() => this.onNewLayout(4)} style={this.buttonStyle}>Add Type 4</Button>
          </div> */}

          <HeightInput/>
          <br/>
          <br/>
          <br/>

          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* <Button onClick={() => this.onNewLayout(5)} style={this.buttonStyle}>Add Type 5</Button> */}
            {/* <Remote/> */}
            <Button onClick={() => this.onNewLayout(-1)} style={this.buttonStyle}>Clear</Button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            {Data.generateWarnings()}
          </div>
        </div>
        <div style={{ width: containerWidth, maxHeight: containerHeight }}>
          {/* <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div> */}

          <div style={{ borderTopRightRadius: '10px' }}>
            <div style={{ maxHeight: containerHeight, overflowX: 'hidden', overflowY: 'auto' }}>
              <ResponsiveReactGridLayout
                {...this.props}
                layouts={this.state.layouts}
                onBreakpointChange={this.onBreakpointChange}
                onLayoutChange={this.onLayoutChange}
                //onDrag={this.dragging}
                onDragStop={this.onDragStop}
                // WidthProvider option
                measureBeforeMount={false}
                // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                // and set `measureBeforeMount={true}`.
                useCSSTransforms={this.state.mounted}
                compactType={this.state.compactType}
                preventCollision={!this.state.compactType}
                style={{ minHeight: containerHeight, width: Data.types.length !== 0 ? containerWidth : 15 }}
              // style={{width: containerWidth / 2}}
              >
                {this.generateDOM(this)}
              </ResponsiveReactGridLayout>
            </div>

          </div>


        </div>


        {/* <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button> */}

      </div>
    );
  }
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 36,
  onLayoutChange: function () { },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: generateLayout()
};

function HeightInput() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  }

  const buttonStyle3 = {
    minWidth: containerWidth / 5,
    minHeight: '100%',
    backgroundColor: 'rgb(134, 38, 51)',
    border: '1px solid black',
    color: 'white',
    borderRadius: '5px'
  };

  const [val, setVal] = useState('')
  const handleChange = (event) => {
      var value = event.target.value
      var periodsFound = 0;
      let periodsAllowed = 0;
      let min = 0;
      let max = 1000

      for (let i = 0; i < value.length; i++) {
          if (value.substring(i, i + 1) === ".") {
              periodsFound++
          }
          if (periodsFound > periodsAllowed || "0123456789.".indexOf(value.substring(i, i + 1)) === -1) {
              value = value.substring(0, i) + value.substring(i + 1)
              periodsFound--
              i--
          }
          if (periodsFound === 1 && value.substring(i, i + 1) !== ".") {
              value = value.substring(0, i + 1)
          }
      }
      if (parseFloat(value) > max) {
          value = max
      } else if (parseFloat(value) < min) {
          value = min
      }
      setVal(value)
  };

  const pushFormData = () => {
    Data.height = Math.ceil(val / 5.0) * 5
    Data.createBuild()
    showcaseLayout.setState({
      layouts: { lg: generateLayout() }
    });
    generateLayout()
    
  }

  return (
      <Box sx={{ display: 'flex'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '100%'}}> 
              <FormControl sx={{ width: '20ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>Height Input</InputLabel>
                  <OutlinedInput
                      value={val}
                      autoComplete='off'
                      autoCapitalize='off'
                      label='Height Input'
                      sx={{
                          //height: '50px',
                          color: 'white',
                          //minWidth: 300,
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
                      }}>ft</p></InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                          'aria-label': 'weight',
                      }}
                  />
                  {/* <FormHelperText id="outlined-weight-helper-text" style={{
                      color: 'white', minWidth: '150px'
                  }}>{""}</FormHelperText> */}
              </FormControl>
              <Button onClick={() => pushFormData()} style={buttonStyle3}>Enter</Button>
          </div>
      </Box>
  );
}

function generateLayout() {
  Data.calculateHeight()
  return _.map(_.range(0, Data.types.length + Data.height / Data.typeHeights[3]), function (item, i) {
      if (i < Data.types.length) {
        var y = heights[Math.abs(Data.types[i]) - 1] * heightMultiplier//Math.ceil(Math.random() * 4) + 1;
        return {
          x: 0,
          y: i,
          w: 1,
          h: y,
          i: i.toString(),
          static: false,
        }
      } else {
        var y = heights[3] * heightMultiplier//Math.ceil(Math.random() * 4) + 1;
        return {
          x: 1,
          y: 0,
          w: 1,
          h: y,
          i: i.toString(),
          static: true,
        };
      }
      
  });
}
