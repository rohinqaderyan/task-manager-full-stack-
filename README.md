# 📝 Full-Stack Task Manager

A modern, full-stack task management application built with **React**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**. This project demonstrates best practices in modern web development with a complete authentication system, RESTful API, and responsive UI.

## 🚀 Features

- ✅ **User Authentication** - Register and login with JWT tokens
- 📋 **Task Management** - Create, read, update, and delete tasks
- 🎯 **Task Prioritization** - Set priority levels (Low, Medium, High)
- 📊 **Status Tracking** - Track tasks (To Do, In Progress, Completed)
- 🗓️ **Due Dates** - Set and track task deadlines
- 🎨 **Modern UI** - Clean, responsive design with dark/light mode support
- 🔐 **Secure API** - JWT-based authentication and validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
full stack github project/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # Frontend React app
    ├── src/
    │   ├── api/           # API client
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── store/         # State management
    │   ├── types/         # TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The backend API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/:id` - Get user profile

### Tasks
- `GET /api/tasks` - Get all tasks (supports filtering by status, priority, userId)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 📦 Build for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🧪 Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Frontend (optional .env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Features in Detail

### User Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Persistent login with localStorage
- Protected routes

### Task Management
- CRUD operations for tasks
- Real-time filtering by status
- Priority levels for better organization
- Due date tracking
- Responsive card-based layout

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as a demonstration of modern full-stack development practices.

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js for the robust backend framework
- MongoDB team for the flexible database
- The open-source community

---

**Happy Coding! 🎉**
