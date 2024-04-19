import "./profile.css"
import Topbar from "../../topbar/topbar"
import Sidebar from "../../sidebar/sidebar"
import Feed from "../../feed/feed"
import Rightbar from "../../rightbar/rightbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function Profile(){
  const [user, setUser] = useState({});
  const username = useParams().username


  useEffect(() => {
    const fetchuser = async () => {
       const res = await axios.get(`http://localhost:8800/api/user?username=${username}`);
      setUser(res.data);
    }
    fetchuser();
},[]);

    return(
        <>
        <Topbar/>
        <div className="Profile">
          <Sidebar/>
          <div className="profileright">
          <div className="profilerighttop">
            <div className="profilecover">
            <img src={user.coverPicture ? user.coverPicture : "../src/assets/no cover.png"} alt=""  className="profilecoverimg"/>
            <img src={user.profilePicture ? user.profilePicture : "../src/assets/no avatar.png"} alt=""  className="profileuserimg"/>
            </div>
            <div className="profileinfo">
        <h4 className="profileinfoname">{user.username}</h4>
        <span className="profileinfodesc">{user.desc}</span>
            </div>
          </div>
          <div className="profilebottom">
          <Feed username={username}/>
          <Rightbar user={user}/>
          </div>
          </div>
        </div>
        </>

    )
}