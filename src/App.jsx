import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import companyList from './mock/companies'
import userList from './mock/users'
import shiftList from './mock/shifts'
import TopBar from './components/TopBar'
import AdminBox from './components/AdminBox'
import UserBox from './components/UserBox'
import BossBox from './components/BossBox'
import DoorButtons from './components/DoorButtons'
import AddShift from './components/AddShift'
import AddUser from './components/AddUser'
import RemoveUser from './components/RemoveUser'

// console.log('companies', companyList, 'users', userList, 'shifts', shiftList)

function App() {
  const [companies, setCompanies] = useState([])
  const [users, setUsers] = useState([])
  const [shifts, setShifts] = useState([])
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    setCompanies(companyList)
    setUsers(userList)
    setShifts(shiftList)
  }, [])
  // console.log(companies, users, shifts, user)

  return (
    <> 
      <div>
        {
          users.map(user => {
            return user.role === 'admin'
                  ? <button key={user.userId} style={{margin:5}} onClick={(e) => {
                        e.preventDefault() 
                        setUser('admin')
                        setUserId(user.userId)
                      }
                      }>
                        Admin
                    </button>
                  : user.role === 'boss'
                    ? <button key={user.userId} style={{margin:5}} onClick={(e) => {
                          e.preventDefault() 
                          setUser('boss')
                          setUserId(user.userId)
                        }
                        }>
                          Boss
                      </button>
                    : user.role === 'employee'
                      ? <button key={user.userId} style={{margin:5}} onClick={(e) => {
                            e.preventDefault() 
                            setUser('employee')
                            setUserId(user.userId)
                          }
                          }>
                            {user.name}
                        </button>
                      : <></>
          })
        }
        <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            setUser('')
          }
          }>
            Logout
        </button>
        <br/>
        <TopBar user={user} /><br/><br/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
          {
            user === 'admin'
            ? <AdminBox companies={companies} users={users} shifts={shifts} />
            : user === 'boss'
              ? <div style={{display: 'flex', flexDirection: 'column'}}>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <BossBox companies={companies} users={users} shifts={shifts} userId={userId} />
                    <DoorButtons user={'boss'} />
                    <AddShift shifts={shifts} setShifts={setShifts} users={users} />
                    <AddUser users={users} setUsers={setUsers} />
                    <RemoveUser users={users} setUsers={setUsers} />
                  </div>
                  <div>
                    Move shifts
                  </div>
                </div>
              : user === 'employee'
                ? <>
                    <UserBox shifts={shifts} userId={userId} /><br/><br/>
                    <DoorButtons user={'employee'} />
                  </>
                : <></>
          }
        </div>
      </div>
    </>
  )
}

export default App
