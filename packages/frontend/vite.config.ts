import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use dynamic import for ESM-only plugins to avoid require-time errors in some environments
export default defineConfig(async () => {
  let UnoCSS: any = undefined;
  try {
    // dynamic import ensures esbuild won't try to require an ESM file at config bundle time
    const mod = await import('unocss/vite');
    UnoCSS = mod.default || mod;
  } catch (e) {
    // If import fails, log and continue without UnoCSS. This keeps dev server starting.
    // The container build will still work if UnoCSS is unavailable.
    // eslint-disable-next-line no-console
    console.warn('UnoCSS could not be loaded dynamically:', e);
  }

  const plugins = [
    ...(UnoCSS ? [UnoCSS()] : []),
    react(),
  ];

  return {
    plugins,
    server: {
      host: true,
      watch: {
        usePolling: true,
      },
    },
    optimizeDeps: {
      include: ['unocss'],
    },
  };
});
