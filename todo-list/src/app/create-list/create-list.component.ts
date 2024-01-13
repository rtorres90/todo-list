import { Component, inject } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoList } from '../interfaces';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="createForm" (submit)="submitList()">
        <label for="title">Title</label>
        <input id="title" type="text" formControlName="title" required>
        <button type="submit" class="primary">Apply now</button>
      </form>
  `,
  styleUrl: './create-list.component.css'
})
export class CreateListComponent {
  todoListService: TodolistService = inject(TodolistService);

  createForm = new FormGroup({
    title: new FormControl(''),
  });

  submitList() {
    const newList: TodoList = {
      title: this.createForm.value.title ?? "",
      tasks: []
    }
    this.todoListService.createTodoList(newList).then((todoList: TodoList) => {
      console.log(todoList);
    });
  }
}
