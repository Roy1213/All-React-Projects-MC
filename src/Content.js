import logo from './logo.svg';
import Header from './Header'

const Content = () => {
    const name = "Roy"
    const handleNameChange = () => {
        const names = ['Dave', "Kevin", 'Bob']
        //single or double quotes work here
        const int = Math.floor(Math.random() * 3)
        //int is a variable, not a primitive type!
        return names[int]
    }
    const handleClick = () => {
        console.log('You clicked it')
    }
    const handleClick2 = (name) => {
        console.log(`${name} was clicked const + anonymous functino`)
        //tilde operator, not apostrophy!
    }
    function handleClick3(name) {
        console.log(`${name} was clicked predefined function`)
    }
    const handleClick4 = (e) => {
        console.log(e)
        console.log(e.target) //returns element itself instead of entire event log
        console.log(e.target.innerText) //retrieves further nested data
    }
    return (
        <main>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Header>  </Header>
                <p onDoubleClick={handleClick}>
                    Hello {handleNameChange()} {/* only loads function once, not reactive */}
                </p>
                <button onClick={handleClick}>You clicked it</button>
                <button onClick={() => handleClick2("Howdy")}>Clicked 1</button>
                <button onClick={handleClick3("How are you?")}>Clicked 2 (not working)</button>
                <button onClick={(e) => handleClick4(e)}>Event click</button>
                <p>
                    Hello {name}!
                </p>
                <p>
                    Edit <code>src/App.js</code> and save to see changes.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <p>Roy</p>
                <p>{"Roy String"}</p>
                <p>{[1, 2, 3, 4]}</p>
                <p>[1, 2, 3, 4]</p>
                {/* shift + alt + a to comment all of this out <p>{[1, 2, 3, 4]}</p> */}
                {/*Data in react is always rendered as text*/}

            </header>
        </main>
    )
}
export default Content