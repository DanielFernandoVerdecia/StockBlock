<script lang="ts">
  import { inspectionsStore, averagePercentageByProduct } from '../../../stores/inspectionsStore';
  import { get } from 'svelte/store';

  function pct(i:any) {
    if (!i.inspeccionado) return 0;
    return ((i.defectuoso / i.inspeccionado) * 100).toFixed(2);
  }

  function avgForProduct(producto: string) {
    return averagePercentageByProduct(producto).toFixed(2);
  }
</script>

<div class="card">
  <h3>Inspecciones</h3>
  {#if $inspectionsStore.length === 0}
    <p>No hay inspecciones registradas.</p>
  {/if}

  <ul>
    {#each $inspectionsStore as i}
      <li>
        <strong>Lote:</strong> {i.loteId} — <strong>Producto:</strong> {i.producto} — <strong>%:</strong> {pct(i)}%
        <div style="font-size:.85rem; color:#666">Fecha: {new Date(i.fecha).toLocaleString()}</div>
        <div style="font-size:.85rem; color:#666">Promedio histórico producto: {avgForProduct(i.producto)}%</div>
      </li>
    {/each}
  </ul>
</div>

<style>
.card { padding:1rem; background:#fff; border-radius:8px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
li { margin-bottom:.75rem; border-bottom:1px solid #eee; padding-bottom:.5rem; }
</style>
