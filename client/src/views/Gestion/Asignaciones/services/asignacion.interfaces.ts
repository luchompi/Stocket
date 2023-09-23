import type {Employee} from "@/views/Personas/Funcionarios/services/funcionarios.interfaces";
import type {Element} from "@/views/Inventario/Elementos/services/elementos.interfaces";

export interface Asignation {
    id: number;
    user: string;
    timestamps: string;
    funcionario: Array<Employee>;
}

export interface AsignationDetail {
    id: number;
    elementos: Element[];
    timestamps: string;
    asignacion: string;
    elemento: string;

}