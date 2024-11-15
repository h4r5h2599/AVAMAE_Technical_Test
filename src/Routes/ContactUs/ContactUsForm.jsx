import CustomButton from "../../components/CustomButton";
import CustomField from "../../components/CustomField";
import CustomToggle from "../../components/CustomToggle";
import "./ContactUsForm.scss";
import { useContactFormStore } from "./useContactFormStore";

const ContactUsForm = ({ completeForm }) => {
  const form = useContactFormStore((state) => state.form);
  const updateField = useContactFormStore((state) => state.updateField);
  const updateFieldGroup = useContactFormStore(
    (state) => state.updateFieldGroup
  );
  const emptyForm = useContactFormStore((state) => state.emptyForm);

  const handleFormSubmit = () => {
    for (const fieldName in form) {
      const field = form[fieldName];
      if (field.type === "field" && !field.optional && !field.value) {
        console.log("Returning on field", fieldName);
        return;
      }

      if (field.type === "fieldGroup" && !field.hidden) {
        for (const subfield of field.fields) {
          if (!subfield.optional && !subfield.value) {
            console.log("Returning on subfield", subfield.fieldName);
            return;
          }
        }
      }
    }

    completeForm();
    emptyForm();
  };

  return (
    <form className="contactUsForm">
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
