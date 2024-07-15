import { useRef, useState } from "react";
import './LoginForm.css'
import { useAuth } from "../../../../Context/Authconstants";
import { LoginUser } from "../../../../Context/Authactions";
import { Stack,TextField, Button } from "@mui/material"



interface LoginFormProps{
    toggleRegister():void
}


export const LoginForm:React.FC<LoginFormProps> = ({toggleRegister}) =>{
    const { state, dispatch} = useAuth()
    const [error, setError] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault()
     if (emailRef && emailRef.current && passwordRef &&passwordRef.current)
        try {
            await LoginUser(dispatch, {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            setError(false)
            toggleRegister
            
        } catch (e) {
            setError(true);
            console.log(e);
            
    }


  }


    return(
        <form className="login-form">
            <h2 className="login-form-title">Login with Email</h2>
            <div  className="login-form-input-group">
                <Stack direction="column" spacing={3} width="80%">
                    <TextField label="email" variant="outlined" size="small" color="primary" type="email" required className="login-form-input"  placeholder="githubrian331@gmail.com" ref={emailRef} name="email"/>
                    
                    <TextField label="password" variant="outlined" size="small" color="primary" type="password" required className="login-form-input" placeholder="your secret" name="password" ref={passwordRef}/>
                </Stack>
            </div>
        {error && <p className="login-form-error">Invalid password or Email</p>}
        {state.loading && <p className="loading-message">Loading... please wait</p>}
        <Button variant="text" size="small" className="login-form-button" onClick={handleLogin} type="submit">Login</Button>
        <p className="login-form-register-message"><span className="login-form-toggle" onClick={toggleRegister}>Click here</span> to register.</p>
        </form>
    )

}