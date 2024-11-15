import "./StripBar.scss";
import { LoremIpsum } from "lorem-ipsum";
import lady from "../../assets/shutterstock_1302552622.jpg";
import CustomButton from "../../components/CustomButton";
import useMobile from "../../Styling/useMobile";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 8,
  },
  wordsPerSentence: {
    max: 6,
    min: 6,
  },
});

const StripBar = () => {
  const isMobile = useMobile();

  return (
    <div className="stripBar">
      <img src={lady} alt="Lady background" className="stripBarBg" />

      <div className="stripBarContent">
        <div className="stripBarContentBg">
          <h1 className="stripBarText">{lorem.generateSentences(1)}</h1>
          <p className="stripBarText">{lorem.generateParagraphs(1)}</p>
          <CustomButton
            text={"Log in"}
            type={"white"}
            width={isMobile ? "full" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default StripBar;
