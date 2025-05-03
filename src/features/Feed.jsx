import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { deleteDoc, increment, updateDoc } from 'firebase/firestore'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore'
import { useBoolean } from '../Context/BoolContext'
import { addDoc } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'
import IconButton from '@mui/material/Button'
import { useSelector } from 'react-redux'

function Feed() {
  const [posts, setPosts] = useState([])
  const [com, setCom] = useState([])
  const [inp2, setInp2] = useState('')
  const [index, setIndex] = useState(-1)
  const [likes, setLikes] = useState(0)
  const [input, setInput] = useState('')

    const { setSelectedImage, selectedImage, selectedVid, setSelectedVid } = useBoolean()
    const user = useSelector(state=>state.user.user)

    useEffect(() => {
      const postQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

      const unsub = onSnapshot(postQuery, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      })
      return () => unsub()
    }, [])

    useEffect(() => {
      const postQuery = query(collection(db, 'comments'), orderBy('timestamp', 'asc'));

      const unsub = onSnapshot(postQuery, (snapshot) => {
        setCom(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      })
      return () => unsub()
    }, [])

    const deletePost = async (postId, emaildata) => {
      setIndex(-1)
      if (user.email === emaildata) 
        await deleteDoc(doc(db, 'posts', postId))
    }

    const like = async( postId, emaildata ) => {
      try{
        if(user.email !== emaildata)
        await updateDoc(doc(db,'posts',postId), {
        likes: increment(1),
      })
    }catch(ett){
        throw ett
    }}

    const postBtn = async (e) => {
      e.preventDefault()
      setIndex(-1)
    
      if (!input) return
    
      try {
        await addDoc(collection(db, 'posts'), {
          name: user.name,
          message: input,
          email: user.email,
          likes: 0,
          imgURL: selectedImage,
          vidURL: selectedVid,
          avatar: user.imgurl ,
          timestamp: serverTimestamp()
        })
        setInput('')
        setSelectedImage(null)
        setSelectedVid(null)
        setLikes(0) 
      } catch (err) {
        throw err
      }
    }
    
    const undo =()=> {
      setSelectedImage(null)
      setSelectedVid(null)
      setInput('')
    }

    const addComment = async(e,postId) => {
      e.preventDefault()
      try{
        if( inp2 )
        await addDoc(collection(db,'comments'),{
          profileURL: user.imgurl,
          name: user.name,
          message: inp2,
          postid:postId,
          timestamp: serverTimestamp()
        })
        setInp2('')
      }catch(err){
        throw err
      }
    }

  return (
    <>
<div className="flex ml-100">

  <div>
  {posts?.map((post,Index) => (
  <div key={post.id} className="flex gap-6  mb-8 mt-4 border-b pb-6">
    <div className="w-6/4">
      <div className="flex justify-between">
        <div className="flex items-center hover:cursor-pointer">
          <Avatar src={post.data.avatar || ''}/>
          <b>
            <p className="text-xs mr-1 ml-1">{post.data.name}</p>
          </b>
        </div>
        <div className='flex items-center'>
          <button
            className={`text-red-600 text-xs hover:cursor-pointer ${user.email === post.data.email?'hover:cursor-pointer':'hidden'}`}
            onClick={() => deletePost(post.id, post.data.email)}
          >Delete</button>
        </div>
      </div>

      <div className="mt-2 mb-2 w-full flex justify-center">
        {post.data.imgURL?
          <img src={post.data.imgURL} className="w-[468px]" />
          :<video controls className="w-[468px]">
          <source src={post.data.vidURL} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
          }
      </div>

      <div className="flex justify-between hover:cursor-pointer">
        <div className="flex gap-2">
          <div onClick={() => like(post.id, post.data.email)}>
            <IconButton sx={{ border: "black", borderRadius: "1000000px" }}>
              <FavoriteBorderIcon />
            </IconButton>
          </div>
          <div onClick={() => {
            setIndex(Index)
            }}>
            <IconButton>
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div>
          <BookmarkBorderRoundedIcon />
        </div>
      </div>

      <div className="text-xs mt-1">
        <b>{post.data.likes} likes</b>
      </div>
      <div className="text-xs">{post.data.message}</div>
    </div>

 {   index === Index && (<div className='w-3/2 mt-10'>
      <div className="flex items-center gap-2 mb-2">
        <Avatar src={post.data.avatar || ''} sx={{ width: "30px", height: "30px" }} />
        <div className="font-semibold text-xs">{post.data.name }</div>
      </div>
      <div>
      
      {com?.filter(comment=>comment.data.postid == post.id).map((comment,index)=>(
        <div key={`${index}` + comment}>
        <div className='flex gap-1 items-center'>
        <Avatar src={comment.data.profileURL || ''} sx={{width:'30px',height:'30px'}}/>
        <p className="text-xs font-bold">{comment.data.name}</p>
        <p className='text-xs mt-2 mb-2'>{comment.data.message}</p>
        </div>
        </div>
      ))}

      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex">
      <input
          type="text"
          onChange={(e)=>setInp2(e.target.value)}
          value={inp2}
          placeholder="Comment..."
          className=" rounded outline-0 text-xs px-2 py-1 w-full"
        />
  <button
    type="submit" 
    onMouseDown={(e)=>{addComment(e,post.id)}}
    className="text-blue-500 px-3 py-1 rounded text-sm"
  >
    Post
  </button>
  </div>
</form>

    </div>)}
  </div>
))}

  </div>
</div>

{(selectedImage||selectedVid) && (
  <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
     bg-white shadow-2xl rounded-xl w-[850px] max-w-[95%] flex 
     overflow-hidden z-50 border border-gray-300">
    
    <div className="w-1/2 bg-black">
      {selectedVid?
      <video controls className="object-cover w-full h-full max-h-[500px]">
      <source src={selectedVid} type="video/mp4" />
      Your browser does not support the video tag.
      </video>
      :<img
        src={selectedImage}
        className="object-cover w-full h-full max-h-[500px]"
      />}
    </div>

    <div className="w-1/2 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Avatar src={user?.imgurl} />
          <p className="text-sm font-semibold">{user.name}</p>
        </div>
        <div onClick={undo} className="bg-red-600 rounded-full w-5 h-5"></div>
      </div>

      {/* FORM starts here */}
      <form
      //  onSubmit={postBtn}
        className="flex flex-col gap-4">
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Write a caption..."
          className="resize-none w-full h-40 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
        />

        <button
          type="submit"
          onMouseDown={postBtn}
          onClick={undo}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white text-sm 
          w-full font-semibold py-2 rounded-lg">
          Post
        </button>
      </form>
    </div>
  </div>
)}</>
  )
}

export default Feed
