import Footer from "./Footer";
import Header from "./Header";
import "./AppWrapper.scss";

const AppWrapper = ({ elem }) => {
  return (
    <div className="app">
      <Header />
      <div className="page">{elem}</div>
      <Footer />
    </div>
  );
};

export default AppWrapper;
