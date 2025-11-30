import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import { Task, CreateTaskInput } from '../types/task';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import TaskStats from '../components/TaskStats';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { filterTasks, sortTasks } from '../utils/taskUtils';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: string | null }>({
    isOpen: false,
    taskId: null
  });

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      setError('');
      const response = await api.get(`/tasks?userId=${user?.id}`);
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskInput) => {
    try {
      setError('');
      const response = await api.post('/tasks', { ...taskData, userId: user?.id });
      setTasks([response.data, ...tasks]);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
      console.error('Error creating task:', err);
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

  const handleDeleteTask = (taskId: string) => {
    setDeleteConfirm({ isOpen: true, taskId });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.taskId) return;
    
    try {
      setError('');
      await api.delete(`/tasks/${deleteConfirm.taskId}`);
      setTasks(tasks.filter(t => t._id !== deleteConfirm.taskId));
      setDeleteConfirm({ isOpen: false, taskId: null });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
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

  const filteredTasks = sortTasks(
    filterTasks(tasks, {
      status: statusFilter === 'all' ? undefined : statusFilter,
      priority: priorityFilter === 'all' ? undefined : priorityFilter,
      search: searchQuery
    }),
    sortBy
  );
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.username}!</h1>
          <p>Manage your tasks efficiently</p>
        </div>
        <button onClick={logout}>Logout</button>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchTasks} />}

      <TaskStats tasks={tasks} />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={openCreateModal}>+ New Task</button>
        
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Search tasks..."
        />
        
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)}>
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>ption value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' ? '🔍' : '📋'}
          title={searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' 
            ? 'No tasks found' 
            : 'No tasks yet'}
          message={searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
            ? 'Try adjusting your filters or search query'
            : 'Create your first task to get started!'}
          actionLabel={!searchQuery && statusFilter === 'all' && priorityFilter === 'all' ? 'Create Task' : undefined}
          onAction={!searchQuery && statusFilter === 'all' && priorityFilter === 'all' ? openCreateModal : undefined}
        />
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

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, taskId: null })}
      />
    </div>
  );
}
