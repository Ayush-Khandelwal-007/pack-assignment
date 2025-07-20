<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  export let resources: any[] = [];
  const dispatch = createEventDispatcher();

  function handleRowClick(resource: any) {
    window.open(resource.filePath, '_blank');
  }
</script>

<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" style="width: 28%">Description</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" style="width: 10%">Roles</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each resources as resource}
      <tr class="hover:bg-orange-50 cursor-pointer" on:click={() => handleRowClick(resource)}>
        <td class="px-4 py-2">{resource.title}</td>
        <td class="px-4 py-2" style="width: 28%">{resource.description}</td>
        <td class="px-4 py-2">{resource.category}</td>
        <td class="px-4 py-2">{resource.language}</td>
        <td class="px-4 py-2">{resource.provider}</td>
        <td class="px-4 py-2" style="width: 10%">{resource.roles}</td>
        <td class="px-4 py-2">{resource.fileType}</td>
        <td class="px-4 py-2">{new Date(resource.createdAt).toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table> 