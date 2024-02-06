

const UserBox = (props) => {

  return(
    <>
      Next shifts:<br/>
      {
        props.shifts.map((shift) => {
          return <div key={shift.shiftId}>{shift.start}-{shift.end} {shift.date}<br/></div> 
        })
      }
    </>
  )
}

export default UserBox