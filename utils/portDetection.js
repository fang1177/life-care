import net from 'net';

/**
 * Check if a port is available
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>} - True if port is available, false otherwise
 */
async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port, '0.0.0.0');
  });
}

/**
 * Find the next available port starting from a base port
 * @param {number} basePort - Starting port number
 * @param {number} maxAttempts - Maximum number of ports to check (default: 10)
 * @returns {Promise<number>} - Next available port
 */
export async function findAvailablePort(basePort, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const port = basePort + i;
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${basePort}`);
}

/**
 * Get smart port configuration for frontend and dashboard
 * Frontend starts at 5173, dashboard is always frontend + 1
 * @returns {Promise<{frontendPort: number, dashboardPort: number}>}
 */
export async function getSmartPortConfig() {
  let frontendPort = 5173;
  // Find available port for frontend
  while (!(await isPortAvailable(frontendPort))) {
    frontendPort++;
  }

  let dashboardPort = frontendPort + 1;
  // Find available port for dashboard (must not conflict with frontend)
  while (!(await isPortAvailable(dashboardPort))) {
    dashboardPort++;
  }

  return { frontendPort, dashboardPort };
}

/**
 * Get ports that are currently in use
 * @param {number[]} ports - Array of ports to check
 * @returns {Promise<number[]>} - Array of ports that are in use
 */
export async function getPortsInUse(ports) {
  const portsInUse = [];
  
  for (const port of ports) {
    if (!(await isPortAvailable(port))) {
      portsInUse.push(port);
    }
  }
  
  return portsInUse;
}

/**
 * Display port status information
 * @param {number[]} ports - Array of ports to check
 */
export async function displayPortStatus(ports) {
  console.log('\n🔍 Port Status Check:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
   
  for (const port of ports) {
    const available = await isPortAvailable(port);
    const status = available ? '✅ Available' : '❌ In Use';
    console.log(`Port ${port}: ${status}`);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}