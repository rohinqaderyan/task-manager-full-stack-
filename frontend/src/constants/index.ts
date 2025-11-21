export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const;

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const API_ENDPOINTS = {
  TASKS: '/tasks',
  USERS: '/users',
  LOGIN: '/users/login',
  REGISTER: '/users/register',
} as const;

export const STATUS_COLORS = {
  [TASK_STATUS.TODO]: '#3b82f6',
  [TASK_STATUS.IN_PROGRESS]: '#f59e0b',
  [TASK_STATUS.COMPLETED]: '#10b981',
} as const;

export const PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: '#6b7280',
  [TASK_PRIORITY.MEDIUM]: '#f59e0b',
  [TASK_PRIORITY.HIGH]: '#ef4444',
} as const;

export const STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.COMPLETED]: 'Completed',
} as const;

export const PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Low',
  [TASK_PRIORITY.MEDIUM]: 'Medium',
  [TASK_PRIORITY.HIGH]: 'High',
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  THEME: 'theme',
} as const;

export const MESSAGES = {
  SUCCESS: {
    TASK_CREATED: 'Task created successfully!',
    TASK_UPDATED: 'Task updated successfully!',
    TASK_DELETED: 'Task deleted successfully!',
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful!',
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue.',
    NOT_FOUND: 'Resource not found.',
  },
} as const;
