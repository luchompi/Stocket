export interface Element {
    placa: string;
    referencia: string;
    modelo: string | null;
    serial: string;
    estado: string;
    IP: string | null;
    MAC: string;
    proveedor: string | null;
    created_at: string;
    delete_on: string | null;
    created_by: string;
}

export interface ElementPreview {
    placa: string;
    referencia: string;
    estado: string;
    modelo: string | null;
}
