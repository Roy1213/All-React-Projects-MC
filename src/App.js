import './App.css';
import Content from './Content'
import Footer from './Footer'
import Remote from './Remote';

function App() {

  return (
    <div className="App" style={{
      //backgroundColor: `rgb(0, 0, 0)`,
      // alignItems: 'center',
      // height: '100%'
    }}>
      {/*<Content></Content>*/}
      {/* can also use self-closing tags */}
      {/* <Footer /> */}
      <Remote/>
    </div>
  );
}

export default App;
