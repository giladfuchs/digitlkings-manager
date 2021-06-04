import * as actions from "../state/general.types";
import { updateObject } from "../../../assets/utility/utility";

export const start = (state: actions.GeneralState) => {
    return updateObject(state, {
        loading: true,
        error: ""
    });
};

export const faild = (
    state: actions.GeneralState,
    action: actions.faildUserActionType | actions.faildAuthActionType
) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};
export const successAction = (state: actions.GeneralState) => {
    return updateObject(state, {
        ...success()
    });
};

export const successLogout = (state: actions.GeneralState) => {
    return updateObject(state, {
        isTokenSet: false
    });
};

export const successSetToken = (state: actions.GeneralState) => {
    return updateObject(state, {
        isTokenSet: true
    });
};

export const setLanguage = (
    state: actions.GeneralState,
    action: actions.setLanguageActionType
) => {
    const language = parseInt(action.language);
    return updateObject(state, {
        language
    });
};

const success = () => ({
    loading: false,
    error: ""
});
