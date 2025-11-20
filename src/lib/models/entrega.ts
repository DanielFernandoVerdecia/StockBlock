export class Entrega {
    id: number;
    cliente: string;
    documento?: string;
    firma?: string; // <--- NUEVO CAMPO
    estado: 'pendiente' | 'entregado' | 'finalizado';
    fechaCreacion: string;
    fechaModificacion: string | null;

    // Actualizamos el constructor para aceptar la firma opcional
    constructor(cliente: string, documento?: string, firma?: string) {
        this.id = Date.now();
        this.cliente = cliente;
        this.documento = documento;
        this.firma = firma; // <--- Asignamos la firma
        this.estado = 'pendiente';
        this.fechaCreacion = new Date().toISOString();
        this.fechaModificacion = null;
    }
}