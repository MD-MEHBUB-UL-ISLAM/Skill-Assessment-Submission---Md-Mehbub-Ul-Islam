import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Priority, Status, Task } from '../../../../../../shared/models/task.model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() showActions = true;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  Priority = Priority;
  Status = Status;

  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.High: return 'bg-red-100 text-red-800';
      case Priority.Medium: return 'bg-orange-100 text-orange-800';
      case Priority.Low: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  isOverdue(task: Task): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return task.dueDate < today && task.status !== Status.Completed;
  }

  onEdit(task: Task): void {
    this.edit.emit(task);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}