import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { Priority, Status, Task } from '../../../../../../shared/models/task.model';
import { selectFilteredTasks, selectOverdueTasks, selectTasksLoading } from '../../task.selectors';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  overdueTasks$: Observable<Task[]>;
  
  statuses = Object.values(Status);
  priorities = Object.values(Priority);
  
  selectedStatus: Status | null = null;
  selectedPriority: Priority | null = null;
  searchTerm = '';

  constructor(private store: Store, private dialog: MatDialog) {
    this.tasks$ = this.store.select(selectFilteredTasks);
    this.loading$ = this.store.select(selectTasksLoading);
    this.overdueTasks$ = this.store.select(selectOverdueTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.addTask({ task: result }));
      }
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.updateTask({ task: result }));
      }
    });
  }

  onDeleteTask(id: string): void {
    // In a real app, you'd use a proper dialog service
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(TaskActions.deleteTask({ id }));
    }
  }

  onStatusFilterChange(status: Status | null): void {
    this.selectedStatus = status;
    this.store.dispatch(TaskActions.setStatusFilter({ status }));
  }

  onPriorityFilterChange(priority: Priority | null): void {
    this.selectedPriority = priority;
    this.store.dispatch(TaskActions.setPriorityFilter({ priority }));
  }

  onSearch(): void {
    this.store.dispatch(TaskActions.setSearchTerm({ search: this.searchTerm || null }));
  }

  exportToCSV(): void {
    // Implement CSV export logic
    console.log('Export to CSV');
  }
}