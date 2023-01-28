import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homescreen from './screen/HomeScreen'
import Registerscreen from './screen/RegisterScreen'
import LoginScreen from './screen/LoginScreen'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route exact path='/' element={<Homescreen />} />
          <Route path='/signin' element={<LoginScreen />} />
          <Route path='/signup' element={<Registerscreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
