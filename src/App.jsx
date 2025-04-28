import React, { useEffect } from 'react'
import SideBar from './features/SideBar'
import Feed from './features/Feed'
import { useSelector } from 'react-redux'
import SignIn from './features/SignIn'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const user = useSelector(state => state.user.user)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      
    })
  },[])
  return (
    <div>
        {!user ?
        <SignIn />:
        <div className="flex flex-col sm:flex-row">
        <SideBar />
        <Feed />
      </div>}
    </div>
  )
}

export default App