import { Injectable } from '@angular/core';
import {isDefined} from '@angular/compiler/src/util';
import {Task} from '../models/task/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  isValid(title: string): boolean{

    if (isDefined(title) && title.length !== 0) {
      return true;
    }
    return false;
  }
  isExist(title: string, tasks: Task[]): boolean{
    return tasks.some(task => task.Title === title && task.isDone === false);
  }


}
