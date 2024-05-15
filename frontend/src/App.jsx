import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Get from "./components/GET/Get";
import Create from "./components/CREATE/Create";
import Update from "./components/UPDATE/Update";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Get />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
