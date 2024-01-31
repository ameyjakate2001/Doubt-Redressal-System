import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DoubtScreen from './screen/DoubtScreen'
import Registerscreen from './screen/RegisterScreen'
import LoginScreen from './screen/LoginScreen'
import AddDoubtScreen from './screen/AddDoubtScreen'
import AnswerDoubtScreen from './screen/AnswerDoubtScreen'
import PrivateRoute from './screen/PrivateRoute'
import AdminPrivateRoute from './screen/AdminPrivateRoute'
import useCheckUser from './hooks/useCheckUser'
import PageLoader from './components/PageLoader'
import MyAskedDoubtScreen from './screen/MyAskedDoubtScreen'
import MyAnsweredDoubtScreen from './screen/MyAnsweredDoubtScreen'

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
                <AnswerDoubtScreen />
              </AdminPrivateRoute>
            }
          />
          <Route
            path='/mySolvedDoubts'
            element={
              <AdminPrivateRoute>
                <MyAnsweredDoubtScreen />
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
                <MyAskedDoubtScreen />
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
