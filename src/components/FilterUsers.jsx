import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { createFilter, createFiltered } from '../reducers/filterReducer'
import { getAll } from '../services/userService'

const Filter = (props) => {
  // const [users, setUsers] = useState([])
  const filteredUsers = useSelector(state => {
    console.log(state)
    state.filteredUsers.filteredUsers
  })

  useEffect(() => {
    // setUsers(getAll())
    props.createFiltered(props.users)
  }, [props, props.users])
  
  console.log(props, filteredUsers)
  const handleChange = (event) => {
    event.preventDefault()
    // input-kentän arvo muuttujassa event.target.value
    const input = event.target.value
    //console.log(input)
    props.createFilter(input)
    props.createFiltered(props.users)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
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