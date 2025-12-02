import { Task } from '../types/task';

export const exportToJSON = (tasks: Task[], filename: string = 'tasks.json') => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(dataBlob, filename);
};

export const exportToCSV = (tasks: Task[], filename: string = 'tasks.csv') => {
  if (tasks.length === 0) {
    throw new Error('No tasks to export');
  }

  // CSV headers
  const headers = ['Title', 'Description', 'Status', 'Priority', 'Due Date', 'Created At', 'Updated At'];
  
  // Convert tasks to CSV rows
  const rows = tasks.map(task => [
    escapeCSV(task.title),
    escapeCSV(task.description),
    task.status,
    task.priority,
    task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
    new Date(task.createdAt).toLocaleDateString(),
    new Date(task.updatedAt).toLocaleDateString(),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(dataBlob, filename);
};

export const exportFilteredTasks = (
  tasks: Task[],
  format: 'json' | 'csv',
  filterDescription: string = 'all'
) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `tasks_${filterDescription}_${timestamp}`;
  
  if (format === 'json') {
    exportToJSON(tasks, `${filename}.json`);
  } else {
    exportToCSV(tasks, `${filename}.csv`);
  }
};

// Helper function to escape CSV values
const escapeCSV = (value: string): string => {
  if (!value) return '';
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

// Helper function to trigger download
const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Generate task summary report
export const generateTaskReport = (tasks: Task[]): string => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const highPriority = tasks.filter(t => t.priority === 'high').length;
  const overdue = tasks.filter(t => 
    t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
  ).length;

  return `
Task Management Report
Generated: ${new Date().toLocaleString()}

=== Summary ===
Total Tasks: ${total}
Completed: ${completed} (${total > 0 ? Math.round((completed / total) * 100) : 0}%)
In Progress: ${inProgress}
To Do: ${todo}
High Priority: ${highPriority}
Overdue: ${overdue}

=== Task Details ===
${tasks.map((task, index) => `
${index + 1}. ${task.title}
   Status: ${task.status}
   Priority: ${task.priority}
   Due Date: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
   Description: ${task.description || 'No description'}
`).join('\n')}
  `.trim();
};

export const exportTaskReport = (tasks: Task[], filename: string = 'task_report.txt') => {
  const report = generateTaskReport(tasks);
  const dataBlob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
  downloadFile(dataBlob, filename);
};
