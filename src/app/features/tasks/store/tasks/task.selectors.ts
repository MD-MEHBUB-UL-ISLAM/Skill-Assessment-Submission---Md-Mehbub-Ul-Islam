import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taskAdapter, TaskState } from './task.state';
import { Priority, Status, Task } from '../../../../shared/models/task.model';


export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const {
  selectAll: selectAllTasks,
  selectEntities: selectTaskEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTaskTotal
} = taskAdapter.getSelectors(selectTaskState);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state) => state.error
);

export const selectTasksFilters = createSelector(
  selectTaskState,
  (state) => state.filters
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectTasksFilters,
  (tasks, filters) => {
    return tasks.filter(task => {
      // Status filter
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      
      // Priority filter
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = task.description?.toLowerCase().includes(searchTerm) || false;
        return titleMatch || descriptionMatch;
      }
      
      return true;
    });
  }
);

export const selectOverdueTasks = createSelector(
  selectFilteredTasks,
  (tasks) => {
    const now = new Date();
    return tasks.filter(task => 
      task.dueDate < now && task.status !== Status.Completed
    );
  }
);