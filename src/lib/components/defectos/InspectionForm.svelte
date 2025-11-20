<script lang="ts">
  import { inspectionsStore, addInspection } from '../../../stores/inspectionsStore';
  import { lotesStore } from '../../../stores/lotesStore';
  import { Inspection } from '$lib/models/inspection';
  import { get } from 'svelte/store';
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  import { goto } from '$app/navigation'; 


  function enrutador(link: string){
        goto(link);
  }  
=======
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes

  let selectedLoteId: number | null = null;
  let producto = '';
  let inspeccionado = 0;
  let defectuoso = 0;
  let usuario = 'Gerente Administrativo';
  let autoHold = true;

  function submit() {
    if (!selectedLoteId) {
      alert('Seleccione un lote');
      return;
    }
    if (inspeccionado <= 0) {
      alert('El valor inspeccionado debe ser mayor que 0');
      return;
    }
    if (defectuoso < 0 || defectuoso > inspeccionado) {
      alert('Cantidad defectuosa inválida');
      return;
    }

    // Obtener el nombre del producto si no se escribe manualmente
    const nombreProducto =
      producto || get(lotesStore).find(l => l.id === selectedLoteId)?.producto || '';

    // Crear inspección
    const nuevo = new Inspection(
      selectedLoteId,
      nombreProducto,
      inspeccionado,
      defectuoso
    );

    // ❗ GUARDAR LA INSPECCIÓN (lo que faltaba)
    addInspection(nuevo, {
      usuario,
      autoHold
    });

    // Limpiar formulario
    producto = '';
    inspeccionado = 0;
    defectuoso = 0;

    alert("Inspección registrada correctamente");
  }
</script>

<div class="card">
<<<<<<< Updated upstream
  <h3>Registrar inspección por lote</h3>

=======
<<<<<<< HEAD

  <h3>Registrar inspección por lote</h3>

  <button type="button"
  onclick = {()=> enrutador('/lotes')}
  class="btn btn-secondary"
  >
    Agregar Nuevo Lote de productos
  </button>

=======
  <h3>Registrar inspección por lote</h3>

>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes
  <label>Lote</label>
  <select bind:value={selectedLoteId}>
    <option value={null}>-- Seleccione lote --</option>
    {#each $lotesStore as l}
      <option value={l.id}>{l.producto} (#{l.id})</option>
    {/each}
  </select>

  <label>Producto (opcional)</label>
  <input bind:value={producto} placeholder="Nombre del producto" />

  <label>Inspeccionado</label>
  <input type="number" bind:value={inspeccionado} min="0" />

  <label>Defectuoso</label>
  <input type="number" bind:value={defectuoso} min="0" />

  <label>Usuario</label>
  <input bind:value={usuario} />

  <label>
    <input type="checkbox" bind:checked={autoHold} />
    Poner lote en espera automáticamente si supera promedio
  </label>

<<<<<<< Updated upstream
  <button on:click={submit}>Registrar inspección</button>
=======
<<<<<<< HEAD
  <button 
  type = "button"
  onclick={submit} class="btn btn-primary">Registrar inspección</button
  >
=======
  <button on:click={submit}>Registrar inspección</button>
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes
</div>

<style>
.card {
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
  display:flex;
  flex-direction:column;
  gap:.5rem;
}
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

=======
>>>>>>> Stashed changes
button {
  padding:.5rem;
  border-radius:6px;
  border:none;
  background:#1e90ff;
  color:white;
  cursor:pointer;
}
<<<<<<< Updated upstream
=======
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes
</style>
