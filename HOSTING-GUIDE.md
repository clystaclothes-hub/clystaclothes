# Raffay Clothing Backend - Hosting & Daemon Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install PM2 globally (Process Manager)
npm install -g pm2

# Install project dependencies
npm install
```

### 2. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# Set your MongoDB URI, JWT secret, etc.
```

### 3. Database Setup
```bash
# Setup database
npm run db:setup

# Seed initial data
npm run db:seed
```

### 4. Start as Daemon (Windows Service)
```bash
# Option 1: Using the setup script (Run as Administrator)
node setup-windows-service.js

# Option 2: Manual setup
npm run pm2:start
npm run service:install
```

## 📋 Service Management Commands

### PM2 Commands
```bash
# Check service status
pm2 status

# View logs
pm2 logs raffay-clothing-backend

# Restart service
pm2 restart raffay-clothing-backend

# Stop service
pm2 stop raffay-clothing-backend

# Start service
pm2 start raffay-clothing-backend

# Monitor service
pm2 monit
```

### Windows Service Commands
```bash
# Install as Windows service
npm run service:install

# Remove Windows service
npm run service:uninstall
```

## 🌐 Production Hosting Options

### 1. **VPS Hosting (Recommended)**
- **Providers**: DigitalOcean, Linode, AWS EC2, Google Cloud
- **Requirements**: Ubuntu 20.04+, 1GB RAM, 25GB SSD
- **Setup**:
  ```bash
  # Ubuntu setup
  sudo apt update && sudo apt upgrade -y
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo apt install mongodb -y
  ```

### 2. **Cloud Platforms**
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern cloud platform
- **Render**: Simple deployment
- **Vercel**: Frontend + backend hosting

### 3. **Shared Hosting**
- **cPanel**: Use Node.js selector
- **Plesk**: Built-in Node.js support

## 🔧 Configuration Files

### PM2 Configuration (`ecosystem.config.js`)
- Process management
- Auto-restart on crashes
- Log rotation
- Environment variables

### Environment Variables (`.env`)
- Database connection
- JWT secrets
- API keys
- Server configuration

## 📊 Monitoring & Logs

### Log Locations
- **Application Logs**: `./logs/`
- **PM2 Logs**: `~/.pm2/logs/`
- **System Logs**: Windows Event Viewer

### Health Check Endpoints
- **API Health**: `http://localhost:5000/api/health`
- **Database Health**: `http://localhost:5000/api/health`

## 🔒 Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set up firewall rules
- [ ] Configure rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up SSL certificates

## 🚨 Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT in .env
2. **MongoDB connection failed**: Check MONGODB_URI
3. **Permission denied**: Run as Administrator
4. **Service not starting**: Check logs with `pm2 logs`

### Debug Commands
```bash
# Check if service is running
pm2 status

# View detailed logs
pm2 logs raffay-clothing-backend --lines 100

# Check system resources
pm2 monit
```

## 📞 Support

For issues with the daemon setup:
1. Check PM2 logs: `pm2 logs`
2. Verify environment variables
3. Ensure MongoDB is running
4. Check Windows Event Viewer for system errors
