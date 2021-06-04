import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successPostUser = (
    state: actions.dataState,
    action: actions.successPostUserActionType
) => {
    const users = [...state.users].filter((s) => s !== undefined);

    users.push(action.user);
    return updateObject(state, {
        users
    });
};

export const successUpadateUser = (
    state: actions.dataState,
    action: actions.successUpdateUserActionType
) => {
    const updateServices = [...state.users].filter(
        (s) => s.user_id !== action.user.user_id
    );
    updateServices.push(action.user);

    return updateObject(state, {
        users: updateServices
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
