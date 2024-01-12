import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  url = 'http://localhost:3000/todo-lists';
  
  constructor() { }

  async getAllTodoLists(): Promise<TodoList[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}