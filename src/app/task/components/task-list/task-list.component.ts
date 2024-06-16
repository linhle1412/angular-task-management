import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../task.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input()
  tasks!: Observable<ITask[]>;
  @Output() onRemove = new EventEmitter<string>();

  removeTask($event: any) {
    this.onRemove.emit($event);
  }
}
