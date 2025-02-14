import Ajout from "../components/Ajout/Ajout";
import Carnet from "../components/Carnet/Carnet";
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
  {
    path: "/carnet",
    element: <Carnet />,
  },
  {
    path: "/ajout",
    element: <Ajout />,
  },
];
export default routes;
