import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Task, Priority, Status } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date()
    };
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  isValidStatusTransition(currentStatus: Status, newStatus: Status): boolean {
    const validTransitions: Record<Status, Status[]> = {
      [Status.ToDo]: [Status.InProgress],
      [Status.InProgress]: [Status.Completed],
      [Status.Completed]: []
    };
    return validTransitions[currentStatus].includes(newStatus);
  }
}