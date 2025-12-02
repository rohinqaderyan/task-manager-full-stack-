export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days ago`;
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`;
  } else {
    return formatDate(date);
  }
};

export const isOverdue = (date: string | Date, status: string): boolean => {
  if (status === 'completed') return false;
  return new Date(date) < new Date();
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDateRangeFilter = (range: 'today' | 'week' | 'month' | 'all', tasks: any[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return tasks.filter(task => {
    if (!task.dueDate) return range === 'all';
    const dueDate = new Date(task.dueDate);
    
    switch (range) {
      case 'today':
        return dueDate.toDateString() === today.toDateString();
      case 'week':
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        return dueDate >= today && dueDate <= weekFromNow;
      case 'month':
        const monthFromNow = new Date(today);
        monthFromNow.setMonth(today.getMonth() + 1);
        return dueDate >= today && dueDate <= monthFromNow;
      case 'all':
      default:
        return true;
    }
  });
};

export const getTasksAnalytics = (tasks: any[]) => {
  const now = new Date();
  
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed').length,
    completedToday: tasks.filter(t => {
      if (t.status !== 'completed' || !t.updatedAt) return false;
      const updated = new Date(t.updatedAt);
      return updated.toDateString() === now.toDateString();
    }).length,
    completedThisWeek: tasks.filter(t => {
      if (t.status !== 'completed' || !t.updatedAt) return false;
      const updated = new Date(t.updatedAt);
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return updated >= weekAgo;
    }).length,
    highPriority: tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length,
  };
};
