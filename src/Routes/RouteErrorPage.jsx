import { Link } from "react-router-dom";

const RouteErrorPage = () => {
  return (
    <div className="App">
      This route does not exist
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default RouteErrorPage;
