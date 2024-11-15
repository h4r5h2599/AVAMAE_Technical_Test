import "./Spacer.scss";

const Spacer = ({ space }) => {
  return <div style={{ "--space": `${space}px` }} className="spacer"></div>;
};

export default Spacer;
