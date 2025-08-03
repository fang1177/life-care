import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSmartPortConfig, displayPortStatus } from './utils/portDetection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏥 Starting Hospital Management System with Smart Port Detection...\n');

// Function to run a command in a specific directory
function runCommand(command, args, cwd, name, color) {
  const process = spawn(command, args, {
    cwd: path.join(__dirname, cwd),
    stdio: 'pipe',
    shell: true
  });

  process.stdout.on('data', (data) => {
    console.log(`\x1b[${color}m[${name}]\x1b[0m ${data.toString().trim()}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`\x1b[${color}m[${name}]\x1b[0m ${data.toString().trim()}`);
  });

  process.on('close', (code) => {
    console.log(`\x1b[${color}m[${name}]\x1b[0m Process exited with code ${code}`);
  });

  return process;
}

// Main function to start all services with smart port detection
async function startServices() {
  try {
    // Check port status first
    await displayPortStatus([4000, 5173, 5174, 5175, 5176, 5177]);

    // Smart port detection for backend
    const { findAvailablePort } = await import('./utils/portDetection.js');
    const backendPort = await findAvailablePort(4000, 10);

    // Get smart port configuration for frontend and dashboard
    const { frontendPort, dashboardPort } = await getSmartPortConfig();

    console.log('🔍 Smart Port Detection Results:');
    console.log(`🔧 Backend will use port: ${backendPort}`);
    console.log(`📱 Frontend will use port: ${frontendPort}`);
    console.log(`📊 Dashboard will use port: ${dashboardPort}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Start backend server with detected port
    console.log('🚀 Starting Backend Server...');
    const backend = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, 'backend'),
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, PORT: backendPort }
    });
    backend.stdout.on('data', (data) => {
      console.log(`\x1b[33m[BACKEND]\x1b[0m ${data.toString().trim()}`);
    });
    backend.stderr.on('data', (data) => {
      console.error(`\x1b[33m[BACKEND]\x1b[0m ${data.toString().trim()}`);
    });
    backend.on('close', (code) => {
      console.log(`\x1b[33m[BACKEND]\x1b[0m Process exited with code ${code}`);
    });

    // Wait a bit for backend to start
    setTimeout(() => {
      // Start frontend with detected port
      console.log(`🌐 Starting Frontend (Port ${frontendPort})...`);
      const frontend = runCommand('npm', ['run', 'dev'], 'frontend', 'FRONTEND', '36'); // Cyan

      // Start dashboard with detected port
      console.log(`📊 Starting Dashboard (Port ${dashboardPort})...`);
      const dashboard = runCommand('npm', ['run', 'dev'], 'dashboard', 'DASHBOARD', '35'); // Magenta

      // Wait a bit more for services to fully start
      setTimeout(() => {
        console.log('\n✅ All services started successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📱 Frontend: http://localhost:${frontendPort}`);
        console.log(`📊 Dashboard: http://localhost:${dashboardPort}`);
        console.log(`🔧 Backend: http://localhost:${backendPort} (API)`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n💡 Press Ctrl+C to stop all services');
        console.log('🔄 Ports are automatically detected to avoid conflicts');
        console.log('\n🎯 Smart Port Detection Rules:');
        console.log('   • Frontend starts at 5173, finds next available');
        console.log('   • Dashboard uses Frontend + 1, or next available');
        console.log('   • Backend starts at 4000, finds next available\n');
      }, 3000);

      // Handle process termination
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down all services...');
        backend.kill();
        frontend.kill();
        dashboard.kill();
        console.log('✅ All services stopped successfully');
        process.exit(0);
      });
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error starting services:', error.message);
    process.exit(1);
  }
}

// Start the services
startServices();