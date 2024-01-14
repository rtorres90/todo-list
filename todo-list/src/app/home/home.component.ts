import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TodoList } from '../interfaces';
import { TodolistService } from '../todolist.service';
import { ListsComponent } from '../lists/list.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ListsComponent,
    RouterModule,
    ReactiveFormsModule
  ],
  template: `
    <aside>
      <h2>Lists</h2>
      <app-list *ngFor="let todoList of todoLists" [todoList]="todoList" id="{{ todoList.title }}" (click)="changeSelectedTodoList(todoList.title);"></app-list>
      <a [routerLink]="['create']">Add new List</a>
    </aside>

      <main>
        <h1>{{selectedTodoList.title}}</h1>
        <h2>Tasks:</h2>
        <ul>
          <li *ngFor="let task of selectedTodoList?.tasks">{{ task.title }} <input type="checkbox" id="{{ task.id }}" [checked]="task.completed"/></li>
        </ul>
        <form [formGroup]="updateTask" (submit)="updateTaskOfTodoList()">
          <label for="taskTitle">Task title</label>
          <input id="taskTitle" type="text" formControlName="taskTitle" required>
          <button type="submit" class="primary">Create new task</button>
        </form>
        <form [formGroup]="updateTodoListForm" (submit)="updateTodoList()">
          <label for="title">Todo List Title</label>
          <input id="title" type="text" formControlName="title" required value="{{ selectedTodoList.title }}">
          <button type="submit" class="primary">Update title</button>
        </form>
      </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emptyTodoList:TodoList = { title: "", tasks: [] };
  selectedTodoList: TodoList = this.emptyTodoList;
  todoLists: TodoList[] = [];
  todoListService: TodolistService = inject(TodolistService)



  updateTodoListForm = new FormGroup({
    title: new FormControl(""),
  });

  updateTask = new FormGroup({
    taskTitle: new FormControl(""),
  });

  constructor() {
    this.todoListService.getAllTodoLists().then((todoLists: TodoList[]) => {
      this.todoLists = todoLists;
      if (this.todoLists.length > 0) {
        this.selectedTodoList = todoLists[0];
      }
    });
  }

  changeSelectedTodoList(taskTitle: string) {
    this.selectedTodoList = this.todoLists.find(list => list.title === taskTitle) ?? this.emptyTodoList;
  }

  updateTaskOfTodoList(){
    this.selectedTodoList.tasks.push({
      title: this.updateTask.value.taskTitle ?? "", 
      completed:false
    });
    this.todoListService.updateTodoList(this.selectedTodoList).then((todoList: TodoList) => {
      console.log(todoList);
      alert(`The new Todo List "${todoList.title}" was updated.`)
    });
  }

  updateTodoList() {
    this.selectedTodoList.title = this.updateTodoListForm.value.title ?? "";
    this.todoListService.updateTodoList(this.selectedTodoList).then((todoList: TodoList) => {
      console.log(todoList);
      alert(`The new Todo List "${todoList.title}" was updated.`)
    });
  }
}
