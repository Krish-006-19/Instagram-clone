import { createContext, useContext, useState } from 'react'

const BooleanContext = createContext(null)

export function BooleanProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null)  
  
  return <BooleanContext.Provider value={{ selectedImage, setSelectedImage }}> {children} </BooleanContext.Provider>
}

export function useBoolean() {
  return useContext(BooleanContext)
}
