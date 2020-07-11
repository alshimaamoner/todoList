import {Component, ElementRef, Inject, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../models/task/task.model';
import {TaskService} from '../../service/task.service';
import {HttpClient} from '@angular/common/http';
import {ResponseViewModel} from '../../models/response.model';
import {TaskCreateViewModel} from '../../models/task/task.create.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('name') name = '';
  tasks: Task[] = [];
  /// @ViewChild('length')
  @Input()
  length;
  @ViewChild('inputElement') inputElement: ElementRef;
  // taskService: TaskService = new TaskService();
  // Dependency injection
  // tslint:disable-next-line:variable-name
  // constructor call only once
  // tslint:disable-next-line:variable-name
  constructor(private taskService: TaskService, private _httpClient: HttpClient) {}
  ngOnInit(): void {
    // this._httpClient.get('http://api.mohamed-sadek.com/Task/Get').subscribe(response =>
    // {
    //   let responseViewModel: ResponseViewModel = new ResponseViewModel();
    //   responseViewModel = response as ResponseViewModel;
    //   if (responseViewModel.Success){
    //     this.tasks = responseViewModel.Data;
    //   }else{
    //     alert(responseViewModel.Message);
    //   }
    //   // tslint:disable-next-line:no-shadowed-variable
    // }, error =>
    //  {
    //    alert('Sorry Error');
    //  });
    this._httpClient.get('http://api.mohamed-sadek.com/Task/Get').subscribe((response: ResponseViewModel) => {
      if (response.Success){
        this.tasks = response.Data;
        this.length = this.tasks.length;
          }else{
            alert(response.Message);
          }
      // tslint:disable-next-line:no-shadowed-variable
    }, error =>
    {
      alert('Sorry Error');
    });
  }

  addTask(title: string): void{
    // this.taskService.isValid(title) &&
     if ( !this.taskService.isExist(title, this.tasks)){
       const taskNew: TaskCreateViewModel = new TaskCreateViewModel();
       taskNew.Title = title;
       this._httpClient.post('http://api.mohamed-sadek.com/Task/POST', taskNew).subscribe(response =>
       {
         let responseViewModel: ResponseViewModel = new ResponseViewModel();
         responseViewModel = response as ResponseViewModel;
         if (responseViewModel.Success){
           const task: Task = new Task();
           task.ID = responseViewModel.Data;
           task.isDone = false;
           task.Title = title;
           this.tasks.push();
         }else{
           alert(responseViewModel.Message);
         }
         // tslint:disable-next-line:no-shadowed-variable
       }, error =>
       {
         alert('Sorry Error');
       });

       this.inputElement.nativeElement.value = '';
     }
  }
  getPendingTask(): number{
    // Arrow Function
    this.length = this.tasks.filter((task) => task.isDone === false).length;
    return this.length;
  }
  // tslint:disable-next-line:typedef
  removeTask(index: number){
    // @ts-ignore
    const task: Task = this.tasks[index];
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    this._httpClient.delete('http://api.mohamed-sadek.com/Task/Delete?id=' + task.ID).subscribe((response: ResponseViewModel) => {
      if (response.Success) {
        this.tasks.splice(index, 1);
      }else{
         alert(response.Message);
      }
    });

  }

  // tslint:disable-next-line:typedef
  updateTask(task: Task){
    const i = this.tasks.length;
    // @ts-ignore
    this._httpClient.put('http://api.mohamed-sadek.com/Task/PUT', task).subscribe(response =>
    {
      let responseViewModel: ResponseViewModel = new ResponseViewModel();
      responseViewModel = response as ResponseViewModel;
      if (responseViewModel.Success){
        task.isDone = !task.isDone;
        if (task.isDone) {
          --this.length;
        }else{
          this.length++;
        }
      }else{
        alert(responseViewModel.Message);
      }
      // tslint:disable-next-line:no-shadowed-variable
    }, error =>
    {
      alert('Sorry Error');
    });
  }
}
