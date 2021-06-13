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
            let user_id = await (
                await APINode.post("target", { username: target })
            ).data.message;
            console.log(user_id);
            if (typeof user_id === "object") user_id = user_id[0];
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

export const deleteTarget = (target: string, user_id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });

            await API.delete(
                "client/" +
                    user_id +
                    "/targets/" +
                    target +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );
            await refreshTokenFunc();
            console.log(target, user_id);

            // dispatch({
            //     type: dataActionsEnum.SUCCESS_DELETE_DATE,
            //     user_id,
            //     date: target
            // });
            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
