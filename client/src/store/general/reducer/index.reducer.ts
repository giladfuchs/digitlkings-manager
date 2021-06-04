import * as actions from "../state/general.types";
import { initialGeneralState } from "../index";
import * as actionReducer from "./general.reducer";
type allAuthActionTypes =
    | actions.startAuthActionType
    | actions.startServiceActionType
    | actions.successAuthctionType
    | actions.successUserActionType
    | actions.faildUserActionType
    | actions.faildAuthActionType
    | actions.logoutActionType
    | actions.setLanguageActionType
    | actions.successSetTokenActionType;

export const generalReducer = (
    state = initialGeneralState,
    action: allAuthActionTypes
) => {
    switch (action.type) {
        //start
        case actions.GeneralActionsEnum.START_AUTH:

        case actions.GeneralActionsEnum.START_API:
            return actionReducer.start(state);

        //faild
        case actions.GeneralActionsEnum.FALID_AUTH:

        case actions.GeneralActionsEnum.FALID_API:
            return actionReducer.faild(state, action);

        //success

        case actions.GeneralActionsEnum.SUCCESS_AUTH:

        case actions.GeneralActionsEnum.SUCCESS_API:
            return actionReducer.successAction(state);

        //other login logout
        case actions.GeneralActionsEnum.LOGOUT:
            return actionReducer.successLogout(state);

        case actions.GeneralActionsEnum.SUCCESS_SET_TOKEN:
            return actionReducer.successSetToken(state);

        case actions.GeneralActionsEnum.SET_LANGUAGE:
            return actionReducer.setLanguage(state, action);

        default:
            return state;
    }
};
