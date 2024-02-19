//import { useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filteredUsers',
  initialState: {
    filter: '',
    filteredUsers: []
  },
  reducers: {
    createFilter(state, action) {
      const name = action.payload
      console.log(name)
      state.filter = name.toLowerCase()
    },
    createFiltered(state, action) {
      const content = action.payload
      console.log(content, action)
      //console.log(content)
      state.filteredUsers = content.filter(user => user.name
        .toLowerCase()
        .includes(state.filter)
        )
        // .sort((a, b) => {
        //   return a.votes > b.votes ? -1 : 1
        // })
    }
  },
})

export const { createFilter, createFiltered } = filterSlice.actions
export default filterSlice.reducer