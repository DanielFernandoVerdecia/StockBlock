<script lang="ts">
  import InspectionForm from '$lib/components/defectos/InspectionForm.svelte';
  import InspectionList from '$lib/components/defectos/InspectionList.svelte';
<<<<<<< Updated upstream
</script>

<h1>Defectos / Inspecciones</h1>
=======
<<<<<<< HEAD
  import {enrutador} from '../../routes/router_now'
</script>


<h1 style="text-align: center; margin-top: 2rem;">HU02 - Defectos / Inspecciones</h1>
=======
</script>

<h1>Defectos / Inspecciones</h1>
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes

<div style="display:flex; gap:2rem; align-items:flex-start;">
  <div style="flex:1;">
    <InspectionForm />
  </div>
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes

  <div style="flex:1;">
    <InspectionList />
  </div>
<<<<<<< Updated upstream
=======
</div>

<div style = "display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;">

  <button type="button" class="btn btn-secondary btn-lg"
  on:click = {()=> enrutador('/ruta_main')}
  >
    Volver al menú principal
  </button>

=======

  <div style="flex:1;">
    <InspectionList />
  </div>
>>>>>>> c49ae5952ba26ed84de8763f97cd366410813605
>>>>>>> Stashed changes
</div>
