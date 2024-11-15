import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomField from "../../components/CustomField";
import CustomToggle from "../../components/CustomToggle";
import useAPI from "../../Context/ApiContext";
import "./ContactUsForm.scss";
import { useContactFormStore } from "./useContactFormStore";

const ContactUsForm = ({ completeForm }) => {
  const { submitContactUsForm } = useAPI();
  const [apiError, setApiError] = useState(false);

  const form = useContactFormStore((state) => state.form);
  const updateField = useContactFormStore((state) => state.updateField);
  const updateFieldGroup = useContactFormStore(
    (state) => state.updateFieldGroup
  );
  const emptyForm = useContactFormStore((state) => state.emptyForm);
  const setForm = useContactFormStore((state) => state.setForm);

  const handleFormSubmit = async () => {
    for (const fieldName in form) {
      const field = form[fieldName];
      if (
        (field.type === "field" && !field.optional && !field.value) ||
        field.error
      ) {
        return;
      }

      if (field.type === "fieldGroup" && !field.hidden) {
        for (const subfield of field.fields) {
          if ((!subfield.optional && !subfield.value) || subfield.error) {
            return;
          }
        }
      }
    }

    console.log("No errors, building body now");

    const requestBody = {
      FullName: form["Full name"].value,
      EmailAddress: form["Email address"].value,
      PhoneNumbers: form["Phone Numbers"].fields.map((field) => {
        return field.value;
      }),
      Message: form["Message"].value,
      bIncludeAddressDetails: form["Add address details"].active,
      AddressDetails: {
        AddressLine1: form["Address Block"].fields[0].value,
        AddressLine2: form["Address Block"].fields[1].value,
        CityTown: form["Address Block"].fields[2].value,
        StateCounty: form["Address Block"].fields[3].value,
        Postcode: form["Address Block"].fields[4].value,
        Country: form["Address Block"].fields[5].value,
      },
    };

    console.log("Request body", requestBody);

    const response = await submitContactUsForm(requestBody);

    console.log("Form submitted response", response);
    console.log("Form submitted status:", response.status);

    const errorMessages = {
      Required: "Need to supply a value",
      Invalid_Email_Address: "Email address is invalid",
      Invalid_Phone_Number:
        "Phone number is invalid. Cannot exceed 20 characters. If provided, a phone number value cannot be null or empty",
      Max_Length_Exceeded:
        "The message provided exceeds the maximum length allowed",
      Invalid_Postcode: " Not a valid UK postcode",
    };

    if (response.status < 200 || response.status > 299) {
      setApiError(true);

      const errors = response.response.data.Errors;

      const newForm = { ...form };
      errors.forEach((err) => {
        const fieldName = err.FieldName;
        const messageCode = err.MessageCode;

        switch (fieldName) {
          case "AddressDetails.AddressLine1":
            newForm["Address Block"].fields[0].error =
              errorMessages[messageCode];
            break;

          case "AddressDetails.AddressLine2":
            newForm["Address Block"].fields[1].error =
              errorMessages[messageCode];
            break;

          case "AddressDetails.CityTown":
            newForm["Address Block"].fields[2].error =
              errorMessages[messageCode];
            break;

          case "AddressDetails.StateCounty":
            newForm["Address Block"].fields[3].error =
              errorMessages[messageCode];
            break;

          case "AddressDetails.Postcode":
            newForm["Address Block"].fields[4].error =
              errorMessages[messageCode];
            break;

          case "AddressDetails.Country":
            newForm["Address Block"].fields[5].error =
              errorMessages[messageCode];
            break;

          case "Message":
            newForm["Message"].error = errorMessages[messageCode];
            break;

          case "EmailAddress":
            newForm["Email address"].error = errorMessages[messageCode];
            break;

          case "FullName":
            newForm["Full name"].error = errorMessages[messageCode];
            break;

          default:
            break;
        }

        if (fieldName.includes("PhoneNumbers")) {
          const index = parseInt(fieldName.split("[")[1]);
          newForm["Phone Numbers"].fields[index].error =
            errorMessages[messageCode];
        }
      });

      setForm(newForm);

      return;
    }

    setApiError(false);

    completeForm();
    emptyForm();
  };

  return (
    <form className="contactUsForm">
      {apiError && (
        <div className="submitApiError">
          There was an error submitting the form
        </div>
      )}
      {Object.keys(form).flatMap((fieldName, index) => {
        const field = form[fieldName];

        if (field.type === "field") {
          return (
            <CustomField
              title={fieldName}
              onChange={(value) => {
                updateField(fieldName, value, field.regex, field.optional);
              }}
              {...field}
              key={"SimpleField" + index}
            />
          );
        }

        if (field.type === "button") {
          return (
            <div className="customButtonWrapper">
              <CustomButton
                text={field.text}
                type={field.buttonType}
                width={"full"}
                onClick={(e) => {
                  e.preventDefault();
                  field.click();
                  if (field.submit) {
                    handleFormSubmit();
                  }
                }}
                icon={field.icon}
                key={"ButtonField" + index}
              />
            </div>
          );
        }

        if (field.type === "fieldGroup") {
          if (field.hidden) return null;

          return field.fields.map((subfield, subindex) => {
            return (
              <CustomField
                title={
                  subfield.fieldName || field.fieldName + ` 0${subindex + 1}`
                }
                onChange={(value) => {
                  updateFieldGroup(
                    fieldName,
                    subindex,
                    value,
                    subfield.regex,
                    subfield.optional
                  );
                }}
                {...subfield}
                key={"Subfield" + index + subindex}
              />
            );
          });
        }

        if (field.type === "toggle") {
          return (
            <CustomToggle
              text={field.text}
              active={field.active}
              onClick={(e) => {
                e.preventDefault();
                field.click();
              }}
              key={"ToggleField" + index}
            />
          );
        }

        return null;
      })}
    </form>
  );
};

export default ContactUsForm;
