import { Component,inject } from '@angular/core';
import { TodoList } from '../interfaces';
import { TodolistService } from '../todolist.service';
import { ListsComponent } from '../lists/list.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ListsComponent,
    RouterModule
  ],
  template: `
    <aside>
      <h2>Lists</h2>
      <app-list *ngFor="let todoList of todoLists" [todoList]="todoList" id="{{ todoList.title }}" (click)="changeSelectedTodoList(todoList.title);"></app-list>
      <a [routerLink]="['create']">Add new List</a>
    </aside>

      <main>
        <h1>{{selectedTodoList?.title}}</h1>
        <ul>
          <li *ngFor="let task of selectedTodoList?.tasks">{{ task.title }} <input type="checkbox" id="{{ task.id }}" [checked]="task.completed"/></li>
        </ul>
      </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedTodoList?: TodoList;
  todoLists: TodoList[] = [];
  todoListService: TodolistService = inject(TodolistService)

  constructor() {
    this.todoListService.getAllTodoLists().then((todoLists: TodoList[]) => {
      this.todoLists = todoLists;
      if (this.todoLists.length > 0) {
        this.selectedTodoList = todoLists[0];
      }
    });
  }

  changeSelectedTodoList(taskTitle:string){
    this.selectedTodoList = this.todoLists.find(list => list.title === taskTitle);
  }
}
