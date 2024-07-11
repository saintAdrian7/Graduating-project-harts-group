import { Outlet } from 'react-router'
import './Layoutpage.css'
import { useAuth } from '../../Context/AuthContextProvider'
import { LoginRegisterModel } from '../../Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel'
import { MuiNavbar } from '../../Features/Components/MuiNavbar'
import { MuiPanel } from '../../Features/Components/Navbar/Muipanel'



export  function Layoutpage(){
const {state} = useAuth()
    return(
        <div className="layoutpage">
            {state.displayLogin && <LoginRegisterModel />}
            <MuiNavbar />
            <Outlet />
            <MuiPanel/>
        </div>

    )
}