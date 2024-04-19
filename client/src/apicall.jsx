import axios from "axios";


export const logincall = async (usercredential,dispatch) =>{
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login", usercredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    }
}