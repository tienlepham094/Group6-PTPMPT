import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/useAuth";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <UserProvider>
      <SideMenu />
      <div className="container">
        <Navbar />
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
