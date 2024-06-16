import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from './task.type';
import { Store, select } from '@ngrx/store';
import { TaskState } from './store/task.reducer';
import { TasksActionTypes, loadTasks } from './store/task.actions';
import { selectAllTasks } from './store/task.selectors';
import { TaskService } from './task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  tasks$: Observable<ITask[]>;
  filterStatus: string = 'new';

  constructor(
    private store: Store<TaskState>,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

  ngOnInit() {
    this.store.dispatch(loadTasks({ status: this.filterStatus }));
  }

  async onRemoveTask(id: string) {
    try {
      await this.taskService.removeTask(id);
      this.toastr.success('This task has been deleted');
    } catch (e: any) {
      this.toastr.error(e);
    }
  }
  onChangeStatus($event: string) {
    this.store.dispatch(loadTasks({ status: $event }));
  }
}
