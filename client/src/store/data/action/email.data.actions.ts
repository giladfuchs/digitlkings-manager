import { Email, API } from "../../../models";
import { dataActionsEnum } from "../state/data.types";

import { falidApiErrorHandler, GeneralActionsEnum } from "../../general";
import { refreshTokenFunc } from "../../data";

export const postEmail = (email: Email, addressOriginal) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            const res = await API.put(
                "emails/" +
                    email.address.split("@")[0] +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                email
            );
            await refreshTokenFunc();
            dispatch({
                type: dataActionsEnum.SUCCESS_POST_EMAIL,
                email: email
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const updateEmail = (email: Email, addressOriginal) => {
    return async (dispatch: any) => {
        try {
            await refreshTokenFunc();

            dispatch({ type: GeneralActionsEnum.START_API });
            await API.delete(
                "emails/" +
                    addressOriginal.split("@")[0] +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );

            const res = await API.put(
                "emails/" +
                    email.address.split("@")[0] +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                email
            );

            dispatch({
                type: dataActionsEnum.SUCCESS_UPDATE_EMAIL,
                email: email,
                addressOriginal: addressOriginal
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const deleteEmail = (email: Email) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            await API.delete(
                "emails/" +
                    email.address.split("@")[0] +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );

            dispatch({
                type: dataActionsEnum.SUCCESS_DELETE_EMAIL,
                userId: email.address
            });
            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
