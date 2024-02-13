import '../App.css'

const DoorButtons = (props) => {

  return(
    <>
      <div id='palikka'>
        {
          props.user === 'boss'
          ? <div className="card">
              <button style={{margin:5}} onClick={(e) => {
                e.preventDefault() 
                console.log('CEO office opened', Date())
              }
              }>
                CEO office
              </button> <br/>
            </div>
          : <></>
        }
        <div className="card">
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            console.log('Main door opened', Date())
          }
          }>
            Main door
          </button> <br/>
        </div>
        <div className="card">
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            console.log('Storage room opened', Date())
          }
          }>
            Storage room
          </button> <br/>
        </div>
        <div className="card">
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            console.log('Back door opened', Date())
          }
          }>
            Back door
          </button> <br/>
        </div>
      </div>
    </>
  )
}

export default DoorButtons