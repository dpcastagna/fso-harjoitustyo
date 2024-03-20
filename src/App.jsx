// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import companyList from './mock/companies'
// import userList from './mock/users'
// import shiftList from './mock/shifts'
// import TopBar from './components/TopBar'
// import AdminBox from './components/AdminBox'
// import UserBox from './components/UserBox'
// import BossBox from './components/BossBox'
// import DoorButtons from './components/DoorButtons'
// import AddShift from './components/AddShift'
// import AddUser from './components/AddUser'
// import RemoveUser from './components/RemoveUser'
// import AllShifts from './components/AllShifts'
// import Filter from './components/FilterUsers'
// import CheckInAndOut from './components/CheckInAndOut'

import { useState, useEffect } from 'react'
import './App.css'
import Notification from './components/Notification'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'
import RegisterCompany from './components/RegisterCompany'


const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  // const [companies, setCompanies] = useState([])
  // const [shifts, setShifts] = useState([])
  // const [userId, setUserId] = useState('')

  // useEffect(() => {
  //   setCompanies(companyList)
  //   setUsers(userList)
  //   setShifts(shiftList)
  // }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const setWorking = (id) => {
    const userToChange = users.find(user => user.id === id)
    setUsers(users.filter(user => user.id !== id).concat({ ...userToChange, working: !userToChange.working}))
    console.log(userToChange, users)
  }

  return (
    <>
      <Notification />
      {/* <TopBar user={user} /><br/> */}
      {/* <div> */}
        {/* { 
        //   users.map(user => {
        //     return user.role === 'admin'
        //           ? <button key={user.id} style={{margin:5}} onClick={(e) => {
        //                 e.preventDefault() 
        //                 setUser(user)
        //                 setUserId(user.id)
        //               }
        //               }>
        //                 Admin
        //             </button>
        //           : user.role === 'boss'
        //             ? <button key={user.id} style={{margin:5}} onClick={(e) => {
        //                   e.preventDefault() 
        //                   setUser(user)
        //                   setUserId(user.id)
        //                 }
        //                 }>
        //                   Boss
        //               </button>
        //             : user.role === 'employee'
        //               ? <button key={user.id} style={{margin:5}} onClick={(e) => {
        //                     e.preventDefault() 
        //                     setUser(user)
        //                     setUserId(user.id)
        //                   }
        //                   }>
        //                     {user.name}
        //                 </button>
        //               : <></>
        //   })
        // }
        // <button style={{margin:5}} onClick={(e) => {
        //     e.preventDefault()
        //     setUser(null)
        //   }
        //   }>
        //     Logout
        // </button>
        // <br/>
        // <TopBar user={user} /><br/>
        // <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
        //   { user === null
        //     ? <></>
        //     :
        //     user.role === 'admin'
        //     ? <AdminBox companies={companies} users={users} shifts={shifts} />
        //     : user.role === 'boss'
        //       ? <div style={{display: 'flex', flexDirection: 'column'}}>
        //           <div style={{display: 'flex', flexDirection: 'row'}}>
        //             <BossBox companies={companies} users={users} shifts={shifts} userId={userId} />
        //             <DoorButtons user={'boss'} />
        //             <AddShift shifts={shifts} setShifts={setShifts} users={users} />
        //             <AddUser users={users} setUsers={setUsers} />
        //             <RemoveUser users={users} setUsers={setUsers} />
        //           </div>
        //           <div>
        //             <AllShifts shifts={shifts} setShifts={setShifts} users={users} />
        //           </div>
        //           <div>
        //             <Filter users={users} shifts={shifts} />
        //           </div>
        //         </div>
        //       : user.role === 'employee'
        //         ? <>
        //             <UserBox shifts={shifts} userId={userId} /><br/><br/>
        //             <DoorButtons user={'employee'} />
        //             <CheckInAndOut userId={userId} users={users} setUsers={setUsers} setWorking={setWorking} />
        //           </>
        //         : <></>
        // } 
      //   </div>
      // </div>*/}
      { user !== null
        ? <LoggedIn user={user} setUser={setUser} />
        : <>
            <Login user={user} setUser={setUser} />
            <br/>
            or
            <br/>
            <br/>
            <RegisterCompany />
          </>
      }
    </>
  )
}

export default App
