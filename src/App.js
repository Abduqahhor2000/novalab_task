import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import axios from "axios"
import Home from "./container/Home";
import Main from "./container/Main";
import Register from "./container/Register";
import Login from "./container/Login";
import Profile from "./container/Profile";


function App() {
  axios.defaults.baseURL = "https://reqres.in/api/"

  return (
    <BrowserRouter>
    <div className="App">
      <Home/>
      <Routes>
     
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/sign-up" element={<Register/>} />
            <Route exact path="/sign-in" element={<Login/>} />
            <Route exact path="/profile" element={<Profile/>} />
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
