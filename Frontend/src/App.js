import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DoubtScreen from './screen/DoubtScreen'
import Registerscreen from './screen/RegisterScreen'
import LoginScreen from './screen/LoginScreen'
import AddDoubtScreen from './screen/AddDoubtScreen'
import MyDoubtScreen from './screen/MyDoubtScreen'
import PrivateRoute from './screen/PrivateRoute'
import AdminPrivateRoute from './screen/AdminPrivateRoute'
import useCheckUser from './hooks/useCheckUser'
import PageLoader from './components/PageLoader'
import AskedDoubtScreen from './screen/AskedDoubtScreen'
import SolvedDoubtScreen from './screen/SolvedDoubtScreen'

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
          <Route path='/' element={<DoubtScreen />} />
          <Route
            path='/solveDoubt'
            element={
              <AdminPrivateRoute>
                <MyDoubtScreen />
              </AdminPrivateRoute>
            }
          />
          <Route
            path='/mySolvedDoubts'
            element={
              <AdminPrivateRoute>
                <SolvedDoubtScreen />
              </AdminPrivateRoute>
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
          <Route
            path='/myAskedDoubts'
            element={
              <PrivateRoute>
                <AskedDoubtScreen />
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
