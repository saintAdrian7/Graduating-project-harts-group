import { useState, useEffect } from "react"
import { useAuth } from "../../../../Context/ContextProvider"
import { LoginForm } from "../Loginform/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"
import { Modal } from "../../Components/Modal"



export const LoginRegisterModel: React.FC = () => {
    const {state, dispatch} = useAuth()
    const [login, setLogin] = useState<boolean>(true)

    const closeModal = () =>{
        dispatch({type: 'HIDE MODAL'})

    }

    const toggleLogin = () => {
        setLogin(!login)

    }

    useEffect(() => {
        if(state.loggedInUser){
            closeModal()
        }
        return (() => {
            if(state.loggedInUser){
                localStorage.setItem('userId', state.loggedInUser._id)
            }
          })
    },[state.loggedInUser])

return(
  <>
   <Modal 
        content={login ? <LoginForm toggleRegister={toggleLogin}/> : <RegisterForm toggleLogin={toggleLogin}/>}

        toggleModal={closeModal}
        />
  </>
)

}