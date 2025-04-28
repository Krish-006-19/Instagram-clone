import { Avatar } from '@mui/material'
import { useBoolean } from './Context/BoolContext'
import { addDoc, collection, increment, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { serverTimestamp } from 'firebase/firestore'

function PopUp() {
  const { setSelectedImage, selectedImage, input, setInput, avatar, likes, setLikes } = useBoolean()
  const postBtn = async (e) => {
    e.preventDefault();
    console.log('submitted');
    try {
      if (input) {
        await addDoc(collection(db, 'posts'), {
          name: 'Krish Ramena',
          message: input,
          likes: 0,
          imgURL: selectedImage,
          avatar: avatar,
          timestamp: serverTimestamp(),
        })
        setLikes(0)
      }
    } catch (err) {
      console.error('Error posting: ', err);
    }
  }  

  const undo =()=>{
    setSelectedImage(null)
    setInput('')
  }
  
  return (
  <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-xl w-[850px] max-w-[95%] flex overflow-hidden z-50 border border-gray-300">
    
    <div className="w-1/2 bg-black">
      <img
        src={selectedImage}
        alt="preview"
        className="object-cover w-full h-full max-h-[500px]"
      />
    </div>

    <div className="w-1/2 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
        <Avatar src={avatar} />
        <p className="text-sm font-semibold">Krishnexus006</p>
        </div>
        
        <div onClick={undo} className="bg-red-600 rounded-full w-5 h-5"></div>
      </div>
<form>
      <textarea
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        placeholder="Write a caption..."
        className="resize-none w-full h-40 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
      />

      <button
      onMouseLeave={postBtn}
       onClick={undo}
       className="mt-4 bg-purple-500 hover:bg-purple-600 text-white text-sm w-full font-semibold py-2 rounded-lg">
        Post
      </button>
      </form>
    </div>
  </div>
  )
}

export default PopUp