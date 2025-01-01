import { useSelector } from "react-redux"
import SideBar from "../SideBar/SideBar"
import AdminSideBar from "../AdminSideBar/AdminSideBar"

const LayoutSideBar = ({children}) => {
   const user = useSelector((state) => state.user)

   return (
      <>
         {
            user.admin ? <AdminSideBar/> : <SideBar/>
         }
         {children}
      </>
   )
}

export default LayoutSideBar