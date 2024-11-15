import "./Header.scss";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const Header = () => {
  const routes = [
    {
      name: "HOME",
      route: "/",
    },
    {
      name: "ABOUT US",
      route: "/about-us",
    },
    {
      name: "CONTACT US",
      route: "/contact-us",
    },
  ];

  return (
    <div className="header">
      <Logo height={30} />

      <div className="headerRoutes">
        {routes.map((route) => {
          return (
            <Link className="headerRoute" to={route.route}>
              {route.name}
            </Link>
          );
        })}
        <CustomButton text="Log in" type={"light"} />
      </div>
    </div>
  );
};

export default Header;
