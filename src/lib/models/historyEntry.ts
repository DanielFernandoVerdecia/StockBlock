export type HistoryAction = 'ALERTA' | 'PROPUESTA_PONER_EN_ESPERA' | 'OTRA_ACCION';

export class HistoryEntry {
  id: number;
  loteId?: number;
  producto?: string;
  action: HistoryAction;
  usuario: string;
  motivo: string;
  fecha: string;
  // puedes añadir hash/prevHash si quieres (no incluimos aquí el cálculo por simplicidad)
  constructor(action: HistoryAction, usuario: string, motivo: string, loteId?: number, producto?: string) {
    this.id = Date.now();
    this.loteId = loteId;
    this.producto = producto;
    this.action = action;
    this.usuario = usuario;
    this.motivo = motivo;
    this.fecha = new Date().toISOString();
  }
}
