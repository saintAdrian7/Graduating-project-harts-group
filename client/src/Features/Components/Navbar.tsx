import { useAuth } from "../../Context/AuthContextProvider"

export default function Navbar () {
const {state, dispatch} = useAuth()

const setDisplayLogin = () => {
    dispatch({ type: 'SHOW MODAL' });
  };

    return(
        <>
         <h1>Nav bar</h1>
        </>
       
    )

}