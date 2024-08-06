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
// import { ViewColumn } from "@mui/icons-material";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

let types = [1, 2, 3, 4, 5]
let heights = [2, 3, 2, 4, 2]
let images = [part1, part2, part3, part4, part5]
let widths = ['50%', '50%', '50%', '100%', '100%']
let containerWidth = 250
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

  static setState() {
    super.setState()
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  static removeAtIndex(index, showcaseLayout) {
    types.splice(index, 1)
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

            <div style={{ display: 'grid'}}>
              <img src={images[types[i] - 1]} draggable={false} width={widths[types[i] - 1]} height={1.1 * 172 * heights[Math.abs(types[i]) - 1] / 2} alt="Part 1" style={{ gridRow: 1, gridColumn: 1}} />
              <div style={{ gridRow: 1, gridColumn: 1, display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={() => ShowcaseLayout.removeAtIndex(i, showcaseLayout)} style={{maxHeight: 20, maxWidth: 20}}>x</button>
                <button onClick={() => ShowcaseLayout.removeAtIndex(i, showcaseLayout)} style={{maxHeight: 20, maxWidth: 20}}>⇌</button>
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
      types.shift()
    } else if (height === -2) {
      types.pop()
    } else {
      types[types.length] = height
    }
    this.setState({
      layouts: { lg: generateLayout() }
    });
  }

  onDragStop = () => {
    console.log("howdy hello world")
    //this.setState({ isDragging: false, height: 10 });

  };

  dragging = () => {
    console.log("howdy world")
  }

  buttonStyle = {
    minWidth: containerWidth / 2,
    height: buttonArrayHeight / 3,
    backgroundColor: 'rgb(134, 38, 51)',
    border: '1px solid black',
    color: 'white',
    borderRadius: '5px'
  }

  render() {
    return (
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
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button onClick={() => this.onNewLayout(1)} style={this.buttonStyle}>+ H1</Button>
            <Button onClick={() => this.onNewLayout(2)} style={this.buttonStyle}>+ H2</Button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button onClick={() => this.onNewLayout(3)} style={this.buttonStyle}>+ H3</Button>
            <Button onClick={() => this.onNewLayout(4)} style={this.buttonStyle}>+ H4</Button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button onClick={() => this.onNewLayout(5)} style={this.buttonStyle}>+ H5</Button>
            <Button onClick={() => this.onNewLayout(-2)} style={this.buttonStyle}> </Button>
          </div>
        </div>


        {/* <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button> */}
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
  return _.map(_.range(0, types.length), function (item, i) {
    var y = heights[Math.abs(types[i]) - 1] * 2//Math.ceil(Math.random() * 4) + 1;
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
