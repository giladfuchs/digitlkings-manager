import { Client, APINode, API } from "../../../models";
import { dataActionsEnum } from "../state/data.types";

import { falidApiErrorHandler, GeneralActionsEnum } from "../../general";
import { refreshTokenFunc } from "./auth.actions";

export const postTarget = (
    client_user_id: any,
    target: string,
    index: number
) => {
    return async (dispatch: any) => {
        try {
            // const num = Math.floor(Math.random() * 10000).toString();
            const user_id = await (
                await APINode.post("target", { username: target })
            ).data.message;
            console.log(user_id);

            // const a = {}
            // a[num] = target
            dispatch({ type: GeneralActionsEnum.START_API });
            await API.put(
                "client/" +
                    client_user_id.toString() +
                    "/targets/" +
                    user_id +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                { [user_id]: target }
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_POST_TARGET,
                target: { [user_id]: { [user_id]: target } },
                userId: client_user_id,
                index
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const addTargetsWithApi = (client_user_id: any, targets: [number]) => {
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
