import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successAddDates = (
    state: actions.dataState,
    action: actions.successPostDatesActionType
) => {
    const dates = { ...state.dates };
    const datesUser = dates[action.user_id]
        ? [...dates[action.user_id]].concat(action.dates)
        : action.dates;

    dates[action.user_id] = datesUser;
    return updateObject(state, {
        dates
    });
};

export const successDeleteDate = (
    state: actions.dataState,
    action: actions.successDeleteDateActionType
) => {
    const dates = { ...state.dates };

    const newDate = [...dates[action.user_id]].filter(
        (date) => date !== action.date
    );
    console.log(newDate);

    return updateObject(state, {
        dates: { ...state.dates, [action.user_id]: newDate }
    });
};
