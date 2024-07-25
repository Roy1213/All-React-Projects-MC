import './App.css';
import Content from './Content'
import Footer from './Footer'

function App() {

  return (
    <div className="App">
      <Content></Content>
      {/* can also use self-closing tags */}
      <Footer />
    </div>
  );
}

export default App;
