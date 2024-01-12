import { Component, Input, inject } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { TodoList } from '../interfaces';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{ todoList.title }}
    </p>
  `,
  styleUrl: './list.component.css'
})
export class ListsComponent {
  @Input() todoList!: TodoList;
}
