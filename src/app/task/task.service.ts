import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { ITask } from './task.type';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  collectionSnapshots,
  deleteDoc,
  query,
  where,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  getTasks(status: string): Observable<ITask[]> {
    const itemCollection = collection(this.firestore, 'task');
    const appQuery = query(itemCollection, where('status', '==', status));

    return collectionSnapshots(appQuery).pipe(
      map((action) => action.map((a) => Object.assign(a.data(), { id: a.id })))
    ) as Observable<ITask[]>;
  }

  getTaskDetail(id: string) {
    return from(getDoc(doc(this.firestore, 'task', id)));
  }

  async addTask(data: ITask) {
    try {
      await addDoc(collection(this.firestore, 'task'), data);
    } catch (e: any) {
      throw e.message;
    }
  }

  async updateTask(id: string, data: ITask) {
    try {
      await updateDoc(doc(this.firestore, 'task', id), {
        title: data.title,
        description: data.description,
        due_date: data.due_date,
        created_at: data.created_at,
        status: data.status,
        priority: data.priority,
      });
    } catch (e: any) {
      throw e.message;
    }
  }

  async removeTask(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'task', id));
    } catch (e: any) {
      throw e.message;
    }
  }
}
