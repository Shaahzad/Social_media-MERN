import "./App.css"
import Home from './pages/home/home'
import { BrowserRouter as Router,  Routes, Route, Link, Navigate,  } from "react-router-dom";
import Login from './pages/home/login/login'
import Register from "./pages/home/register/register";
import Profile  from './components/post/profile/profile'
import { useContext } from "react"
import { AuthContext } from "./context/authcontext";


function App() {
const {user} = useContext(AuthContext)
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={user ?  <Home /> : <Register/>}></Route>
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login />}></Route>
        <Route path="/register" element={user ? <Navigate to={"/"}/> : <Register />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
