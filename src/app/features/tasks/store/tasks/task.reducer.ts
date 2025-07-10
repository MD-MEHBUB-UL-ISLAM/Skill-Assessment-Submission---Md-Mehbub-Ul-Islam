import { createReducer, on } from '@ngrx/store';
import { taskAdapter, initialState, TaskState } from './task.state';
import * as TaskActions from './task.actions';

export const taskReducer = createReducer(
  initialState,
  
  // Load Tasks
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => 
    taskAdapter.setAll(tasks, {
      ...state,
      loading: false
    })
  ),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Add Task
  on(TaskActions.addTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => 
    taskAdapter.addOne(task, {
      ...state,
      loading: false
    })
  ),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update Task
  on(TaskActions.updateTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => 
    taskAdapter.updateOne(
      { id: task.id, changes: task },
      { ...state, loading: false }
    )
  ),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Delete Task
  on(TaskActions.deleteTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => 
    taskAdapter.removeOne(id, {
      ...state,
      loading: false
    })
  ),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Filters
  on(TaskActions.setStatusFilter, (state, { status }) => ({
    ...state,
    filters: {
      ...state.filters,
      status
    }
  })),
  on(TaskActions.setPriorityFilter, (state, { priority }) => ({
    ...state,
    filters: {
      ...state.filters,
      priority
    }
  })),
  on(TaskActions.setSearchTerm, (state, { search }) => ({
    ...state,
    filters: {
      ...state.filters,
      search
    }
  }))
);