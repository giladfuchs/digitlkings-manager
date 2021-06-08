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

    clients[index].payments.push(action.payment);
    return updateObject(state, {
        clients
    });
};

export const successUpadatePayment = (
    state: actions.dataState,
    action: actions.successUpdatePaymentActionType
) => {
    const clients = [...state.clients].filter((s) => s !== undefined);
    const index = clients.findIndex(
        (client) => client.user_id === action.user_id
    );

    clients[index].payments[action.index] = action.payment;

    return updateObject(state, {
        clients
    });
};

export const successDeletePayment = (
    state: actions.dataState,
    action: actions.successDeletePaymentActionType
) => {
    const clients = [...state.clients].filter((s) => s !== undefined);
    const index = clients.findIndex(
        (client) => client.user_id === action.user_id
    );
    console.log(action, index);

    clients[index].payments = action.payments;
    return updateObject(state, {
        clients
    });
};
