import Home from "../components/HomePage/Home";
import Inscription from "../components/Inscription/Inscription";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
];
export default routes;
