import { Client, Email, User } from "../../../models";

export interface dataState {
    users: User[];
    emails: Email[];
    clients: Client[];

    dates: string[];
}

export enum dataActionsEnum {
    SUCCESS_GET_ALL_DATA = "SUCCESS_GET_ALL_DATA",

    SUCCESS_POST_BUSINESS_DETAILS = "SUCCESS_POST_BUSINESS_DETAILS",
    SUCCESS_POST_DATES = "SUCCESS_POST_EMPLOYEE_DATES",
    SUCCESS_DELETE_DATE = "SUCCESS_DELETE_DATE",

    SUCCESS_POST_USER = "SUCCESS_POST_USER",
    SUCCESS_UPDATE_USER = "SUCCESS_UPDATE_USER",
    SUCCESS_DELETE_USER = "SUCCESS_DELETE_USER",

    SUCCESS_POST_TARGET = "SUCCESS_POST_TARGET",
    SUCCESS_UPDATE_TARGET = "SUCCESS_UPDATE_TARGET",
    SUCCESS_DELETE_TARGET = "SUCCESS_DELETE_TARGET",

    SUCCESS_POST_CLIENT = "SUCCESS_POST_CLIENT",
    SUCCESS_UPDATE_CLIENT = "SUCCESS_UPDATE_CLIENT",

    SUCCESS_POST_EMAIL = "SUCCESS_POST_EMAIL",
    SUCCESS_UPDATE_EMAIL = "SUCCESS_UPDATE_EMAIL",
    SUCCESS_DELETE_EMAIL = "SUCCESS_DELETE_EMAIL",

    UPDATE_MATRIX = "UPDATE_MATRIX"
}

export interface dataActionPattern {
    type: dataActionsEnum;
}

export interface successGetAllDataActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_GET_ALL_DATA;
    users: User[];
    dates: string[];
    emails: Email[];
    clients: Client[];
}

export interface successPostDatesActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_POST_DATES;
    dates: string[];
    user_id: string;
}

//user
export interface successPostUserActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_POST_USER;
    user: User;
}

export interface successUpdateUserActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_UPDATE_USER;
    user: User;
}

export interface successDeleteUserActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_DELETE_USER;
    userId: any;
}

//Target
export interface successPostTargetActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_POST_TARGET;
    target: any;
    userId: any;
    index: any;
}

export interface successUpdateTargetActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_UPDATE_TARGET;
    target: any;
}

export interface successDeleteTargetActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_DELETE_TARGET;
    userId: any;
}

export interface successDeleteDateActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_DELETE_DATE;
    user_id: string;
    date: string;
}
//Client
export interface successPostClientActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_POST_CLIENT;
    client: Client;
}

export interface successUpdateClientActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_UPDATE_CLIENT;
    client: Client;
}

//email
export interface successPostEmailActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_POST_EMAIL;
    email: Email;
}

export interface successUpdateEmailActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_UPDATE_EMAIL;
    email: Email;
    addressOriginal: string;
}

export interface successDeleteEmailActionType extends dataActionPattern {
    type: dataActionsEnum.SUCCESS_DELETE_EMAIL;
    userId: string;
}
