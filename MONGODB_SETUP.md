# MongoDB Setup Guide

Your application is running, but you need to connect to MongoDB. Here are your options:

## ⚡ Quick Option: MongoDB Atlas (Cloud - FREE)

This is the fastest way to get started - no installation needed!

### Steps:
1. **Create Account**: Go to https://www.mongodb.com/atlas/database
2. **Create Free Cluster**: 
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select a cloud provider and region close to you
   - Click "Create Cluster"

3. **Create Database User**:
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `taskmanageruser`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access**:
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**:
   - Go back to "Database" section
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)

6. **Update Your .env File**:
   ```
   cd backend
   notepad .env
   ```
   
   Replace the MONGODB_URI line with:
   ```
   MONGODB_URI=mongodb+srv://taskmanageruser:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```
   
   Replace `<password>` with your actual password
   Replace `cluster0.xxxxx` with your actual cluster address

7. **Restart Backend Server**: 
   The server should auto-restart and connect!

---

## 💻 Local Option: MongoDB Community Edition

If you prefer to run MongoDB locally:

### For Windows:
1. **Download**: https://www.mongodb.com/try/download/community
2. **Install**: Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service
   - Install MongoDB Compass (GUI tool) - optional but helpful

3. **Start MongoDB Service**:
   ```powershell
   net start MongoDB
   ```

4. **Verify Installation**:
   ```powershell
   mongosh
   ```

5. **Restart Backend**: Your app should now connect automatically!

### For macOS:
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

### For Linux (Ubuntu):
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

---

## 🔧 Current Status

- ✅ Backend API Server: Running on http://localhost:5000
- ✅ Frontend Dev Server: Running on http://localhost:3000
- ❌ MongoDB: Not connected

Once you complete either setup option above, your full-stack application will be fully functional!

## 🧪 Test the Setup

1. Open http://localhost:3000
2. Register a new account
3. Create some tasks
4. Test all CRUD operations

---

## 📞 Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/getting-started/
- MongoDB Community Docs: https://www.mongodb.com/docs/manual/installation/
- Check backend terminal for connection status
