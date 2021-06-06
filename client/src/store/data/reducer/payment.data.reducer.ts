import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successPostPayment = (
    state: actions.dataState,
    action: actions.successPostPaymentActionType
) => {
    const clients = [...state.clients].filter((s) => s !== undefined);
    const index = clients.findIndex(
        (client) => client.user_id === action.user_id
    );
    console.log(action, index);

    clients[index].payments.push(action.payment);
    return updateObject(state, {
        clients
    });
};

export const successUpadatePayment = (
    state: actions.dataState,
    action: actions.successUpdatePaymentActionType
) => {
    const clients = [...state.clients].filter(
        (s) => s.user_id !== action.user_id
    );
    // clients.push(action.client);

    return updateObject(state, {
        clients
    });
};

export const successDeletePayment = (
    state: actions.dataState,
    action: actions.successDeletePaymentActionType
) => {
    return updateObject(state, {
        users: state.users.filter((s) => s.usernameInstagram !== action.userId)
    });
};
