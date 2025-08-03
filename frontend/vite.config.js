import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { findAvailablePort } from '../utils/portDetection.js'

// https://vite.dev/config/
export default defineConfig(async () => {
  // Smart port detection - start from 5173
  const frontendPort = await findAvailablePort(5173);
  
  console.log(`🌐 Frontend will run on port: ${frontendPort}`);
  
  return {
    plugins: [react()],
    server: {
      port: frontendPort,
      host: true,
      strictPort: false, // Allow fallback to next available port
      open: false // Don't auto-open browser to avoid conflicts
    },
    preview: {
      port: frontendPort,
      host: true,
      strictPort: false
    }
  }
})
