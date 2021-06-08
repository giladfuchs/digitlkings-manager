export type User = {
    user_id: number;
    usernameInstagram: string;
    passwordInstagram: string;
    email: string;
    phone: string;
    realUser: string;
};

export type Client = {
    user_id: string;
    username: string;
    usernameInstagram: string;
    email?: string;
    phone: string;
    dates: any;
    targets: any;
    payments: any;
    permanence: boolean;
    active: boolean;
};
export type Payment = {
    date: string;
    amount: number;
    method: string;
};
