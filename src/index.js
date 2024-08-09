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

import React from "react";
import ReactDOM from "react-dom";
import ShowcaseLayout from "./ShowcaseLayout";
import './example-styles.css';
import Data from "./Data";

export const heights = [1, 2, 3, 4]

class ExampleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: [] };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    this.setState({ layout: layout });
    Data.globalLayout = layout
  }

  // stringifyLayout() {
  //   //return Data.generateContent()
  //   return this.state.layout.map(function(l) {
  //     //return Data.generateContent()
  //     return (
  //       <div className="layoutItem" key={l.i} style={{display: 'flex', justifyContent: 'center'}}>
  //         <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
  //       </div>
  //     );
  //   });
  // }

  render() {
    return (
      <div>
        <br/>
        <br/>
        {Data.updateArray()}
        <ShowcaseLayout onLayoutChange={this.onLayoutChange}/>
      </div>
    );
  }
}

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(ExampleLayout, gridProps), contentDiv);