import "./FormSubmitted.scss";
import { ReactComponent as Tick } from "../../assets/Icon_Valid.svg";

const FormSubmitted = () => {
  return (
    <div className="formSubmitted">
      <div className="submittedTick">
        <Tick height={30} width={30} />
      </div>
      <h2>Your message has been sent</h2>
      <p>We will be in contact with you within 24 hours.</p>
    </div>
  );
};

export default FormSubmitted;
