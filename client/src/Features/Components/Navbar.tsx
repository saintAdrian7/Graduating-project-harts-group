import { useAuth } from "../../Context/ContextProvider"

export default function Navbar () {
const {state, dispatch} = useAuth()

const setDisplayLogin = () => {
    dispatch({ type: 'SHOW MODAL' });
  };

    return(
        <>
         <h1>Nav bar</h1>
        <button onClick={setDisplayLogin}>Login</button>
        </>
       
    )

}