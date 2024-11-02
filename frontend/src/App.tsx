import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/useAuth";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <div className="content-container">
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
