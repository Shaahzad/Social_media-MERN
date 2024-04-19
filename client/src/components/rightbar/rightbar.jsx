import "./rightbar.css"
import RedeemIcon from '@mui/icons-material/Redeem';
import { Dummydata } from "../../dummydata";
import Online from "../online/online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({user}) {
const [friends,setfriends] = useState([])
const {user:currentUser, dispatch} = useContext(AuthContext)
const [followed,setfollowed] = useState(currentUser.followings.includes(user?.id))


const Handleclick = async () => {
    try {
        if (followed) {
            await axios.put("http://localhost:8800/api/user/" + user._id + "/unfollow", {userId:currentUser._id})
            dispatch({type: "UNFOLLOW", payload: user._id})

        }

          else {
            await axios.put("http://localhost:8800/api/user/" + user._id + "/follow", {userId:currentUser._id})
            dispatch({type: "FOLLOW", payload: user._id})
        }
    } catch (error) {
        console.log(error);
    }
    setfollowed(!followed)
}


useEffect(() => {
    setfollowed(currentUser.followings.includes(user?.id))
},[currentUser,user?.id])



useEffect(() => {
    const getfriends = async () => {
        if (user?._id) {
            try {
                const res = await axios.get("http://localhost:8800/api/user/friends/" + user._id);
                setfriends(res.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
    getfriends()
}, [user?._id])

const Homerightbar = ()=>{
    return(
        <>
                    <div className="birthdaycontainer">
                <RedeemIcon className="birthdayimg"/>
                <span className="birthdaytext">
                    <b>Sarfraz Ahmed </b> and <b>3 other friends</b> have a birthday today
                </span>
            </div>
            <img src="../src/assets/ad.jpg" alt="" className="rightbarad"/>
            <h4 className="rightbartitle">Online friends</h4>
            <ul className="rightbarfriendlist">
                {Dummydata.map((u) => (
                    <Online key={u.id} user={u}/>
                ))}
            </ul>
        </>
    )
}

const Profilerightbar = ()=>{
    return(
        <>
        {user.username !== currentUser.username && (
            <button className="rightbarfollowingbutton" onClick={Handleclick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <RemoveIcon/> : <AddIcon/>}

            </button>
        )}
        <h4 className="rightbartitle">user information</h4>
        <div className="rightbarinfo">
            <div className="rightbarinfoitem">
                <span className="rightbarinfokey">City:</span>
                <span className="rightbarinfovalue">{user.city}</span>
            </div>
            <div className="rightbarinfoitem">
                <span className="rightbarinfokey">from:</span>
                <span className="rightbarinfovalue">{user.from}</span>
            </div>
            <div className="rightbarinfoitem">
                <span className="rightbarinfokey">Relationship</span>
                <span className="rightbarinfovalue">{user.relationship <= 1 ? "single💗" : user.relationship > 1 ? "Married" : "-"}</span>
            </div>
        </div>
        <h4 className="rightbartitle">user friends</h4>
        <div className="rightbarfollowings">
            {friends.map((f) => (
                <Link to={'/profile/' + f.username} style={{ textDecoration: "none" }}>
                <div className="rightbarfollowing">
                <img src={f.profilePicture ? f.profilePicture : "../src/assets/no avatar.png"} alt="" className="rightbarfollowingimg"/>
                <span className="rightbarfollowingname">{f.username}</span>
            </div>
                </Link>
            ))}
        </div>
        </>
    )
}

    return(
        <div className="rightbar">
         <div className="rightbarwrapper">
            {user ? <Profilerightbar/> : <Homerightbar/>}
         </div>
        </div>
    )
}