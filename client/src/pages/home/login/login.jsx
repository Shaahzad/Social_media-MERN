import { useContext, useRef } from "react";
import "./login.css";
import { logincall } from "../../../apicall";
import { AuthContext } from "../../../context/authcontext";

export default function Login() {
const email = useRef()
const password = useRef()
const {user , isfetching, error, dispatch} = useContext(AuthContext)



const handleclick = async (e)=>{
    e.preventDefault()
    await logincall({email:email.current.value,password:password.current.value}, dispatch);
};

console.log(user);
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
            <form onSubmit={handleclick} className="loginbox">
                <input  placeholder="Email" type="email" className="logininput" required ref={email} />
                <input  placeholder="Password" type="password" minLength={6} className="logininput" required ref={password}  />
                 <button className="loginbutton" disabled={isfetching}>{isfetching ? "Loading":"Login"}</button>
                 <span className="loginforgot">Forgot Password?</span>
                 <button className="loginregisterbutton">
                 {isfetching ? "Loading":"Create anew Account"}
                 </button>
            </form>
        </div>
    </div>
</div>
    )
}