import "./App.css";
import Homepage from "./Screens/Homepage";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Aboutus from "./Screens/Aboutus";
import Contactus from "./Screens/Contactus";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Chat from "./Screens/Chat";
import EasyReach from "./Screens/EasyReach.js";

// bootstrap
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<EasyReach/>} />
                <Route exact path="/home" element={<EasyReach/>} />
                <Route exact path="/aboutus" element={<Aboutus />} />
                <Route exact path="/contactus" element={<Contactus />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/chat" element={<Chat />} />
                <Route exact path = "/easy_reach" element = {<EasyReach/>}></Route>
            </Routes>
         <Footer/>
        </div>
    );
}

export default App;
