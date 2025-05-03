import React, { useRef } from 'react'
import logo from '../images/instagramlogo.png'
import SideBarfeats from './SideBarfeats'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import ExploreIcon from '@mui/icons-material/Explore'
import MovieIcon from '@mui/icons-material/Movie'
import MessageIcon from '@mui/icons-material/Message'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useBoolean } from '../Context/BoolContext'
import ImageKit from 'imagekit'

const imagekit = new ImageKit({
  publicKey: "public_IqkHVP2v0qendWbfHxP4C+8TjJo=",
  privateKey:'private_7tMXhd/7Ojr7TjmgO+pQmE1oDmA=',
  urlEndpoint: "https://ik.imagekit.io/me2eruhxz",
  authenticationEndpoint: ""
})


function SideBar() {
  const fileInputRef = useRef(null)
  const { setSelectedImage, setSelectedVid } = useBoolean()
  const handleFileUpload =()=> fileInputRef.current.click() 

  const onFileChange = async(e) => {
    const file = e.target.files[0]
    if (file) {
      const uploadResponse = await imagekit.upload({file,fileName:file.name})
      setSelectedImage(uploadResponse.url)
      setSelectedVid(uploadResponse.url)
    }
  }

  return (
    <>
      <div className="fixed left-3 top-0 bottom-0 border-gray-500 pt-10 border-r bg-white hidden sm:block">
        <img src={logo} className="w-20 flex justify-center mb-8" />
        <div className="flex flex-col gap-4">
          <SideBarfeats Icon={HomeIcon} func="Home" />
          <SideBarfeats Icon={AddBoxIcon} func="Post" onClick={handleFileUpload} />
          <SideBarfeats Icon={SearchIcon} func="Search" />
          <SideBarfeats Icon={ExploreIcon} func="Explore" />
          <SideBarfeats Icon={MovieIcon} func="Reels" />
          <SideBarfeats Icon={MessageIcon} func="Messages" />
          <SideBarfeats Icon={FavoriteBorderIcon} func="Notifications" />
          <SideBarfeats Icon={AccountCircleIcon} func="Logout" />

        </div>

        <input
          type="file"
           accept="image/*,video/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileChange}
        />
      </div>
    </>
  );
}
export default SideBar
