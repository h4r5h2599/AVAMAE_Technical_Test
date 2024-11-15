import "./CustomToggle.scss";

const CustomToggle = ({ active, text, onClick, ...rest }) => {
  return (
    <div className="CTBox" {...rest}>
      <div
        className={`CTActiveBox ${active ? "isActive" : ""}`}
        onClick={onClick}
      >
        {active && <div className="activeBox"></div>}
      </div>
      <div className="CTText">{text}</div>
    </div>
  );
};

export default CustomToggle;
