import type {Element} from "@/views/Inventario/Elementos/services/elementos.interfaces";

export interface Baja {
    PID: number;
    user: string;
    timestamps: Date;
}

export interface DetalleBaja {
    baja: Baja;
    elemento: Element[];
    autorizado: boolean;
    timestamps: Date;
    fechaBorrado: Date;
}
