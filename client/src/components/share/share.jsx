import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import {AuthContext} from "../../context/authcontext"
import axios from "axios"


export default function Share() {

   const {user} = useContext(AuthContext)
   const desc  = useRef()
   const [file,setfile] = useState()

const handlesubmit = async (e)=>{
e.preventDefault()

const newPost = {
   userId: user._id,
   desc: desc.current.value,
}
if (file) {
 const Data = new FormData()
 const filename = Date.now() + file.name;
 Data.append("name", filename)
 Data.append("file", file) 
 newPost.img = filename;      
 console.log(newPost);
try {
   await axios.post("http://localhost:8800/api/upload", Data)
} catch (error) {
   console.log(error);
} 
}
try {
  await axios.post("http://localhost:8800/api/post",newPost)
  window.location.reload()
} catch (error) {
   console.log(error);
}
}

    return (
        <div className="share">
        <div className="sharewrapper">
            <div className="sharetop">
            <img src={user.profilePicture ? user.profilePicture : "./src/assets/no avatar.png"} alt="" className="shareprofileimg" />
            <input placeholder={"What's in your mind " + user.username + "?"} ref={desc} className="shareinput" />
            </div>
            <hr className="sharehr"/>
            {file && (
                <div className="shareimgcontainer">   
                <img className="shareimg" src={URL.createObjectURL(file)} alt=""/>
                <div className="sharecancelimg" onClick={() => setfile(null)}>X</div>
                </div>
            )}
            <form className="sharebottom" onSubmit={handlesubmit}>
            <div className="shareoptions">
             <label htmlFor="file" className="shareoption">
                <PermMediaIcon htmlColor="tomato" className="shareicon"/>
                <span className="shareoptiontext">Photo or text</span>
                <input style={{display:"none"}} type="file" id="file" accept="image/*" onChange={(e)=>setfile(e.target.files[0])}/>
             </label >
             <div className="shareoption">
                <LabelIcon htmlColor="blue" className="shareicon"/>
                <span className="shareoptiontext">Tag</span>
             </div>
             <div className="shareoption">
                <RoomIcon htmlColor="green" className="shareicon"/>
                <span className="shareoptiontext">Location</span>
             </div>
             <div className="shareoption">
                <EmojiEmotionsIcon htmlColor="golden" className="shareicon"/>
                <span className="shareoptiontext">Feelings</span>
             </div>
            </div>
            <button type="submit" className="sharebutton">Share</button>
            </form>
        </div>
        </div>
    )
}
