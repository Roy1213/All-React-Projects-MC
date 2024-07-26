const OpenContent = () => {
    const click = () => {
        console.log('You clicked it')
    }
    return (
        <div style={{
            color: 'white',
            backgroundColor: `rgb(35, 35, 35)`,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            maxWidth: '50%',
            minWidth: 250,
            margin: '0 auto',
            paddingBottom: 10
        }}>
            <a href="https://www.google.com/" style={{color: 'white'}}>Click this link</a>
            
            
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                padding: 10,
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <p style={{
                        padding: 5
                    }}>Dryer State:</p>
                    <p style={{
                        padding: 5,
                        color: 'lime'
                    }}>Running</p>
                </div>

                <button onClick={click} style={{
                    backgroundColor: 'blue',
                    borderWidth: 1,
                    color: 'white'
                }}>Change...</button>
            </div>



            <p>Howdy!</p>
            <p>Howdy!</p>
            <p>Howdy!</p>
            <p>Howdy!</p>
            <p>Howdy!</p>
        </div> 
    )
}
export default OpenContent