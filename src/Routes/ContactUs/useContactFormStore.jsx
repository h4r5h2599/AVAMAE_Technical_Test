import { create } from "zustand";
import { ReactComponent as Submit } from "../../assets/Icon_Submit.svg";

const phoneNumberField = {
  type: "field",
  size: 4,
  optional: true,
  bonusInfo: "",
  error: null,
  row: 1,
  value: "",
  regex: /^[0-9\s]+$/,
};

export const useContactFormStore = create((set, get) => ({
  form: {
    "Full name": {
      type: "field",
      size: 2,
      optional: false,
      bonusInfo: "",
      error: null,
      row: 1,
      value: "",
      regex: /^[a-zA-Z\s]+$/,
    },
    "Email address": {
      type: "field",
      size: 2,
      optional: false,
      bonusInfo: "",
      error: null,
      row: 1,
      value: "",
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    "Phone Numbers": {
      type: "fieldGroup",
      fieldName: "Phone Number",
      hidden: false,
      fields: [],
    },
    "Add new phone number": {
      type: "button",
      text: "Add new phone number",
      buttonType: "light",
      click: () => {
        get().addPhoneNumber();
      },
    },
    Message: {
      type: "field",
      size: 4,
      optional: false,
      bonusInfo: "Maximum text length is 500 characters",
      error: null,
      row: 1,
      value: "",
      block: true,
    },
    "Add address details": {
      type: "toggle",
      text: "Add address details",
      active: false,
      click: () => {
        get().toggleAddressBlock();
      },
    },
    "Address Block": {
      type: "fieldGroup",
      fieldName: "Address",
      hidden: true,
      fields: [
        {
          type: "field",
          fieldName: "Address line 1",
          size: 2,
          optional: false,
          bonusInfo: "",
          error: null,
          row: 1,
          value: "",
        },
        {
          type: "field",
          fieldName: "Address line 2",
          size: 2,
          optional: true,
          bonusInfo: "",
          error: null,
          row: 1,
          value: "",
        },
        {
          type: "field",
          fieldName: "City/Town",
          size: 1,
          optional: false,
          bonusInfo: "",
          error: null,
          row: 1,
          value: "",
        },
        {
          type: "field",
          fieldName: "State/County",
          size: 1,
          optional: false,
          bonusInfo: "",
          error: null,
          row: 1,
          value: "",
        },
        {
          type: "field",
          fieldName: "Postcode",
          size: 1,
          optional: false,
          bonusInfo: "",
          error: null,
          row: 1,
          value: "",
        },
        {
          type: "field",
          fieldName: "Country",
          size: 1,
          optional: false,
          bonusInfo: "",
          error: null,
          row: 1,
          value: "",
        },
      ],
    },
    Submit: {
      type: "button",
      text: "Submit",
      buttonType: "blue",
      submit: true,
      icon: <Submit height={20} />,
      click: () => {},
    },
  },
  addPhoneNumber: () => {
    set((state) => {
      return {
        form: {
          ...state.form,
          "Phone Numbers": {
            ...state.form["Phone Numbers"],
            fields: [
              ...state.form["Phone Numbers"].fields,
              structuredClone(phoneNumberField),
            ],
          },
        },
      };
    });
  },
  updateField: (fieldName, value, regex, optional) => {
    let error = null;
    if (regex && !regex.test(value)) {
      error = "Invalid input";
    }

    if (optional && value === "") {
      error = null;
    }

    set((state) => {
      return {
        form: {
          ...state.form,
          [fieldName]: {
            ...state.form[fieldName],
            value,
            error,
          },
        },
      };
    });
  },
  updateFieldGroup: (fieldName, index, value, regex, optional) => {
    let error = null;
    if (regex && !regex.test(value)) {
      error = "Invalid input";
    }

    if (optional && value === "") {
      error = null;
    }

    set((state) => {
      return {
        form: {
          ...state.form,
          [fieldName]: {
            ...state.form[fieldName],
            fields: state.form[fieldName].fields.map((field, i) => {
              if (i === index) {
                return {
                  ...field,
                  value,
                  error,
                };
              }

              return field;
            }),
          },
        },
      };
    });
  },
  toggleAddressBlock: () => {
    set((state) => {
      return {
        form: {
          ...state.form,
          "Address Block": {
            ...state.form["Address Block"],
            hidden: !state.form["Address Block"].hidden,
          },
          "Add address details": {
            ...state.form["Add address details"],
            active: !state.form["Add address details"].active,
          },
        },
      };
    });
  },
  emptyForm: () => {
    set((state) => {
      const newForm = { ...state.form };

      for (const fieldName in newForm) {
        const field = newForm[fieldName];

        if (field.type === "field") {
          field.value = "";
        }

        if (field.type === "fieldGroup") {
          for (const subField of field.fields) {
            subField.value = "";
          }
        }
      }

      newForm["Add address details"].active = false;
      newForm["Address Block"].hidden = true;
      newForm["Phone Numbers"].fields = [];

      return newForm;
    });
  },
  setForm: (newForm) => {
    set((state) => {
      return {
        form: newForm,
      };
    });
  },
}));
