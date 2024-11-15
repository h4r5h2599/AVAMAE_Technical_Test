import { Link } from "react-router-dom";
import "./StripColumns.scss";
import { LoremIpsum } from "lorem-ipsum";
import CustomButton from "../../components/CustomButton";

const smallLorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 12,
    min: 8,
  },
  wordsPerSentence: {
    max: 6,
    min: 6,
  },
});

const largeLorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 20,
    min: 18,
  },
  wordsPerSentence: {
    max: 6,
    min: 6,
  },
});

const StripColumns = () => {
  return (
    <div className="stripColumns">
      <h1>{largeLorem.generateSentences(1)}</h1>
      <h2>{largeLorem.generateSentences(1)}</h2>
      <div className="stripColumnsCols">
        <p>
          <strong>{smallLorem.generateParagraphs(1)}</strong>
        </p>
        <br />
        <p>{largeLorem.generateParagraphs(1)}</p>
        <br />
        <p>{largeLorem.generateParagraphs(1)}</p>
      </div>
      <Link to={"/contact-us"}>
        <CustomButton text={"Contact us"} type={"blue"} />
      </Link>
    </div>
  );
};

export default StripColumns;