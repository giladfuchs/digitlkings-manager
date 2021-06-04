import { User, API } from "../../../models";
import { dataActionsEnum } from "../state/data.types";

import { falidApiErrorHandler, GeneralActionsEnum } from "../../general";
import { refreshTokenFunc } from "./auth.actions";

export const postUser = (user: User) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            await API.put(
                "users/" +
                    user.user_id.toString() +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                user
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_POST_USER,
                user
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const updateUser = (user: User) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            // await API.delete("users/"+ user.user_id +".json");

            await API.put(
                "users/" +
                    user.user_id +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                user
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_UPDATE_USER,
                user: user
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const deleteUser = (user: User) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });

            await API.delete(
                "users/" +
                    user.user_id +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );
            await API.delete(
                "date/" +
                    user.user_id +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_DELETE_USER,
                userId: user.usernameInstagram
            });
            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
