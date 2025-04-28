import { createContext, useContext, useState } from 'react'

const BooleanContext = createContext(null)

export function BooleanProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null)  
  const [post, setPost] = useState([])
  const [input, setInput] = useState('')
  const [likes, setLikes] = useState(0)
  

  return (
    <BooleanContext.Provider value={{
        selectedImage, 
        setSelectedImage, 
        post, 
        setPost, 
        input, 
        setInput, 
        likes, 
        setLikes
        }}>
      {children}
    </BooleanContext.Provider>
  );
}

export function useBoolean() {
  return useContext(BooleanContext)
}
