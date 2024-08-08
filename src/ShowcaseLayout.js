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
// import { ViewColumn } from "@mui/icons-material";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

let heights = [2, 3, 2, 4, 2] * 1
let heightMultiplier = 1
let images = [part1, part2, part3, part4, part5]
let widths = ['50%', '50%', '50%', '100%', '100%']
let containerWidth = 100
let containerHeight = 700
let buttonArrayHeight = 75

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
    minWidth: containerWidth / 2,
    height: buttonArrayHeight / 3,
    backgroundColor: 'rgb(134, 38, 51)',
    border: '1px solid black',
    color: 'white',
    borderRadius: '5px'
  }

  static buttonStyle2 = {
    maxHeight: 20,
    width: 20,
    backgroundColor: 'rgb(134, 38, 51)',
    border: '1px solid rgb(134, 38, 51)',
    color: 'white',
    borderRadius: '5px'
  }


  static setState() {
    super.setState()
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  static removeAtIndex(index, showcaseLayout) {
    Data.types.splice(index, 1)
    generateLayout()
    showcaseLayout.setState({
      layouts: { lg: generateLayout() }
    });
  }

  static flipAtIndex(index, showcaseLayout) {
    Data.types[index] *= -1
    generateLayout()
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
              <img src={images[Math.abs(Data.types[i]) - 1]} draggable={false} width={widths[Math.abs(Data.types[i]) - 1]} height={1.1 * 172 * heights[Math.abs(Data.types[i]) - 1] / 2} alt={"Part " + Data.types[i]} style={{ gridRow: 1, gridColumn: 1 }} />
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
  }

  onNewLayout(height) {
    if (height === -1) {
      Data.types = []
    } else {
      Data.types[Data.types.length] = height
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
      <div style={{display: 'flex',
        justifyContent: 'center', /*overflow: 'hidden'*/ maxHeight: 700, }}>
        <div className="layoutJSON" style={{overflowY: 'auto'}}>
          Displayed as Type, Number, Quantity
          
          <div className="columns">{Data.generateContent()}</div>
          <br/>
          <br/>
          <div style={{
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
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button onClick={() => this.onNewLayout(5)} style={this.buttonStyle}>Add Type 5</Button>
            <Button onClick={() => this.onNewLayout(-1)} style={this.buttonStyle}>Clear All</Button>
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

        <div style={{ borderTopRightRadius: '10px', height: buttonArrayHeight }}>
          <div style={{ maxHeight: containerHeight - buttonArrayHeight, overflowX: 'hidden', overflowY: 'auto' }}>
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

function generateLayout() {
  return _.map(_.range(0, Data.types.length), function (item, i) {
    var y = heights[Math.abs(Data.types[i]) - 1] * heightMultiplier//Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5)) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: false
    };
  });
}
