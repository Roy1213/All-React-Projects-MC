import './App.css';
import Content from './Content'
import Footer from './Footer'
import Remote from './Remote';

function App() {
  const generateEmptySpace = (num) => {
    const rows = []
    for (let i = 0; i < num; i++) {
      rows.push(<br key={i} />)
    }
    return <div>{rows}</div>
  }
  return (
    <div className="App" style={{
      backgroundColor: `rgb(0, 0, 0)`,
      minHeight: '100vh',
      //display: 'flex',
     //alignItems: 'center',
      //justifyContent: 'center'
      // alignItems: 'center',
      // height: '100%'
    }}>
      {/*<Content></Content>*/}
      {/* can also use self-closing tags */}
      {/* <Footer /> */}

      {generateEmptySpace(5)}
      <Remote/>



    </div>
  );
}

export default App;