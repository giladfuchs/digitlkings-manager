import { dataActionsEnum } from "../state/data.types";
import { API } from "../../../models";
import { GeneralActionsEnum, falidApiErrorHandler } from "../../general";
import moment from "moment";
import { refreshTokenFunc } from "./auth.actions";

// Put and Post

export const postNewDates = (user_id: any, dates: string[]) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            dates.forEach(async (date) => {
                await API.put(
                    "date/" +
                        user_id +
                        "/" +
                        date +
                        ".json?auth=" +
                        localStorage.getItem("token"),
                    { date }
                );
            });
            await refreshTokenFunc();

            const datesStr = dates.map((date) => date.toString().slice(0, 22));

            dispatch({
                type: dataActionsEnum.SUCCESS_POST_DATES,
                user_id,
                dates: datesStr
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            console.log(error);

            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const updateDate = (
    dateOld: string,
    user_id: string,
    dateNew: string
) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });

            await API.delete(
                "date/" +
                    user_id +
                    "/" +
                    dateOld +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );
            await API.put(
                "date/" +
                    user_id +
                    "/" +
                    dateNew +
                    ".json?auth=" +
                    localStorage.getItem("token"),
                { date: dateNew }
            );
            await refreshTokenFunc();

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const deleteDate = (date: string, user_id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });

            await API.delete(
                "date/" +
                    user_id +
                    "/" +
                    date +
                    ".json?auth=" +
                    localStorage.getItem("token")
            );

            dispatch({
                type: dataActionsEnum.SUCCESS_DELETE_DATE,
                user_id,
                date
            });
            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            falidApiErrorHandler(dispatch, error);
        }
    };
};

export const getDate = (service: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_API });
            // const res = await API.post("admin/"+ service +".json", data);
            const res = await API.get("date/" + service + ".json");

            dispatch({
                type: dataActionsEnum.SUCCESS_POST_USER,
                service: service
            });

            dispatch({ type: GeneralActionsEnum.SUCCESS_API });
            return;
        } catch (error) {
            console.log(error);

            falidApiErrorHandler(dispatch, error);
        }
    };
};
