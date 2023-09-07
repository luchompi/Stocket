import type { Element } from '@/views/Inventario/Elementos/services/elementos.interfaces';
export interface certificado{
    id: string;
    elementos:Element[];
    timestamps:string;
    asignacion:string;
    elemento:string;
}