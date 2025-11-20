import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import { Task, CreateTaskInput } from '../types/task';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?userId=${user?.id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskInput) => {
    try {
      const response = await api.post('/tasks', { ...taskData, userId: user?.id });
      setTasks([response.data, ...tasks]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskData: CreateTaskInput) => {
    if (!editingTask) return;
    
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, taskData);
      setTasks(tasks.map(t => t._id === editingTask._id ? response.data : t));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.username}!</h1>
          <p>Manage your tasks efficiently</p>
        </div>
        <button onClick={logout}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={openCreateModal}>+ New Task</button>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
