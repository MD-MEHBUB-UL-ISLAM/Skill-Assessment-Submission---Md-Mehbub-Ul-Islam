import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority, Status, Task } from '../../../../../../shared/models/task.model';
import { TaskService } from '../../../../../../core/services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() formSubmit = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  taskForm: FormGroup;
  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      priority: [Priority.Medium, Validators.required],
      status: [Status.ToDo, Validators.required],
      dueDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue({
        ...this.task,
        dueDate: this.formatDate(this.task.dueDate)
      });
      
      // Disable status if task is completed
      if (this.task.status === Status.Completed) {
        this.taskForm.get('status')?.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;
    const dueDate = new Date(formValue.dueDate);
    
    const taskData: Task = {
      ...(this.task || {} as Task),
      ...formValue,
      dueDate: new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())
    };

    // Validate status transition
    if (this.task && !this.taskService.isValidStatusTransition(this.task.status, formValue.status)) {
      alert('Invalid status transition');
      return;
    }

    this.formSubmit.emit(taskData);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get priority() { return this.taskForm.get('priority'); }
  get status() { return this.taskForm.get('status'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
}