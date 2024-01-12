import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListsComponent } from './lists/list.component';
import { TodoList } from './interfaces';
import { TodolistService } from './todolist.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    ListsComponent
  ],
  template: `
    <aside>
          <!-- Contenido de la barra lateral -->
          <h2>Sidebar</h2>
          <app-list *ngFor="let todoList of todoLists" [todoList]="todoList"></app-list>
      </aside>

      <main>
        <h1>{{selectedTodoList?.title}}</h1>
      </main>
  `,
})
export class AppComponent {
  selectedTodoList?:TodoList;
  todoLists: TodoList[] = [];
  todoListService: TodolistService = inject(TodolistService)

  constructor() {
    this.todoListService.getAllTodoLists().then((todoLists: TodoList[]) => {
      this.todoLists = todoLists;
      this.selectedTodoList = todoLists[0];
      console.log(this.todoLists);
    });
  }
}
