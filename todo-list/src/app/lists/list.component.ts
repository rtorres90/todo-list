import { Component, Input, inject } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { TodoList } from '../interfaces';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: `
    <div class="list">
      {{ todoList.title }}
    </div>
  `,
  styleUrl: './list.component.css'
})
export class ListsComponent {
  @Input() todoList!: TodoList;
}
