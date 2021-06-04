import { APINode, API, Payment } from "../../../models";
import { dataActionsEnum } from "../state/data.types";

import { falidApiErrorHandler, GeneralActionsEnum } from "../../general";
import { refreshTokenFunc } from "./auth.actions";

export const postPayment = (
    client_user_id: number | string,
    payment: Payment,
    len: number,
    index: number
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

            // dispatch({
            //     type: dataActionsEnum.SUCCESS_POST_TARGET,
            //     target: { [user_id]: { [user_id]: target } },
            //     userId: client_user_id,
            //     index
            // });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const pay = (client_user_id: any, targets: [number]) => {
    return async (dispatch: any) => {
        try {
            // const num = Math.floor(Math.random() * 10000).toString();

            console.log(client_user_id, targets);

            const user_id = await (
                await APINode.post("target/add", {
                    user_id: client_user_id,
                    targets
                })
            ).data.message;
            console.log(user_id);

            // const a = {}
            // a[num] = target
            dispatch({ type: GeneralActionsEnum.START_API });

            await refreshTokenFunc();

            // dispatch({
            //     type: dataActionsEnum.SUCCESS_POST_TARGET,
            //     target: { [user_id]: { [user_id]: targets } },
            //     userId: client_user_id,
            //     index: 1
            // });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
