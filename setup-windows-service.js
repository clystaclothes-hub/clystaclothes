const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Raffay Clothing Backend as Windows Service...');

// Check if running as administrator
exec('net session', (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Please run this script as Administrator');
        console.log('Right-click on Command Prompt and select "Run as Administrator"');
        process.exit(1);
    }

    console.log('✅ Running as Administrator');

    // Install PM2 globally if not already installed
    console.log('📦 Installing PM2 globally...');
    exec('npm install -g pm2', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Failed to install PM2:', error);
            return;
        }

        console.log('✅ PM2 installed successfully');

        // Start the application with PM2
        console.log('🔄 Starting application with PM2...');
        exec('pm2 start ecosystem.config.js', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Failed to start application:', error);
                return;
            }

            console.log('✅ Application started successfully');
            console.log(stdout);

            // Setup PM2 to start on system boot
            console.log('🔧 Setting up PM2 to start on system boot...');
            exec('pm2 startup', (error, stdout, stderr) => {
                if (error) {
                    console.error('❌ Failed to setup startup:', error);
                    return;
                }

                console.log('✅ PM2 startup configured');
                console.log(stdout);

                // Save PM2 configuration
                exec('pm2 save', (error, stdout, stderr) => {
                    if (error) {
                        console.error('❌ Failed to save PM2 configuration:', error);
                        return;
                    }

                    console.log('✅ PM2 configuration saved');
                    console.log('🎉 Windows service setup complete!');
                    console.log('\n📋 Service Commands:');
                    console.log('   pm2 status                    - Check service status');
                    console.log('   pm2 logs raffay-clothing-backend - View logs');
                    console.log('   pm2 restart raffay-clothing-backend - Restart service');
                    console.log('   pm2 stop raffay-clothing-backend   - Stop service');
                    console.log('\n🌐 Your backend will be available at:');
                    console.log('   http://localhost:5000');
                    console.log('   http://localhost:5000/api/health');
                });
            });
        });
    });
});
