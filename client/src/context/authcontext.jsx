
import { createContext, useReducer } from "react"
import AuthReducer from "./authreducer"

const INITIAL_STATE = {
    user:{    
_id:"66219fdec7ca4a9837c00e6b",
username:"Shahzad",
email:"lalashehzad79@gmail.com",
password:"$2b$10$zuLl337Whl8W9kxqrkyfe.rrBCySrlvVg0dIR/u88BM.19ha.Tfe6",
profilePicture:"../src/assets/friendimg.jpg",
coverPicture:"../src/assets/person1.jpg",
followers:["66219fdec7ca4a9837c00e6b"],
followings:["66219fdec7ca4a9837c00e6b"],
isAdmin:false
},
    // user: null,
    isfetching: false,
    error: false
}


export const AuthContext = createContext(INITIAL_STATE)


export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return(
        <AuthContext.Provider value={{user: state.user, isfetching: state.isfetching, error: state.error, dispatch}}>
        {children}
        </AuthContext.Provider>
    )
}