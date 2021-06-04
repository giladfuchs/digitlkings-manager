import { GeneralState } from "./general.types";

export const initialGeneralState: GeneralState = {
    error: "",
    loading: false,
    isTokenSet: false,
    language:
        localStorage.getItem("language") === "1"
            ? 1
            : localStorage.getItem("language") === "2"
            ? 2
            : 0
};
