import "./sidebar.css"
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import {Dummydata} from "../../dummydata";
import CloseFriend from "../closefriend/closefriend";
export default function Sidebar(){
    return(
      <div className="sidebar">
        <div className="sidebarwrapper">
            <ul className="sidebarlist">
                <li className="sidebarlistitem">
              <RssFeedIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Feed</span>
                </li>
                <li className="sidebarlistitem">
              <ChatIcon className="sidebaricon"/>
              <span className="sidebaritemtext">chats</span>
                </li>
                <li className="sidebarlistitem">
              <PlayCircleIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Videos</span>
                </li>
                <li className="sidebarlistitem">
              <GroupIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Groups</span>
                </li>
                <li className="sidebarlistitem">
              <BookmarkIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Bookmarks</span>
                </li>
                <li className="sidebarlistitem">
              <HelpOutlineIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Questions</span>
                </li>
                <li className="sidebarlistitem">
              <WorkIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Jobs</span>
                </li>
                <li className="sidebarlistitem">
              <EventIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Events</span>
                </li>
                <li className="sidebarlistitem">
              <SchoolIcon className="sidebaricon"/>
              <span className="sidebaritemtext">Courses</span>
                </li>
            </ul>
            <button className="sidebarbutton">Show More</button>
            <hr className="sidebarhr"/>
            <ul className="sidebarfriendlist">
                {Dummydata.map((u) => (
                    <CloseFriend key={u.id} user={u}/>
                ))}
          </ul>
        </div>
      </div>
    )
}