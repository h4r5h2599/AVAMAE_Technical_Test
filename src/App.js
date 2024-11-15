import AboutUs from "./Routes/AboutUs/AboutUs";
import Home from "./Routes/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteErrorPage from "./Routes/RouteErrorPage";
import ContactUs from "./Routes/ContactUs/ContactUs";
import AppWrapper from "./Layout/AppWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper elem={<Home />} />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: "/about-us",
    element: <AppWrapper elem={<AboutUs />} />,
  },
  {
    path: "/contact-us",
    element: <AppWrapper elem={<ContactUs />} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
