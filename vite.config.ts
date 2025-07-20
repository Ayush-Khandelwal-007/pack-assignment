import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [sveltekit()],
  server: {
    allowedHosts: [
      'pack-assignment.onrender.com',
      'localhost'
    ]
  }
};
