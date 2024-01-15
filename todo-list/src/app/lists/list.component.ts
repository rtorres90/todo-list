import { Component, Input, inject } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { TodoList } from '../interfaces';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatListModule
  ],
  template: `
    <a mat-list-item>
      {{ todoList.title }}
</a>
  `,
  styleUrl: './list.component.css'
})
export class ListsComponent {
  @Input() todoList!: TodoList;
}
