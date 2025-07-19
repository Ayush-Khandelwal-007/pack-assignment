<script lang="ts">
  import UploadForm from '$lib/components/UploadForm.svelte';
  import ResourceTable from '$lib/components/ResourceTable.svelte';
  import { onMount } from 'svelte';
  let resources: any[] = [];
  let showDialog = false;
  async function fetchResources() {
    const res = await fetch('/api/resources');
    resources = await res.json();
  }
  function openDialog() {
    showDialog = true;
  }
  function closeDialog() {
    showDialog = false;
  }
  function handleUploaded() {
    fetchResources();
    closeDialog();
  }
  onMount(fetchResources);
</script>

<div class="flex flex-col md:flex-row gap-8 p-8">
  <div class="w-full md:w-2/3 mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Uploaded Resources</h2>
      <button class="px-4 py-2 rounded font-bold bg-orange-500 text-white hover:bg-orange-600" on:click={openDialog}>Add Resource</button>
    </div>
    <ResourceTable {resources} />
  </div>
</div>

{#if showDialog}
  <div
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur"
    on:click={closeDialog}
    on:keydown={(e) => { if (e.key === 'Escape') closeDialog(); }}
    aria-label="Close dialog"
    role="dialog"
  >
    <div class="bg-white rounded shadow p-6 w-full max-w-4xl relative" on:click|stopPropagation>
      <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" on:click={closeDialog} aria-label="Close">&times;</button>
      <h2 class="text-xl font-bold mb-4">Upload Resource</h2>
      <UploadForm on:uploaded={handleUploaded} />
    </div>
  </div>
{/if}
