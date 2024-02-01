import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <> Makke
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
        <div style={{margin:5}} >
          Viikon vuorot:<br/>
          Ma: 8-16<br/>
          Ti: 8-16<br/>
          Ke: 8-16<br/>
          To: 8-16<br/>
          Pe: 8-16<br/>
          La: Vapaa<br/>
          Su: Vapaa<br/>
        </div>
        <div style={{margin:5}} >
          Ensi viikon vuorot:<br/>
          Ma: 8-16<br/>
          Ti: 8-16<br/>
          Ke: 8-16<br/>
          To: 8-16<br/>
          Pe: 8-16<br/>
          La: Vapaa<br/>
          Su: Vapaa<br/>
        </div>
        <div>
          <div className="card">
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            console.log('Pääovi avattu', Date())
          }
          }>
            Pääovi
          </button> <br/>
          </div>
          <div className="card">
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            console.log('Varasto avattu', Date())
          }
          }>
            Varasto
          </button> <br/>
          </div>
          <div className="card">
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            console.log('Takaovi avattu', Date())
          }
          }>
            Takaovi
          </button> <br/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
