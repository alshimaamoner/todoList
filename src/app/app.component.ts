import {Component, Input} from '@angular/core';
import {Task} from './models/task/task.model';
import {HomeComponent} from './components/home/home.component';
import {TaskService} from './service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoList';
  name = 'shimaa';
  taskService: TaskService;
  setName(newName: string): void {
    if (this.taskService.isValid(newName)) {
      this.name = newName;
    }
  }

}
