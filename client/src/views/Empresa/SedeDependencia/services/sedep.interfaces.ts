interface Dependencia {
    id: number;
    nombre: string;
}

export interface SedeDependencia {
    id: number;
    dependencias: Dependencia[];
    created_at: string;
    sede: number;
    dependencia: number;
}