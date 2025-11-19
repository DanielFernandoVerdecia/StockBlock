<script lang="ts">
  import InspectionForm from '$lib/components/defectos/InspectionForm.svelte';
  import InspectionList from '$lib/components/defectos/InspectionList.svelte';
</script>

<h1>Defectos / Inspecciones</h1>

<div style="display:flex; gap:2rem; align-items:flex-start;">
  <div style="flex:1;">
    <InspectionForm />
  </div>

  <div style="flex:1;">
    <InspectionList />
  </div>
</div>
