import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Priority, Status, Task } from '../../../../shared/models/task.model';


export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: string | null;
  filters: {
    status: Status | null;
    priority: Priority | null;
    search: string | null;
  };
}

export const taskAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => {
    // Sort by priority (High > Medium > Low)
    const priorityOrder = { [Priority.High]: 3, [Priority.Medium]: 2, [Priority.Low]: 1 };
    const priorityCompare = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityCompare !== 0) return priorityCompare;
    
    // Then by due date (earliest first)
    return a.dueDate.getTime() - b.dueDate.getTime();
  }
});

export const initialState: TaskState = taskAdapter.getInitialState({
  loading: false,
  error: null,
  filters: {
    status: null,
    priority: null,
    search: null
  }
});