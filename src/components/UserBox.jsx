import { useEffect, useState } from "react"
import '../App.css'

import TopMenu from "./TopMenu"
import Messages from "./Messages"

const UserBox = (props) => {
  const [shifts, setShifts] = useState([])
  const menuItems = ['Month', 'Messages']
  const [menuTab, setMenuTab] = useState(menuItems[0])

  // useEffect(() => {
  //   setShifts(props.shifts.filter(shift => {
  //     // console.log(shift)
  //     return(
  //       shift.employeeId === props.userId)
  //     }
  //   )
  //   )
  // }, [props])

  const changeMenuTab = (tabName) => {
    setMenuTab(tabName)
  }

  console.log(props)
  return(
    <div id='palikka'>
      <TopMenu items={menuItems} changeMenuTab={changeMenuTab} currentTab={menuTab} />
      <Messages user={props.user} employees={[]} />
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