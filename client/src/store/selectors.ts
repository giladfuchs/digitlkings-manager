//data

export const getUsers = (state: any) => state.data.users;
export const getEmails = (state: any) => state.data.emails;
export const getDates = (state: any) => state.data.dates;
export const getClients = (state: any) => state.data.clients;

//auth
export const getIsTokenSet = (state: any) => state.general.isTokenSet;

//genral

export const getLoading = (state: any) => state.general.loading;
export const getError = (state: any) => state.general.error;
export const getLanguage = (state: any) => state.general.language;
