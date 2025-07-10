import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Priority, Status, Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Draft and finalize the project proposal for client review.',
        priority: Priority.High,
        status: Status.ToDo,
        dueDate: new Date('2025-12-01'),
        createdAt: new Date('2023-07-10')
      },
      {
        id: '2',
        title: 'Review team tasks',
        description: 'Go through the tasks assigned to team members.',
        priority: Priority.Medium,
        status: Status.InProgress,
        dueDate: new Date('2025-11-15'),
        createdAt: new Date('2023-07-09')
      },
      {
        id: '3',
        title: 'Update documentation',
        description: 'Update project documentation with latest changes.',
        priority: Priority.Low,
        status: Status.Completed,
        dueDate: new Date('2025-10-20'),
        createdAt: new Date('2023-07-08')
      }
    ];

    return { tasks };
  }

  genId(tasks: Task[]): string {
    return tasks.length > 0 
      ? Math.max(...tasks.map(task => parseInt(task.id, 10))) + 1 + ''
      : '1';
  }
}