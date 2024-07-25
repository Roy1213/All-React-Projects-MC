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
    return (
        <main>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Header>  </Header>


                <p>
                    Hello {handleNameChange()}
                </p>
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