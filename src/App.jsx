import React, { useEffect } from 'react'
import SideBar from './features/SideBar'
import Feed from './features/Feed'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './features/SignIn'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { login, logout } from './Redux/userSlice'

function App() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,(userst)=>{
      if(userst)
        dispatch(login({
          name: userst.displayName,
          imgurl: userst.photoURL,
          email: userst.email
        }))
      else{
        dispatch(logout())
      }
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