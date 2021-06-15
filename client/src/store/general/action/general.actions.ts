import { dataActionsEnum } from "../../data/state/data.types";
import { GeneralActionsEnum } from "../state/general.types";
import { API } from "../../../models/axios/axios";

import { falidAuthErrorHandler } from "./index.actions";

export const checkLanguage = () => {
    const language = localStorage.getItem("language");
    return async (dispatch: any) => {
        return dispatch({
            type: GeneralActionsEnum.SET_LANGUAGE,
            language: typeof language === "string" ? parseInt(language) : 0
        });
    };
    // language && setLanguage(parseInt(language));
};

export const setLanguage = (language: number) => {
    try {
        const strlanguage = language.toString();
        localStorage.setItem("language", strlanguage);
        return (dispatch: any) => {
            return dispatch({
                type: GeneralActionsEnum.SET_LANGUAGE,
                language
            });
        };
    } catch (error) {
        console.log(error);
    }
};

export const LoginCheck = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    return async (dispatch: any) => {
        dispatch({
            type: GeneralActionsEnum.START_AUTH
        });
        try {
            const res = await API.get(".json?auth=" + token);

            const emailsApi = res.data["emails"];
            const datePath = "date";
            const dates = Object.assign(
                {},
                Object.keys(res.data[datePath]).reduce(
                    (obj, cell: any) => (
                        (obj[cell] = Object.keys(res.data[datePath][cell])
                            .map((k) => res.data[datePath][cell][k]["date"])
                            .sort()),
                        obj
                    ),
                    {}
                )
            );

            const users = Object.keys(res.data["users"]).map(
                (user) => res.data["users"][user]
            );

            const clients = Object.keys(res.data["client"])
                .map((client) => res.data["client"][client])
                .sort((a, b) => {
                    if (a.permanence !== b.permanence)
                        return a.permanence ? -1 : 1;
                    return (
                        a.payments[a.payments.length - 1]["date"] -
                        b.payments[b.payments.length - 1]["date"]
                    );
                });
            const emails = Object.keys(emailsApi).map(
                (email) => emailsApi[email]
            );

            dispatch({
                type: dataActionsEnum.SUCCESS_GET_ALL_DATA,
                users: users,
                dates: dates,
                emails: emails,
                clients: clients
            });
            dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });

            return;
        } catch (error) {
            falidAuthErrorHandler(dispatch, error);
        }
    };
};

//  changeDateToString(res.data)
// console.log(res.data['users']);
// const userss = res.data['users'];
// const bb = Object.keys(userss).map((key:string) => {
// return {[key]: {...userss[key], 'user_id': Math.floor(Math.random() * 1000000)}}

//  const addId = Object.keys(userss).reduce((obj, cell: any) => {
//    const user_id = Math.floor(Math.random() * 1000000);
//    return obj[user_id] =
//   {...userss[cell], 'user_id': user_id, 'realUser': "no Name"},obj}, {})
//  const bb = Object.keys(userss).reduce((obj, cell: any) => {
//    const realUser = "no Name";
//    return obj[cell] =
//   {...userss[cell], 'realUser': realUser},obj}, {})
//   const res1 = await API.put('/users.json?auth=' + token, addId);

// console.log(addId);
// const usersa =users.filter(user => ( user.realUser !=="need" &&  user.realUser !=="" )).map(user => user.realUser);
// console.log(usersa);
