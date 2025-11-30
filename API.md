# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### Authentication

#### Register User
```http
POST /users/register
```

**Request Body:**
```json
{
  "username": "string (3-30 characters, alphanumeric)",
  "email": "string (valid email)",
  "password": "string (min 6 characters)"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "username": "username",
    "email": "email@example.com"
  }
}
```

---

#### Login User
```http
POST /users/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "username": "username",
    "email": "email@example.com"
  }
}
```

---

#### Get User Profile
```http
GET /users/profile/:id
```

**Response:** `200 OK`
```json
{
  "id": "user-id",
  "username": "username",
  "email": "email@example.com",
  "createdAt": "2025-11-30T00:00:00.000Z"
}
```

---

### Tasks

#### Get All Tasks
```http
GET /tasks?userId={userId}&status={status}&priority={priority}
```

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `status` (optional): Filter by status (todo, in-progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)

**Response:** `200 OK`
```json
[
  {
    "_id": "task-id",
    "title": "Task Title",
    "description": "Task description",
    "status": "todo",
    "priority": "high",
    "dueDate": "2025-12-01T00:00:00.000Z",
    "userId": "user-id",
    "createdAt": "2025-11-30T00:00:00.000Z",
    "updatedAt": "2025-11-30T00:00:00.000Z"
  }
]
```

---

#### Get Task by ID
```http
GET /tasks/:id
```

**Response:** `200 OK`
```json
{
  "_id": "task-id",
  "title": "Task Title",
  "description": "Task description",
  "status": "todo",
  "priority": "high",
  "dueDate": "2025-12-01T00:00:00.000Z",
  "userId": "user-id",
  "createdAt": "2025-11-30T00:00:00.000Z",
  "updatedAt": "2025-11-30T00:00:00.000Z"
}
```

---

#### Create Task
```http
POST /tasks
```

**Request Body:**
```json
{
  "title": "string (required, 3-100 characters)",
  "description": "string (optional, max 500 characters)",
  "status": "todo | in-progress | completed (default: todo)",
  "priority": "low | medium | high (default: medium)",
  "dueDate": "ISO 8601 date string (optional)",
  "userId": "user-id (required)"
}
```

**Response:** `201 Created`
```json
{
  "_id": "task-id",
  "title": "Task Title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2025-12-01T00:00:00.000Z",
  "userId": "user-id",
  "createdAt": "2025-11-30T00:00:00.000Z",
  "updatedAt": "2025-11-30T00:00:00.000Z"
}
```

---

#### Update Task
```http
PUT /tasks/:id
```

**Request Body:** (All fields optional)
```json
{
  "title": "string",
  "description": "string",
  "status": "todo | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "ISO 8601 date string"
}
```

**Response:** `200 OK`
```json
{
  "_id": "task-id",
  "title": "Updated Task Title",
  ...
}
```

---

#### Delete Task
```http
DELETE /tasks/:id
```

**Response:** `200 OK`
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message",
  "errors": [
    {
      "field": "field-name",
      "message": "Error message"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "message": "Too many requests, please try again later",
  "retryAfter": 900
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "stack": "Error stack trace (development only)"
}
```

---

## Rate Limiting

The API implements rate limiting:
- **100 requests per 15 minutes** per IP address
- Exceeded limits return `429 Too Many Requests`
- `retryAfter` header indicates seconds until reset

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Authentication required |
| 404  | Not Found - Resource not found |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error - Server error |

---

## Examples

### Create a Task (cURL)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "todo",
    "priority": "high",
    "userId": "user-id-here"
  }'
```

### Login (JavaScript/Fetch)
```javascript
const response = await fetch('http://localhost:5000/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.token;
```

### Get Tasks with Authentication (JavaScript/Axios)
```javascript
import axios from 'axios';

const response = await axios.get('http://localhost:5000/api/tasks', {
  headers: {
    Authorization: `Bearer ${token}`
  },
  params: {
    userId: 'user-id',
    status: 'in-progress'
  }
});

const tasks = response.data;
```
