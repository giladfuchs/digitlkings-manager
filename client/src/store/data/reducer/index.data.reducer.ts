import { successAddTarget } from "./target.data.reducer";
import {
    successPostUser,
    successUpadateUser,
    successDeleteUser
} from "./user.data.reducer";
import { successPostClient, successUpadateClient } from "./client.data.reducer";
import {
    successPostPayment,
    successUpadatePayment,
    successDeletePayment
} from "./payment.data.reducer";
import {
    successPostEmail,
    successUpadateEmail,
    successDeleteEmail
} from "./email.data.reducer";
import { initialDataState } from "../state/data.state";

import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";
import { successAddDates, successDeleteDate } from "./schedule.data.reducer";
type allDataActionTypes =
    | actions.successPostUserActionType
    | actions.successUpdateUserActionType
    | actions.successPostClientActionType
    | actions.successUpdateClientActionType
    | actions.successGetAllDataActionType
    | actions.successDeleteUserActionType
    | actions.successPostEmailActionType
    | actions.successUpdateEmailActionType
    | actions.successDeleteEmailActionType
    | actions.successPostTargetActionType
    | actions.successPostDatesActionType
    | actions.successDeleteDateActionType
    | actions.successPostPaymentActionType
    | actions.successUpdatePaymentActionType
    | actions.successDeletePaymentActionType;

const successGetAllData = (
    state: actions.dataState,
    action: actions.successGetAllDataActionType
) => {
    return updateObject(state, {
        users: action.users,
        dates: action.dates,
        emails: action.emails,
        clients: action.clients
    });
};

export const dataReducer = (
    state = initialDataState,
    action: allDataActionTypes
) => {
    switch (action.type) {
        case actions.dataActionsEnum.SUCCESS_GET_ALL_DATA:
            return successGetAllData(state, action);

        //employe scheduale
        case actions.dataActionsEnum.SUCCESS_POST_DATES:
            return successAddDates(state, action);
        case actions.dataActionsEnum.SUCCESS_DELETE_DATE:
            return successDeleteDate(state, action);

        //target
        case actions.dataActionsEnum.SUCCESS_POST_TARGET:
            return successAddTarget(state, action);

        //user
        case actions.dataActionsEnum.SUCCESS_POST_USER:
            return successPostUser(state, action);

        case actions.dataActionsEnum.SUCCESS_UPDATE_USER:
            return successUpadateUser(state, action);

        case actions.dataActionsEnum.SUCCESS_DELETE_USER:
            return successDeleteUser(state, action);

        //client
        case actions.dataActionsEnum.SUCCESS_POST_CLIENT:
            return successPostClient(state, action);

        case actions.dataActionsEnum.SUCCESS_UPDATE_CLIENT:
            return successUpadateClient(state, action);
        //email
        case actions.dataActionsEnum.SUCCESS_POST_EMAIL:
            return successPostEmail(state, action);

        case actions.dataActionsEnum.SUCCESS_UPDATE_EMAIL:
            return successUpadateEmail(state, action);

        case actions.dataActionsEnum.SUCCESS_DELETE_EMAIL:
            return successDeleteEmail(state, action);
        //payment
        case actions.dataActionsEnum.SUCCESS_POST_PAYMENT:
            return successPostPayment(state, action);

        case actions.dataActionsEnum.SUCCESS_UPDATE_PAYMENT:
            return successUpadatePayment(state, action);

        case actions.dataActionsEnum.SUCCESS_DELETE_PAYMENT:
            return successDeletePayment(state, action);

        default:
            return state;
    }
};
