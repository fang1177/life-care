import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { findAvailablePort, getPortsInUse } from '../utils/portDetection.js'

// https://vite.dev/config/
export default defineConfig(async () => {
  // Smart port detection - dashboard should be frontend + 1
  // Check which ports are in use to determine frontend port
  const commonPorts = [5173, 5174, 5175, 5176, 5177, 5178];
  const portsInUse = await getPortsInUse(commonPorts);
  
  let dashboardPort;
  
  if (portsInUse.length > 0) {
    // Find the lowest port in use (likely frontend) and use next available
    const lowestUsedPort = Math.min(...portsInUse);
    dashboardPort = await findAvailablePort(lowestUsedPort + 1);
  } else {
    // No ports in use, start from default dashboard port
    dashboardPort = await findAvailablePort(5174);
  }
  
  console.log(`📊 Dashboard will run on port: ${dashboardPort}`);
  
  return {
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ? '/dashboard/' : '/',
    server: {
      port: dashboardPort,
      host: true,
      strictPort: false, // Allow fallback to next available port
      open: false // Don't auto-open browser to avoid conflicts
    },
    preview: {
      port: dashboardPort,
      host: true,
      strictPort: false
    }
  }
})
