import { createLocalStore } from './localStore';
<<<<<<< Updated upstream
import type { HistoryEntry } from '$lib/models/historyentry';
import { HistoryEntry as HistoryEntryClass } from '$lib/models/historyentry';
=======
<<<<<<< HEAD
import type { HistoryEntry } from '$lib/models/historyEntry';
import { HistoryEntry as HistoryEntryClass } from '$lib/models/historyEntry';
=======
import type { HistoryEntry } from '$lib/models/historyentry';
import { HistoryEntry as HistoryEntryClass } from '$lib/models/historyentry';
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes

// store simple append-only
export const historyStore = createLocalStore<HistoryEntry>('history', []);

// helper para añadir history (normalizamos payload)
export function addHistory(payload: { action: any; usuario: string; motivo: string; loteId?: number; producto?: string }) {
  const h = new HistoryEntryClass(payload.action, payload.usuario, payload.motivo, payload.loteId, payload.producto);
  historyStore.add(h);
  return h;
<<<<<<< Updated upstream
}
=======
<<<<<<< HEAD
}
=======
}
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes
