import "./CustomField.scss";

const CustomField = ({
  size,
  optional,
  title,
  bonusInfo,
  error,
  block,
  value,
  onChange,
  ...rest
}) => {
  const sizes = {
    1: "CFQuarter",
    2: "CFHalf",
    4: "CFFull",
  };

  return (
    <div className={`CFBox ${sizes[size] || "CFFull"}`} {...rest}>
      <div className="CF">
        <div className="CFTitleRow">
          <div className="CFTitle">
            {title}
            {optional && <span className="CFOptional"> - optional</span>}
          </div>
          <div className="CFBonusInfo">{bonusInfo}</div>
        </div>
        <div className="CFErrorRow">{error}</div>
        {block ? (
          <textarea
            className={`CFInput CFBlock ${error ? "CFFieldError" : ""}`}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        ) : (
          <input
            className={`CFInput  ${error ? "CFFieldError" : ""}`}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomField;
