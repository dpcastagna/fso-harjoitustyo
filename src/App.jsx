import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import companyList from './mock/companies'
import userList from './mock/users'
import shiftList from './mock/shifts'

console.log('companies', companyList, 'users', userList, 'shifts', shiftList)

function App() {
  const [companies, setCompanies] = useState([])
  const [users, setUsers] = useState([])
  const [shifts, setShifts] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    setCompanies(companyList)
    setUsers(userList)
    setShifts(shiftList)
  }, [])
  console.log(companies, users, shifts, user)

  return (
    <> 
    <div>
    <button style={{margin:5}} onClick={(e) => {
          e.preventDefault() 
          setUser('admin')
        }
        }>
          Admin
      </button>
      <button style={{margin:5}} onClick={(e) => {
          e.preventDefault() 
          setUser('boss')
        }
        }>
          Boss
      </button>
      <button style={{margin:5}} onClick={(e) => {
          e.preventDefault() 
          setUser('employee')
        }
        }>
          Employee
      </button> <br/>
      {
        user === 'admin'
        ? <>
            Admin <br/>
            Companies: {companies.length}<br/>
            Users: {users.length}<br/>
            Shifts: {shifts.length}
          </>
        : user === 'boss'
          ? <>
              Jepen korjaamo<br/>
              Employees: 3
            </>
          : user === 'employee'
            ? <>
                Next shifts:<br/>
                {
                  shifts.map((shift) => {
                    return <div key={shift.shiftId}>{shift.start}-{shift.end} {shift.date}<br/></div> 
                  })
                }
              </>
            : <>Choose a user!</>
      }
    </div>

    <br/><br/><br/><br/>
    Makke

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
