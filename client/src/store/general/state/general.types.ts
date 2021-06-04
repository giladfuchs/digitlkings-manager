export interface GeneralState {
    error: string;
    loading: boolean;
    isTokenSet: boolean;
    language: number;
}

export enum GeneralActionsEnum {
    START_API = "START_API",
    START_AUTH = "START_AUTH",
    SUCCESS_AUTH = "SUCCESS_AUTH",
    SUCCESS_API = "SUCCESS_API",
    FALID_AUTH = "FALID_AUTH",
    FALID_API = "FALID_API",
    LOGOUT = "LOGOUT",
    SUCCESS_SET_TOKEN = "SUCCESS_SET_TOKEN",
    SET_LANGUAGE = "SET_LANGUAGE"
}

interface GeneralActionPattern {
    type: GeneralActionsEnum;
}

//start
export interface startServiceActionType extends GeneralActionPattern {
    type: GeneralActionsEnum.START_API;
}
export interface startAuthActionType extends GeneralActionPattern {
    type: GeneralActionsEnum.START_AUTH;
}

//success
export interface successUserActionType extends GeneralActionPattern {
    type: GeneralActionsEnum.SUCCESS_API;
}
export interface successAuthctionType extends GeneralActionPattern {
    type: GeneralActionsEnum.SUCCESS_AUTH;
}

//faild
interface error extends GeneralActionPattern {
    error: string;
}
export interface faildAuthActionType extends error {
    type: GeneralActionsEnum.FALID_AUTH;
}
export interface faildUserActionType extends error {
    type: GeneralActionsEnum.FALID_API;
}

//other login logout

export interface logoutActionType extends GeneralActionPattern {
    type: GeneralActionsEnum.LOGOUT;
}

export interface successSetTokenActionType extends GeneralActionPattern {
    type: GeneralActionsEnum.SUCCESS_SET_TOKEN;
}

export interface setLanguageActionType extends GeneralActionPattern {
    type: GeneralActionsEnum.SET_LANGUAGE;
    language: string;
}
