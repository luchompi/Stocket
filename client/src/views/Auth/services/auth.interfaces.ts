export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    re_password: string;
    username: string;
}

export interface Activate {
    uid: any;
    token: any;
}

export interface Email {
    email: string;
}
