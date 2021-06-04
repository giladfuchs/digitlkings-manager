import { Dispatch } from "react";
import axios from "axios";
import {
    GeneralActionsEnum,
    startAuthActionType,
    successAuthctionType,
    falidAuthErrorHandler
} from "../../general";
import { API, digitalKingsKey } from "../../../models";

export const refreshTokenFunc = async () => {
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    const refreshTokenReq = localStorage.getItem("refreshToken");
    const data = "grant_type=refresh_token&refresh_token=" + refreshTokenReq;

    try {
        const res = await axios.post(
            "https://securetoken.googleapis.com/v1/token?key=" +
                digitalKingsKey,
            data,
            config
        );

        const token = res.data["idToken"]
            ? res.data["idToken"]
            : res.data["id_token"];
        const refreshTokenRes = res.data["refreshToken"]
            ? res.data["refreshToken"]
            : res.data["refresh_token"];
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshTokenRes);
    } catch (error) {
        console.log(error.response);
    }
};

export const SignUpEmployee = (form: { email: string; password: string }) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_AUTH });
            const authData = {
                email: form.email,
                password: form.password,
                returnSecureToken: true
            };
            const res = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                    digitalKingsKey,
                authData
            );

            const token = res.data["idToken"];

            localStorage.setItem("token", token);
            localStorage.setItem("isAdmin", "true");

            dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });

            return;
        } catch (error) {
            falidAuthErrorHandler(dispatch, error);
        }
    };
};

export const loginEmployee = (form: { email: string; password: string }) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GeneralActionsEnum.START_AUTH });
            const authData = {
                email: form.email,
                password: form.password,
                returnSecureToken: true
            };
            const res = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                    digitalKingsKey,
                authData
            );

            const token = res.data["idToken"];
            const refreshToken = res.data["refreshToken"];
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);

            dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });

            return;
        } catch (error) {
            console.log(error);

            falidAuthErrorHandler(dispatch, error);
        }
    };
};
