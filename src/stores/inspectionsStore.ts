import { createLocalStore } from './localStore';
import type { Inspection } from '$lib/models/inspection';
import { Inspection as InspectionClass } from '$lib/models/inspection';
import { get } from 'svelte/store';
import { lotesStore } from './lotesStore'; 
import { stockStore } from './stockStore';
import { historyStore, addHistory } from './historyStore'; 

// store básico (persistido)
export const inspectionsStore = createLocalStore<Inspection>('inspections', []);

// helper: calcula porcentaje de una inspección
export function calcPercentage(i: Inspection) {
  if (!i.inspeccionado || i.inspeccionado === 0) return 0;
  return (i.defectuoso / i.inspeccionado) * 100;
}

// helper: promedio histórico de porcentaje por producto
export function averagePercentageByProduct(producto: string) {
  const all = get(inspectionsStore);
  const filtered = all.filter(x => x.producto === producto);
  if (!filtered.length) return 0;
  const sum = filtered.reduce((s, it) => s + (it.inspeccionado ? (it.defectuoso / it.inspeccionado) * 100 : 0), 0);
  return sum / filtered.length;
}

/**
 * addInspection: función que añade una inspección y verifica si supera el promedio histórico.
 * - nuevo: InspectionClass
 * - options: { usuario, autoHold } donde autoHold = true pone lote en espera si se supera el promedio
 */
export function addInspection(nuevo: InspectionClass, options?: { usuario?: string; autoHold?: boolean; thresholdFactor?: number }) {
  const usuario = options?.usuario ?? 'Sistema';
  const autoHold = options?.autoHold ?? false;
  const thresholdFactor = options?.thresholdFactor ?? 1.0; // compara con promedio * factor (1.0 = compara directo)

  // 1) persistir la inspección
  inspectionsStore.add(nuevo);

  // 2) calcular porcentaje del nuevo y promedio histórico (excluyendo el nuevo)
  const allBefore = get(inspectionsStore).filter(i => i.id !== nuevo.id && i.producto === nuevo.producto);
  const avgBefore = allBefore.length
    ? allBefore.reduce((s, it) => s + (it.inspeccionado ? (it.defectuoso / it.inspeccionado) * 100 : 0), 0) / allBefore.length
    : 0;

  const porcentajeNuevo = calcPercentage(nuevo);

  // 3) si el nuevo % > avgBefore -> alerta y registrar en history
  if (avgBefore > 0 && porcentajeNuevo > avgBefore * thresholdFactor) {
    const motivo = `Porcentaje nuevo ${porcentajeNuevo.toFixed(2)}% > promedio histórico ${avgBefore.toFixed(2)}%`;
    // registrar alerta en historial
    addHistory({
      action: 'ALERTA',
      usuario,
      motivo,
      loteId: nuevo.loteId,
      producto: nuevo.producto
    });

    // opcional: propuesta poner lote en espera y registro
    addHistory({
      action: 'PROPUESTA_PONER_EN_ESPERA',
      usuario,
      motivo: `Se recomienda poner en espera el lote ${nuevo.loteId}`,
      loteId: nuevo.loteId,
      producto: nuevo.producto
    });

    // acción visible: alert browser
    alert(`ALERTA: ${motivo}\nSe propone poner lote ${nuevo.loteId} en espera.`);

    if (autoHold) {
      // poner lote en espera (si existe lotesStore y su replace acepta esa forma)
      try {
        lotesStore.replace(l => l.id === nuevo.loteId, l => ({
          ...l,
          estado: 'en_espera',
          fechaModificacion: new Date().toISOString()
        }));
      } catch (e) {
        console.warn('lotesStore no disponible o replace falló', e);
      }
    }
  }

  // 4) Si avgBefore == 0 (sin histórico) no alertamos por comparación (puedes cambiar la lógica si quieres)
}
