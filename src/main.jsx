import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App.jsx'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
// import './index.css'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    filteredUsers: filterReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
