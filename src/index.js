import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Register from './pages/Register'
import Login from './pages/Login'
import store from './stores/store'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Mylists from './pages/Mylists'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route 
          path="/"
          exact
          element={
            <div className='container'>
              <App />
            </div>
        } 
        />
        
        <Route
          path="/register"
          element={
            <Register/>
          }
        />
        <Route
          path="/login"
          element={
            <Login/>
          }
        />
        <Route
          path="/list/:id"
          element={
            <div className='container'>
            <Mylists/>
            </div>
          }
        />
        
      </Routes>
    </Router>
    <ToastContainer/>
  </Provider>,
  document.getElementById('root')
)