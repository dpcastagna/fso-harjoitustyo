import '../App.css'
import { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { createFilter, createFiltered } from '../reducers/filterReducer'
import { getAll } from '../services/userService'

const Filter = (props) => {
  // const [users, setUsers] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const filteredUsers = useSelector(state => {
    console.log(state)
    if (employeeList !== state.filteredUsers.filteredUsers) {
    setEmployeeList(state.filteredUsers.filteredUsers)
    }
    return state.filteredUsers.filteredUsers
  })

  useEffect(() => {
    // setUsers(getAll())
    props.createFiltered(props.users)
    // setEmployeeList(props.users.filter(user => user.companyId === 1 && user.role === 'employee'))
  }, [props, props.users])
  
  // console.log(props, filteredUsers)
  const handleChange = (event) => {
    event.preventDefault()
    
    const input = event.target.value
    //console.log(input)
    props.createFilter(input)
    props.createFiltered(props.users)
  }
  const style = {
    marginBottom: 10
  }
  console.log(employeeList, filteredUsers)
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      <div id='palikka'>
        {/* <div style={{ paddingBottom: 3, borderBottom: 'solid', borderBottomWidth: 3 }}>Employee shifts <br /></div> */}
        <div id='vaaka' >
          { 
            !employeeList
            ? <>Loading...</>
            : employeeList.filter(user => user.companyId === 1 && user.role === 'employee').map(user => {
                const employeeShifts = props.shifts.filter(shift => shift.employeeId === user.userId)
                // console.log(employeeShifts)
                return (
                  <div key={user.userId}>
                    {user.name} { user.working ? <div id='working'>Working</div> : <div id='notWorking'>Not working</div> }<br />
                    {
                      employeeShifts.length > 0
                      ? employeeShifts.map(shift => <div key={shift.shiftId }>{shift.start}-{shift.end} {shift.date} <br /></div>)
                      : <>No shifts</>
                    }
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

const mapDispatchToProps = {
  createFilter,
  createFiltered,
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter