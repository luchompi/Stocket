import type { Element } from "@/views/Inventario/Elementos/services/elementos.interfaces";
export interface Maintenance {
    PID: number;
    elemento: Element[];
    user: string;
    fechaFin?: Date;
    descripcion: string;
    observaciones?: string;
    timestamps: Date;
    estado: string;
  }
