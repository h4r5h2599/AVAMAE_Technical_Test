import "./CustomButton.scss";

const CustomButton = ({ text, type, width, icon, ...rest }) => {
  const types = {
    light: "customLight",
    blue: "customBlue",
    white: "customWhite",
  };

  return (
    <button
      className={`customButton ${types[type] || "customBlue"} ${
        width === "full" ? "customMaxWidth" : "custom150Width"
      }`}
      {...rest}
    >
      <div className="CBIcon">{icon}</div>
      {text}
    </button>
  );
};

export default CustomButton;
