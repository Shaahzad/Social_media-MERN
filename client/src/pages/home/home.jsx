import React from "react";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import "./home.css";


export default function Home(){
    return(
        <div>
          <Topbar/>
          <div className="container">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
          </div>
        </div>
    )
}