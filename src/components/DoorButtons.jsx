

const DoorButtons = (props) => {

  return(
    <>
      <div>
        {
          props.user === 'boss'
          ? <div className="card">
              <button style={{margin:5}} onClick={(e) => {
                e.preventDefault() 
                console.log('Tj-toimisto avattu', Date())
              }
              }>
                Tj-toimisto
              </button> <br/>
            </div>
          : <></>
        }
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
    </>
  )
}

export default DoorButtons