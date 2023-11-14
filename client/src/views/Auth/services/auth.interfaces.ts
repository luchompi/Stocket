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

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    uid: string;
    phone: string;
    is_superuser: boolean;
    groups: string[];
}