import "./online.css"


export default function Online({user}){
    return(
        <li className="rightbarfriend">
        <div className="rightbarprofileimgcontainer">
            <img src={user.profilepic} alt="" className="rightbarprofileimg" />
            <span className="rightbaronline">
            </span>
        </div>
        <span className="rightbarusername">{user.username}</span>
    </li>
    )
}