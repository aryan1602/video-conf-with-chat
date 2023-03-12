import { useState } from "react"
import SignIn from "./SignIn";
import SignUp from "./SignUp";



const AuthScreen = () =>{
    const [hasAccount, setHasAccount] = useState(1);
    const AccoundHandler = () => {
        setHasAccount(1 - hasAccount);
    };
    const toReturn = hasAccount ? <SignIn accHandler = {AccoundHandler}/> : <SignUp accHandler = {AccoundHandler}/>;
    return toReturn;
   
    

}

export default AuthScreen;