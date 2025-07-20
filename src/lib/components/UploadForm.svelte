<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { z } from 'zod';

  const dispatch = createEventDispatcher();

  let title = '';
  let description = '';
  let category = '';
  let language = '';
  let provider = '';
  let roles: string[] = [];
  let file: File | null = null;
  let error = '';
  let uploading = false;

  const categories = [
    'Leadership',
    'Managing Complexity',
    'Conflict Resolution',
    'Mentoring',
    'Coaching',
    'Other'
  ];
  const languages = ['English', 'Italian', 'Spanish', 'French', 'German'];
  const providers = ['Skilla', 'Linkedin', 'Pack', 'Mentor', 'Other'];
  const rolesList = ['Mentor / Coach', 'Mentee / Coachee'];

  const schema = z.object({
    title: z.string().max(200),
    description: z.string().max(1000),
    category: z.string(),
    language: z.string(),
    provider: z.string(),
    roles: z.array(z.string()),
    file: z.instanceof(File)
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';
    uploading = true;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('language', language);
    formData.append('provider', provider);
    formData.append('roles', roles.join(','));
    if (file) formData.append('file', file);
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        const data = await res.json();
        error = data.error || 'Upload failed';
      } else {
        dispatch('uploaded');
        // Reset form
        title = '';
        description = '';
        category = '';
        language = '';
        provider = '';
        roles = [];
        file = null;
      }
    } catch (err) {
      error = 'Upload failed';
    } finally {
      uploading = false;
    }
  }
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
  <label for="title" class="font-medium">Title*</label>
  <input id="title" class="w-full border rounded px-3 py-2 mb-2" type="text" placeholder="Title*" bind:value={title} maxlength="200" required />

  <label for="description" class="font-medium">Description*</label>
  <textarea id="description" class="w-full border rounded px-3 py-2 mb-2" placeholder="Description*" bind:value={description} maxlength="1000" required></textarea>

  <label for="category" class="font-medium">Category*</label>
  <select id="category" class="w-full border rounded px-3 py-2 mb-2" bind:value={category} required>
    <option value="" disabled selected>Category*</option>
    {#each categories as c}
      <option value={c}>{c}</option>
    {/each}
  </select>

  <label for="language" class="font-medium">Language*</label>
  <select id="language" class="w-full border rounded px-3 py-2 mb-2" bind:value={language} required>
    <option value="" disabled selected>Language*</option>
    {#each languages as l}
      <option value={l}>{l}</option>
    {/each}
  </select>

  <label for="provider" class="font-medium">Provider*</label>
  <select id="provider" class="w-full border rounded px-3 py-2 mb-2" bind:value={provider} required>
    <option value="" disabled selected>Provider*</option>
    {#each providers as p}
      <option value={p}>{p}</option>
    {/each}
  </select>

  <div>
    <span class="block mb-1 font-medium">Roles</span>
    {#each rolesList as r, i}
      <label class="inline-flex items-center mr-4" for={`role-${i}`}>
        <input id={`role-${i}`} type="checkbox" value={r} checked={roles.includes(r)} on:change={() => {
          if (roles.includes(r)) roles = roles.filter(role => role !== r);
          else roles = [...roles, r];
        }} />
        <span class="ml-2">{r}</span>
      </label>
    {/each}
  </div>

  <label for="file" class="font-medium">File*</label>
  {#if !file}
    <label class="file-upload-btn">
      <input id="file" class="file-input" type="file" accept=".pdf,.txt,.mp4,.ppt,.pptx,.doc,.docx" on:change={e => file = (e.target as HTMLInputElement).files?.[0] ?? null} required />
      <span>Select file</span>
    </label>
    <span class="file-upload-placeholder">No file selected*</span>
  {:else}
    <div class="file-selected">
      <span class="file-name">{file.name}</span>
      <button type="button" class="remove-file-btn" on:click={() => file = null} aria-label="Remove file">&times;</button>
    </div>
  {/if}

  {#if error}
    <div class="text-red-600 text-sm">{error}</div>
  {/if}
  <button class="px-4 py-2 rounded font-bold bg-orange-500 text-white hover:bg-orange-600" type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
</form> 