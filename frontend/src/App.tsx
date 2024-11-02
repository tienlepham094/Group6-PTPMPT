import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
    </UserProvider>
  );
}

export default App;
