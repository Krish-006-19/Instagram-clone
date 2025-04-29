import React,{useState} from 'react'
import logo from '../images/instagramlogo.png'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../Redux/userSlice'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Login = async (e) => {
        e.preventDefault()
        try{
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            
            if(user.email)
            dispatch(login({
              type:'GET_USER',
              name: user.displayName,
              imgurl: user.photoURL,
              email: email
            }))
            navigate('/Insta-clone')
        }catch(err){
            throw err
        }
    }

    const loginbyGitHub = async()=>{
          try{
            const { user } = await signInWithPopup(auth, provider)
            
            dispatch(login({
              name: user.displayName,
              imgurl: user.photoURL,
              email: user.email
            }))
            navigate('/Insta-clone')
          }catch(err){
            throw err
          }
        }

    const sign=()=>{
        navigate('/Insta-clone/signup')
    }
  return (
    <div className="flex fixed left-1/3 items-center justify-center min-h-screen mb-10 bg-white px-4">
    <div className="w-full max-w-sm border p-6 rounded-2xl shadow-md">
      <img className="text-4xl font-serif text-center mb-4 text-black" src={logo}/>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          onChange={e=>(setEmail(e.target.value))}
          className="w-full border font-bold outline-0 px-4 py-2 rounded-md "
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
          className="w-full border font-bold outline-0 px-4 py-2 rounded-md "
          required
        />
        <button
          type="submit"
          onClick={Login}
          className="w-full font-bold bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors"
        >
          Log In
        </button>
      </form>

      <div className="flex items-center justify-between my-4">
        <hr className="w-2/5 border-gray-300" />
        <span className="text-gray-500 text-sm">OR</span>
        <hr className="w-2/5 border-gray-300" />
      </div>

      <button 
      className="flex items-center justify-center w-full text-blue-700 font-semibold hover:cursor-pointer"
      onClick={loginbyGitHub}>
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.8 8.207 11.387.6.111.827-.261.827-.577v-2.215c-3.338.726-4.042-1.61-4.042-1.61-.544-1.382-1.327-1.752-1.327-1.752-1.085-.741.082-.726.082-.726 1.198.084 1.828 1.23 1.828 1.23 1.07 1.827 2.808 1.297 3.493.993.107-.775.418-1.298.76-1.597-2.663-.3-5.463-1.33-5.463-5.928 0-1.308.469-2.382 1.236-3.219-.124-.301-.536-1.523.117-3.173 0 0 1.01-.325 3.304 1.243 1.114-.313 2.314-.469 3.49-.473 1.174.004 2.375.16 3.49.473 2.296-1.568 3.305-1.243 3.305-1.243.653 1.65.242 2.872.118 3.173.767.837 1.236 1.911 1.236 3.219 0 4.602-2.804 5.622-5.47 5.922.44.378.831 1.124.831 2.26v3.33c0 .317.223.693.832.578C20.563 21.798 24 17.304 24 12c0-6.628-5.372-12-12-12z" />
        </svg>
        Log in with GitHub
      </button>

      <p className="text-center mt-4 cursor-pointer"  onClick={sign}>
        <span>OR</span>
        <span className='text-blue-600 font-bold inline-block ml-2'>SignUp</span>
      </p>
    </div>
  </div>
  )
}

export default SignIn