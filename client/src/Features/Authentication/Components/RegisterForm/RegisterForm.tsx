import { useRef, useEffect } from "react";

import './Register.css'
import { useAuth } from "../../../../Context/Authconstants";
import { registerUser } from "../../../../Context/Authactions";
import { Stack,TextField, Button } from "@mui/material"


interface RegisterFormProps{
    toggleLogin():void
}



export const RegisterForm:React.FC<RegisterFormProps> = ({toggleLogin}) => {
const firstNameRef = useRef<HTMLInputElement>(null)
const lastNameRef = useRef<HTMLInputElement>(null)
const emailRef = useRef<HTMLInputElement>(null)
const passwordRef = useRef<HTMLInputElement>(null)
const {state, dispatch} = useAuth()

useEffect(() => {
  return () => {
    dispatch({ type: 'RESET REGISTER SUCCESS' });
  };
}, [dispatch]);


const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
if(firstNameRef && firstNameRef.current && lastNameRef && lastNameRef.current && emailRef && emailRef.current && passwordRef && passwordRef.current){
    
      await registerUser(dispatch, {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
  
      })
  
  }
}

   return (
        <form className="register-form">
            <h2 className="register-form-title">Sign in using email</h2>
            <div className="register-form">
            <Stack direction="column" spacing={3} width="80%">
                <TextField label="Firstname" variant="outlined" size="small" color="primary" type="text" ref={firstNameRef} placeholder="Brian" required name="firstName"/>

                <TextField label="Lastname" variant="outlined" size="small" color="primary" type="text" ref={lastNameRef} placeholder="Githu" required name="lastName"/>

                <TextField label="email" variant="outlined" size="small" color="primary" type="email" placeholder="githubrian331@gmail.com" ref={emailRef} name="email" required/>

                <TextField label="password" variant="outlined" size="small" color="primary" type="password" placeholder="your secret" name="password"  required ref={passwordRef}/>
                </Stack>
            </div>
            {state.error && <p className="register-form-error">Unable to register at this time</p>}
            <Button variant="text" size="small" className="register-form-button" onClick={handleRegister}>Register</Button>
            {state.registerSuccess && <p className=".register-form-register-message">registered success</p>}<span className="register-form-toggle" onClick={toggleLogin}>Click here to login</span> 
            

        </form>
    )

}