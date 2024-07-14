// import { LoginRegisterModel } from "./Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel"
// import { Modal } from "./Features/Authentication/Components/Modal"
// import Navbar from "./Features/Components/Navbar"
// import HomePage from "./Pages/Homepage"
import { MuiNavbar} from "./Features/Components/MuiNavbar"
import { MuiPanel} from "./Features/Components/MuiPanel"
import { MuiLoginForm} from "./Features/Components/MuiLoginForm"
import { MuiRegisterForm} from "./Features/Components/MuiRegisterForm"


function App() {
  return (
    <>

    {/* <Navbar /> */}
    <MuiNavbar />
    <MuiPanel />
    <MuiLoginForm />
    <MuiRegisterForm />
   
    {/* <HomePage /> */}
    </>
    
  
     
  )
}

export default App
