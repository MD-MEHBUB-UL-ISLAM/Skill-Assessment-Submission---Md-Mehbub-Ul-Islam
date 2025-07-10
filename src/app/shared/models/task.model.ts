export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export enum Status {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Completed = 'Completed'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate: Date;
  createdAt: Date;
}