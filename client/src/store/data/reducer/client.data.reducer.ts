import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successPostClient = (
    state: actions.dataState,
    action: actions.successPostClientActionType
) => {
    const clients = [...state.clients].filter((s) => s !== undefined);

    clients.push(action.client);
    return updateObject(state, {
        clients
    });
};

export const successUpadateClient = (
    state: actions.dataState,
    action: actions.successUpdateClientActionType
) => {
    const clients = [...state.clients].filter(
        (s) => s.user_id !== action.client.user_id
    );
    clients.push(action.client);

    return updateObject(state, {
        clients
    });
};

export const successDeleteUser = (
    state: actions.dataState,
    action: actions.successDeleteUserActionType
) => {
    return updateObject(state, {
        users: state.users.filter((s) => s.usernameInstagram !== action.userId)
    });
};
