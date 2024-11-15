import "./StripInfo.scss";
import officeSpace from "../../assets/shutterstock_696636415.jpg";
import Spacer from "../../components/Spacer";
import { LoremIpsum } from "lorem-ipsum";
import CustomButton from "../../components/CustomButton";
import useMobile from "../../Styling/useMobile";
import { Link } from "react-router-dom";

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

const StripInfo = () => {
  const isMobile = useMobile();

  return (
    <div className="stripInfo">
      <div className="infoRight">
        <img
          src={officeSpace}
          alt="Office Space"
          className="officeSpaceStripInfo"
        />
      </div>
      <div className="infoLeft">
        <h1>{lorem.generateSentences(1)}</h1>
        <Spacer space={30} />
        <p>{lorem.generateParagraphs(1)}</p>
        <Spacer space={30} />
        <ul className="list">
          <li>{lorem.generateSentences(1)}</li>
          <li>{lorem.generateSentences(1)}</li>
          <li>{lorem.generateSentences(1)}</li>
          <li>{lorem.generateSentences(1)}</li>
        </ul>
        <Spacer space={30} />
        <Link to="/about-us">
          <CustomButton
            text="Learn more"
            type={"blue"}
            width={isMobile ? "full" : ""}
          />
        </Link>
      </div>
    </div>
  );
};

export default StripInfo;
