import { useRef } from "react";
import "./register.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const username = useRef()
    const email = useRef()
    const Password = useRef()
    const PasswordAgain = useRef()
    const Navigate = useNavigate()

const handleclick = async (e)=>{
e.preventDefault()
if (PasswordAgain.current.value !== Password.current.value) {
    PasswordAgain.current.setCustomValidity("Passwords don't match")
}
else{
    const user = {
        username:  username.current.value,
        email:  email.current.value,
        password:  Password.current.value,
    }
    try {
        await axios.post("http://localhost:8800/api/auth/register", user)
        Navigate("/login")
    } 
    catch (error) {
        console.log(error);
    }
}
}



    return (
<div className="login">
    <div className="loginwrapper">
        <div className="loginleft">
            <h3 className="loginlogo">SM Media</h3>
            <span className="logindesc">
                Connect with friends and the world around you on SM Media.
            </span>
        </div>
        <div className="loginright">
            <form className="loginbox" onSubmit={handleclick}>
            <input  placeholder="UserName" required  ref={username} className="logininput" />
                <input  placeholder="Email"required type="email" ref={email} className="logininput" />
                <input  placeholder="Password" required type="password" ref={Password} className="logininput" />
                <input  placeholder="Password Again"required type="password"  ref={PasswordAgain} className="logininput" />
                 <button className="loginbutton" type="submit">Sign Up</button>
                 <button className="loginregisterbutton">Log Into Account</button>
            </form>
        </div>
    </div>
</div>
    )
}