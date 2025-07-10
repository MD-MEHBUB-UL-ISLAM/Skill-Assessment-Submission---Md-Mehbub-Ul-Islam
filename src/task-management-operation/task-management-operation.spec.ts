import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementOperation } from './task-management-operation';

describe('TaskManagementOperation', () => {
  let component: TaskManagementOperation;
  let fixture: ComponentFixture<TaskManagementOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagementOperation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagementOperation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
