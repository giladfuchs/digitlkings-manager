import { API, Payment } from "../../../models";
import { dataActionsEnum } from "../state/data.types";

import { falidApiErrorHandler, GeneralActionsEnum } from "../../general";
import { refreshTokenFunc } from "./auth.actions";

export const postPayment = (
    client_user_id: number | string,
    payment: Payment,
    len: number
) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            await API.put(
                "client/" +
                    client_user_id.toString() +
                    "/payments/" +
                    len +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                payment
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_POST_PAYMENT,
                payment,
                user_id: client_user_id
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
export const updatePayment = (
    client_user_id: string,
    payment: Payment,
    index: number
) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            await API.put(
                "client/" +
                    client_user_id.toString() +
                    "/payments/" +
                    index +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                payment
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_UPDATE_PAYMENT,
                payment,
                user_id: client_user_id,
                index
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
export const deletePayment = (client_user_id: string, payments: Payment[]) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            await API.put(
                "client/" +
                    client_user_id.toString() +
                    "/payments.json?auth=" +
                    localStorage.getItem("token"),
                payments
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_DELETE_PAYMENT,
                payments,
                user_id: client_user_id
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
