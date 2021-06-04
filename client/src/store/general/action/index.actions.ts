import { GeneralActionsEnum } from "../state/general.types";

import { errorApi } from "../..";

export const falidApiErrorHandler = (dispatch: any, error: any) => {
    return dispatch({
        type: GeneralActionsEnum.FALID_API,
        error: errorApi(error)
    });
};
export const falidAuthErrorHandler = (dispatch: any, error: any) => {
    return dispatch({
        type: GeneralActionsEnum.FALID_AUTH,
        error: errorApi(error)
    });
};

// isAdmin | isLogin
export const logoutEmployee = () => {
    return (dispatch: any) => {
        localStorage.clear();
        return dispatch({ type: GeneralActionsEnum.LOGOUT });
    };
};
