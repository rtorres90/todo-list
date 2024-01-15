import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TodoList } from '../interfaces';
import { TodolistService } from '../todolist.service';
import { ListsComponent } from '../lists/list.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ListsComponent,
    RouterModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <aside>
      <h2>Lists</h2>
      <mat-nav-list>
        <app-list *ngFor="let todoList of todoLists" [todoList]="todoList" id="{{ todoList.title }}" (click)="changeSelectedTodoList(todoList.title);"></app-list>
      </mat-nav-list>
      <a mat-button [routerLink]="['create']">Add new List</a>
    </aside>

      <main>
        <mat-card>
          <mat-card-header>
            <h1>{{selectedTodoList.title}}</h1>
          </mat-card-header>
          <mat-card-content>
            <h2>Tasks:</h2>
            <mat-selection-list>
              <mat-list-option *ngFor="let task of selectedTodoList?.tasks" [selected]="task.completed">{{ task.title }}</mat-list-option>
            </mat-selection-list>
          </mat-card-content>
        </mat-card>
        <form [formGroup]="updateTask" (submit)="updateTaskOfTodoList()">
          <mat-form-field>
            <mat-label>Task title</mat-label>
            <input id="taskTitle" type="text" formControlName="taskTitle" matInput>
          </mat-form-field>
          <button mat-button type="submit" class="primary">Create new task</button>
        </form>
        <form [formGroup]="updateTodoListForm" (submit)="updateTodoList()">
          <mat-form-field>
            <mat-label>Todo List Title</mat-label>
            <input id="title" type="text" formControlName="title" required value="{{ selectedTodoList.title }}" matInput>
          </mat-form-field>
          <button mat-button type="submit" class="primary">Update title</button>
        </form>
      </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emptyTodoList: TodoList = { title: "", tasks: [] };
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

  updateTaskOfTodoList() {
    this.selectedTodoList.tasks.push({
      title: this.updateTask.value.taskTitle ?? "",
      completed: false
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
