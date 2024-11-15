import Spacer from "../../components/Spacer";
import "./ContactUs.scss";
import logo from "../../assets/Img_Contact.png";
import ContactUsForm from "./ContactUsForm";
import { useState } from "react";
import FormSubmitted from "./FormSubmitted";

const ContactUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const completeForm = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="contactUs">
      <div className="contactUsFormSection">
        <Spacer space={70} />
        <h1>Contact us</h1>
        <Spacer space={30} />
        <p className="bolder">
          Ea laborum nisi dolor anim sit pariatur est excepteur. Aute laborum
          adipisicing duis veniam laborum in quis.
        </p>
        <Spacer space={30} />

        {formSubmitted ? (
          <FormSubmitted />
        ) : (
          <ContactUsForm completeForm={completeForm} />
        )}

        <Spacer space={70} />
      </div>
      <div className="contactUsLogo">
        <img src={logo} alt="Company Logo" className="contactUsLogoImg" />
      </div>
    </div>
  );
};

export default ContactUs;
