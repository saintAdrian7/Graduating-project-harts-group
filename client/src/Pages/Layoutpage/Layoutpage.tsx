import { Outlet } from 'react-router'
import './Layoutpage.css'
import Navbar from '../../Features/Components/Navbar'
import { useAuth } from '../../Context/AuthContextProvider'
import { LoginRegisterModel } from '../../Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel'
import HomeNavbar from '../Homepage/HomeNavbar'



export  function Layoutpage(){
const {state} = useAuth()
    return(
        <div className="layoutpage">
            {state.displayLogin && !state.loggedInUser &&<LoginRegisterModel />}
            {state.loggedInUser && <HomeNavbar />}
            <Navbar/>
            <Outlet />
            <></>
        </div>

    )
}