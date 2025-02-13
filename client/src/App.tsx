import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Outlet />
        <ToastContainer position="bottom-right" />
      </UserProvider>
    </>
  );
}

export default App;
