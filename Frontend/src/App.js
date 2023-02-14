import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homescreen from './screen/HomeScreen'
import Registerscreen from './screen/RegisterScreen'
import LoginScreen from './screen/LoginScreen'
import AddDoubtScreen from './screen/AddDoubtScreen'
import PrivateRoute from './screen/PrivateRoute'
import useCheckUser from './hooks/useCheckUser'
import PageLoader from './components/PageLoader'

function App() {
  const { loading } = useCheckUser()

  if (loading) {
    return (
      <React.Fragment>
        <PageLoader />
      </React.Fragment>
    )
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Homescreen />
              </PrivateRoute>
            }
          />
          <Route
            path='/addDoubt'
            element={
              <PrivateRoute>
                <AddDoubtScreen />
              </PrivateRoute>
            }
          />
          <Route path='/signin' element={<LoginScreen />} />
          <Route path='/signup' element={<Registerscreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
