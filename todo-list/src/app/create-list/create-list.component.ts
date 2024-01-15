import { Component, inject } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoList } from '../interfaces';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <h2 class="section-heading">Apply now to live here</h2>
      </mat-card-header>
      <form [formGroup]="createForm" (submit)="submitList()">
        <mat-form-field>
          <mat-label>Todo List Title</mat-label>
          <input id="title" type="text" formControlName="title" required matInput>
        </mat-form-field>
        <button mat-button type="submit" class="primary">Apply now</button>
      </form>
    </mat-card>
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
      this.router.navigate(['/']);
    });
  }
}
