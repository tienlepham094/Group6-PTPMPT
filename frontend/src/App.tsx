import { UserProvider } from "./context/useAuth";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
    </UserProvider>
  );
}

export default App;
