import Post from "../post/post"
import Share from "../share/share"
import "./feed.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import {AuthContext} from "../../context/authcontext"
export default function Feed({username}) {
const [posts, setPosts] = useState([])
const {user} = useContext(AuthContext)

useEffect(() => {
  const fetchPosts = async () => {
  const res = username ? 
  await axios.get("http://localhost:8800/api/post/profile/" + username) :
  await axios.get("http://localhost:8800/api/post/timeline/" + user._id)
   setPosts(res.data.sort((a,b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
   }))

  }
  fetchPosts();
},[username,user._id])

    return(
        <div className="feed">
  <div  className="feedwrapper">
{ (!username || username === user.username) &&  <Share/>} 
    {posts.map((post) => (
    <Post key={post._id} post={post} />
     ))}
  </div>
        </div>
    )
}