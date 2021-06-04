import * as language from "../../../../assets/language/language";
import { InputField } from "../../../system/input.field";

export const password: InputField = {
    elementType: "input",
    type: "password",

    id: "new-password",

    value: "",
    label: language.password[0],
    name: language.password[0],
    validation: {
        required: true,
        minLen: 6
    },
    valid: false,
    touched: false,
    error: "",
    editable: true,
    class: "border"
};

export const phone: InputField = {
    elementType: "input",
    type: "number",

    id: "tel-local",

    value: "",
    label: language.phone[0],
    name: language.phone[0],
    validation: {
        required: true,
        isPhone: true
    },
    valid: false,
    touched: false,
    error: "",
    editable: true,
    class: "border"
};

export const plainText: InputField = {
    elementType: "input",
    type: "text",

    id: "text",

    value: "",
    label: "",
    name: "",
    validation: {
        required: true,
        minLen: 2
    },
    valid: false,
    touched: false,
    error: "",
    class: "border",
    editable: true
};

export const email: InputField = {
    elementType: "input",
    type: "text",

    id: "email",

    value: "",
    label: language.email[0],
    name: language.email[0],
    validation: {
        required: true,
        isEmail: true
    },
    valid: false,
    touched: false,
    error: "",
    class: "border",
    editable: true
};
