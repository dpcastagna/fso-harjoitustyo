import { useEffect, useState } from "react"
import '../App.css'

const UserBox = (props) => {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    setShifts(props.shifts.filter(shift => {
      // console.log(shift)
      return(
        shift.employeeId === props.userId)
      }
    )
    )
  }, [props])
  
  return(
    <div id='palikka'>
      <div /* style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} */ >
        Next shifts:<br/>
        {
          shifts.map((shift) => {
            return <div key={shift.shiftId}>{shift.start}-{shift.end} {shift.date}<br/></div> 
          })
        }
      </div>
    </div>
  )
}

export default UserBox