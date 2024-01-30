import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import {useEffect, useState} from "react";

const App = () => {
    const [dateTime,setDateTime] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date().toLocaleString());
        },1000);
        return () => clearInterval(interval);
    }, []);
  return (
    <div>
      <Navbar dateTime={dateTime}/>
      <div className="row justify-content-lg-center mt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
