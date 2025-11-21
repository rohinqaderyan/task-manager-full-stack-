import { Task } from '../types/task';

export const filterTasks = (
  tasks: Task[],
  filter: { status?: string; priority?: string; search?: string }
): Task[] => {
  return tasks.filter((task) => {
    const matchesStatus = !filter.status || filter.status === 'all' || task.status === filter.status;
    const matchesPriority = !filter.priority || filter.priority === 'all' || task.priority === filter.priority;
    const matchesSearch = !filter.search || 
      task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });
};

export const sortTasks = (tasks: Task[], sortBy: 'date' | 'priority' | 'status'): Task[] => {
  const sorted = [...tasks];
  
  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sorted.sort((a, b) => 
        priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    case 'status':
      const statusOrder = { 'todo': 1, 'in-progress': 2, 'completed': 3 };
      return sorted.sort((a, b) => 
        statusOrder[a.status] - statusOrder[b.status]
      );
    default:
      return sorted;
  }
};

export const getTaskStats = (tasks: Task[]) => {
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
    overdue: tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
    ).length,
  };
};
