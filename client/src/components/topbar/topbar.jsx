import "./topbar.css" 
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/authcontext"



export default function Topbar(){
const {user} = useContext(AuthContext)


    return(
        <div className="topbarcontainer">
<div className="topbarleft">
    <Link to="/" style={{ textDecoration: "none" }}>
<div className="logo">SM Media</div>
    </Link>
</div>
<div className="topbarcenter">
    <div className="searchbar">
    <SearchIcon className="searchIcon"/>
    <input type="search" placeholder="search for friend, post or video" className="searchinput" />
    </div>
</div>
<div className="topbarright">
    <div className="topbarlinks">
        <span className="topbarlink">Homepage</span>
        <span className="topbarlink">timeline</span>
    </div>
    <div className="topbaricons">
        <div className="topbariconitem">
   <PersonIcon/>
   <span className="topbariconbadge">1</span>
        </div>
        <div className="topbariconitem">
   <ChatIcon/>
   <span className="topbariconbadge">2</span>
        </div>
        <div className="topbariconitem">
   <NotificationsIcon/>
   <span className="topbariconbadge">3</span>
        </div>
    </div>
    <Link to={`/profile/${user.username}`}>
    <img src={user.profilePicture ? user.profilePicture : "../src/assets/no avatar.png" } alt="hi" className="topbarimage"/>
    </Link>
</div>
   </div>
    )
}