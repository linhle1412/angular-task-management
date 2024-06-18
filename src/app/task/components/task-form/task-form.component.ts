import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITask } from '../../task.type';
import { Store } from '@ngrx/store';
import { TaskState } from '@angular/fire/firestore';
import { addTask } from '../../store/task.actions';
import { TaskService } from '../../task.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input()
  value!: ITask | null;
  @Input()
  btnText: string | undefined;

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    due_date: new FormControl(''),
    created_at: new FormControl(''),
    status: new FormControl('new'),
    priority: new FormControl('0'),
  });

  constructor(
    private store: Store<TaskState>,
    private taskService: TaskService,
    private toastsr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'].currentValue) {
      this.taskForm.patchValue(changes['value'].currentValue);
    }
  }

  async onSubmit() {
    try {
      if (!this.route.snapshot.paramMap.get('id')) {
        await this.taskService.addTask(this.taskForm.value as ITask);
        this.toastsr.success('Add new task successfully');
        this.router.navigate(['/tasks']);
      } else {
        await this.taskService.updateTask(
          this.route.snapshot.paramMap.get('id')!,
          this.taskForm.value as ITask
        );
        this.toastsr.success('Update successfully');
      }
    } catch (e: any) {
      this.toastsr.error(e);
    }
  }
}
