import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { logout } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "../Context/BoolContext";

export default function SideBarfeats({ Icon, func, onClick = () => {} }) {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setAvatar } = useBoolean()
  const out = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
      navigate('/Insta-clone')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {func === 'Logout' ? (
        <div className="flex items-center gap-3 w-44 pr-2 cursor-pointer hover:bg-gray-100 p-1 rounded-lg" onClick={out}>
          <Avatar src={user?.imgurl} sx={{ width: '30px', height: '30px' }} />
          <span className="text-sm">{func}</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 w-44 pr-2 cursor-pointer hover:bg-gray-100 p-1 rounded-lg" onClick={onClick}>
          <Icon fontSize="small" />
          <span className="text-sm">{func}</span>
        </div>
      )}
    </>
  );
}
