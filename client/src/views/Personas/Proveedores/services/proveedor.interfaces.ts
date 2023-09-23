export interface Suppliers {
    NIT: string;
    razonSocial: string;
    phone: string;
    address: string;
    email: string;
    city: string;
}

export interface SuppliersPreview{
    NIT: string;
    razonSocial: string;
    created_at: string | null;
}