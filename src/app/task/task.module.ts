import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { EffectsModule } from '@ngrx/effects';
import * as taskEffects from './store/task.effects';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/task.reducer';
import { TaskService } from './task.service';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskDetailComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forFeature([]),
    StoreModule.forFeature('taskState', taskReducer),
    EffectsModule.forFeature(taskEffects),
  ],
  providers: [TaskService],
})
export class TaskModule {}
