import { Component, inject } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoList } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="createForm" (submit)="submitList()">
        <label for="title">Todo List Title</label>
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

  constructor(private router: Router) { }


  submitList() {
    const newList: TodoList = {
      title: this.createForm.value.title ?? "",
      tasks: []
    }
    this.todoListService.createTodoList(newList).then((todoList: TodoList) => {
      console.log(todoList);
      alert(`The new Todo List "${todoList.title}" was created.`)
      this.router.navigate(['/']);
    });
  }
}
