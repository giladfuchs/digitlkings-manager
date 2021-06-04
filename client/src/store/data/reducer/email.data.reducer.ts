import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successPostEmail = (
  state: actions.dataState,
  action: actions.successPostEmailActionType
) => {
  
  const emails = [...state.emails].filter(s => s!==undefined);

  emails.push(action.email);
  return updateObject(state, {
    emails
  });
};

export const successUpadateEmail = (
  state: actions.dataState,
  action: actions.successUpdateEmailActionType
) => {
  const updateEmails = [...state.emails].filter(
    (s) => s.address !== action.email.address && s.address !== action.addressOriginal
  );
  updateEmails.push(action.email);
    
  return updateObject(state, {
    emails: updateEmails.filter((s) => s.address !== action.addressOriginal.split("@")[0]),
  });
};

export const successDeleteEmail = (
  state: actions.dataState,
  action: actions.successDeleteEmailActionType
) => {
  return updateObject(state, {
    emails: state.emails.filter((s) => s.address !== action.userId),
  });
};
