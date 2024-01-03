import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // For the contents in the rules page
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), prefetch(), svelte()]
});