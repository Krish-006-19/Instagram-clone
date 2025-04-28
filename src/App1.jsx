import React from 'react'
import { BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import App from './App'
import SignUp from './features/SignUp'

function App1() {
  return (
        <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Insta-clone'/>}/>
        <Route path='/Insta-clone' element={<App/>}/>
        <Route path='/Insta-clone/signup' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App1