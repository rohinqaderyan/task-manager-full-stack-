import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ToastContainer';
import { useKeyboardShortcuts, KeyboardShortcutsHelp } from '../hooks/useKeyboardShortcuts';
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
import TaskAnalytics from '../components/TaskAnalytics';
import TaskCharts from '../components/TaskCharts';
import DateRangeFilter from '../components/DateRangeFilter';
import ExportMenu from '../components/ExportMenu';
import ThemeToggle from '../components/ThemeToggle';
import BulkActions from '../components/BulkActions';
import DragDropBoard from '../components/DragDropBoard';
import { filterTasks, sortTasks } from '../utils/taskUtils';
import { getDateRangeFilter } from '../utils/dateUtils';
import { exportFilteredTasks, exportTaskReport } from '../utils/exportUtils';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: string | null }>({
    isOpen: false,
    taskId: null
  });
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'board'>('grid');

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
      toast.success('Task created successfully! 🎉');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to create task';
      setError(errorMsg);
      toast.error(errorMsg);
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
      toast.success('Task updated successfully! ✨');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to update task';
      toast.error(errorMsg);
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
      toast.success('Task deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete task';
      setError(errorMsg);
      toast.error(errorMsg);
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

  const handleExport = (format: 'json' | 'csv' | 'report') => {
    try {
      const filterDesc = statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery || dateRange !== 'all'
        ? `filtered_${statusFilter}_${priorityFilter}_${dateRange}`
        : 'all';

      if (format === 'report') {
        exportTaskReport(filteredTasks);
      } else {
        exportFilteredTasks(filteredTasks, format, filterDesc);
      }
      toast.success(`Tasks exported successfully as ${format.toUpperCase()}! 📥`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to export tasks');
    }
  };

  const handleTaskSelect = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const handleQuickStatusChange = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === taskId ? response.data : t));
      toast.success('Task status updated! ✨');
    } catch (error: any) {
      toast.error('Failed to update task status');
    }
  };

  const handleQuickPriorityChange = async (taskId: string, newPriority: 'low' | 'medium' | 'high') => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { priority: newPriority });
      setTasks(tasks.map(t => t._id === taskId ? response.data : t));
      toast.success('Task priority updated! 🎯');
    } catch (error: any) {
      toast.error('Failed to update task priority');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.size === 0) return;
    try {
      await Promise.all(Array.from(selectedTasks).map(id => api.delete(`/tasks/${id}`)));
      setTasks(tasks.filter(t => !selectedTasks.has(t._id)));
      setSelectedTasks(new Set());
      toast.success(`${selectedTasks.size} task(s) deleted! 🗑️`);
    } catch (error: any) {
      toast.error('Failed to delete tasks');
    }
  };

  const handleBulkStatusChange = async (newStatus: 'todo' | 'in-progress' | 'completed') => {
    if (selectedTasks.size === 0) return;
    try {
      const updates = await Promise.all(
        Array.from(selectedTasks).map(id => api.put(`/tasks/${id}`, { status: newStatus }))
      );
      const updatedTasksMap = new Map(updates.map(res => [res.data._id, res.data]));
      setTasks(tasks.map(t => updatedTasksMap.get(t._id) || t));
      setSelectedTasks(new Set());
      toast.success(`${selectedTasks.size} task(s) status updated! ✨`);
    } catch (error: any) {
      toast.error('Failed to update tasks');
    }
  };

  const handleBulkPriorityChange = async (newPriority: 'low' | 'medium' | 'high') => {
    if (selectedTasks.size === 0) return;
    try {
      const updates = await Promise.all(
        Array.from(selectedTasks).map(id => api.put(`/tasks/${id}`, { priority: newPriority }))
      );
      const updatedTasksMap = new Map(updates.map(res => [res.data._id, res.data]));
      setTasks(tasks.map(t => updatedTasksMap.get(t._id) || t));
      setSelectedTasks(new Set());
      toast.success(`${selectedTasks.size} task(s) priority updated! 🎯`);
    } catch (error: any) {
      toast.error('Failed to update tasks');
    }
  };

  const filteredTasks = sortTasks(
    getDateRangeFilter(
      dateRange,
      filterTasks(tasks, {
        status: statusFilter === 'all' ? undefined : statusFilter,
        priority: priorityFilter === 'all' ? undefined : priorityFilter,
        search: searchQuery
      })
    ),
    sortBy
  );

  // Keyboard shortcuts
  const shortcuts = [
    {
      key: 'n',
      ctrlKey: true,
      action: openCreateModal,
      description: 'Create new task',
    },
    {
      key: 'e',
      ctrlKey: true,
      action: () => handleExport('json'),
      description: 'Export tasks as JSON',
    },
    {
      key: 'f',
      ctrlKey: true,
      action: () => document.querySelector<HTMLInputElement>('input[type="text"]')?.focus(),
      description: 'Focus search bar',
    },
    {
      key: '/',
      action: () => setShowShortcutsHelp(true),
      description: 'Show keyboard shortcuts',
    },
  ];

  useKeyboardShortcuts(shortcuts);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.username}!</h1>
          <p>Manage your tasks efficiently</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ThemeToggle />
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchTasks} />}

      <TaskAnalytics tasks={tasks} />

      <TaskCharts tasks={tasks} />

      <TaskStats tasks={tasks} />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <DateRangeFilter value={dateRange} onChange={setDateRange} />
        
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--card-bg)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'grid' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'grid' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
            }}
          >
            📊 Grid View
          </button>
          <button
            onClick={() => setViewMode('board')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'board' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'board' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
            }}
          >
            📋 Kanban Board
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={openCreateModal}>+ New Task</button>
        <ExportMenu onExport={handleExport} disabled={tasks.length === 0} />
        
        {tasks.length > 0 && (
          <button
            onClick={() => {
              if (selectedTasks.size === filteredTasks.length) {
                setSelectedTasks(new Set());
              } else {
                setSelectedTasks(new Set(filteredTasks.map(t => t._id)));
              }
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--button-bg)',
            }}
          >
            {selectedTasks.size === filteredTasks.length && filteredTasks.length > 0 ? '☑️ Deselect All' : '☐ Select All'}
          </button>
        )}
        
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
      ) : viewMode === 'board' ? (
        <DragDropBoard
          tasks={filteredTasks}
          onTaskMove={handleQuickStatusChange}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              onStatusChange={handleQuickStatusChange}
              onPriorityChange={handleQuickPriorityChange}
              isSelected={selectedTasks.has(task._id)}
              onSelect={handleTaskSelect}
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

      <BulkActions
        selectedCount={selectedTasks.size}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkPriorityChange={handleBulkPriorityChange}
        onClearSelection={() => setSelectedTasks(new Set())}
      />

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

      <KeyboardShortcutsHelp
        shortcuts={shortcuts}
        isOpen={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />
    </div>
  );
}
