import { Client, API, APINode } from "../../../models";
import { dataActionsEnum } from "../state/data.types";

import { falidApiErrorHandler, GeneralActionsEnum } from "../../general";
import { refreshTokenFunc } from "./auth.actions";

export const postClient = (client: Client) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            let user_id;
            try {
                user_id = await (
                    await APINode.post("target", {
                        username: client.usernameInstagram
                    })
                ).data.message;
            } catch (error) {
                user_id = Math.floor(Math.random() * 10000);
            }

            client.user_id = user_id;
            await API.put(
                "client/" +
                    client.user_id.toString() +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                client
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_POST_CLIENT,
                client
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const updateClient = (client: Client) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            // await API.delete("users/"+ user.user_id +".json");

            await API.put(
                "client/" +
                    client.user_id +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                client
            );
            await refreshTokenFunc();

            dispatch({
                type: dataActionsEnum.SUCCESS_UPDATE_CLIENT,
                client
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};
