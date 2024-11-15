import Spacer from "../../components/Spacer";
import { LoremIpsum } from "lorem-ipsum";
import "./AboutUs.scss";
import OfficeSpace from "../../assets/shutterstock_696636415.jpg";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 8,
  },
  wordsPerSentence: {
    max: 9,
    min: 8,
  },
});

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <Spacer space={70} />
      <h1>About us</h1>
      <Spacer space={30} />
      <p className="bolder">{lorem.generateSentences(2)}</p>
      <p>
        {lorem.generateParagraphs(1)}{" "}
        <span className="hyperlinked">{lorem.generateWords(5)},</span>{" "}
        {lorem.generateWords(5)}.
      </p>
      <Spacer space={20} />
      <p>{lorem.generateParagraphs(1)}</p>
      <Spacer space={30} />
      <div className="officeSpace">
        <img src={OfficeSpace} alt="Office Space" className="officeSpaceImg" />
      </div>
      <Spacer space={30} />
      <p>{lorem.generateParagraphs(1)}</p>
      <Spacer space={50} />
      <h2>{lorem.generateSentences(1)}</h2>
      <Spacer space={20} />
      <ul className="list">
        <li>{lorem.generateSentences(1)}</li>
        <li>{lorem.generateSentences(1)}</li>
        <li>{lorem.generateSentences(1)}</li>
        <li>{lorem.generateSentences(1)}</li>
      </ul>
      <Spacer space={20} />
      <p>{lorem.generateParagraphs(1)}</p>
      <Spacer space={20} />
      <p>{lorem.generateParagraphs(2)}</p>

      <Spacer space={70} />
    </div>
  );
};

export default AboutUs;
