
import { useAuth } from "../../Context/Authconstants"
import { LoginRegisterModel } from "../../Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel"

export default function HomePage () {
const {state} = useAuth()
    return (
        <>
        <h2>Homepage</h2>
        {state.displayLogin && <LoginRegisterModel />  }
        
        </>
        
    )
}

