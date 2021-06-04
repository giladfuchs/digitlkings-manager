import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successAddTarget = (
    state: actions.dataState,
    action: actions.successPostTargetActionType
) => {
    const clients = [...state.clients];
    clients[action.index]["targets"] = Object.assign(
        clients[action.index]["targets"],
        action.target
    );

    return updateObject(state, {
        clients
    });
};

// export const successDeleteDate = (
//     state: actions.dataState,
//     action: actions.successDeleteDateActionType
// ) => {
//     const dates = { ...state.dates };

//     const newDate = [...dates[action.user_id]].filter(
//         (date) => date !== action.date
//     );
//     console.log(newDate);

//     return updateObject(state, {
//         dates: { ...state.dates, [action.user_id]: newDate }
//     });
// };
