import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authcontext";




 function Post({post}) {
    const [like,setlike] = useState(post.likes.length);
    const [islike,setislike] = useState(false);
    const [user, setUser] = useState({});
    const {user:currentuser} = useContext(AuthContext)



    useEffect(()=>{
        setislike(post.likes.includes(currentuser._id))
    },[currentuser._id,post.likes])

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/user?userId=${post.userId}`);
                setUser(res.data)
    
            } catch (error) {
                console.log(error);
            }
        }
        fetchuser();
    },[post.userId]);


    const likeHandler = () => {

      try {
        axios.put("http://localhost:8800/api/post/" + post._id + "/like", {userId:currentuser._id})
      } catch (error) {
        
      }
        setislike(!islike);
        setlike(islike ? like - 1 : like + 1);          
    };

    return (
        <div className="post">
            <div className="postwrapper">
                <div className="posttop">
                    <div className="posttopleft">
                        <Link to={`profile/${user.username}`}>
                        <img className="postuserimg" src={user.profilePicture || "../src/assets/no avatar.png"} alt="hi!" />
                        </Link>
                        <span className="postusername">{user.username || "unknown"}</span>
                        <span className="postmin">{format(post.createdAt)}</span> {/* Display time ago */}
                    </div>
                    <div className="posttopright">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postcenter">
                    <span className="posttext">{post.desc}</span>
                    {post.img && <img className="postimg" src={`http://localhost:8800/images/${post.img}`} alt="Posted" />}
                </div>
                <div className="postbottom">
                    <div className="postbottomleft">
                        <ThumbUpIcon htmlColor="blue" onClick={likeHandler} className="likeicon" />
                        <FavoriteIcon htmlColor="red" onClick={likeHandler} className="likeicon" />
                        <span className="postlikecounter">{like} people like it</span>
                    </div>
                    <div className="postbottomright">
                        <div className="postcommenttext">{post.comment} comment</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post