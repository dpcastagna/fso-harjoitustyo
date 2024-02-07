

const UserBox = (props) => {

  return(
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
        Next shifts:<br/>
        {
          props.shifts.map((shift) => {
            return <div key={shift.shiftId}>{shift.start}-{shift.end} {shift.date}<br/></div> 
          })
        }
      </div>
    </>
  )
}

export default UserBox