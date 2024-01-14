import { Injectable } from '@angular/core';
import { TodoList } from './interfaces';


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

  async createTodoList(newTodoList: TodoList): Promise<TodoList>{
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodoList)
    });

    return await response.json();
  }

  async updateTodoList(todoList: TodoList): Promise<TodoList>{
    const response = await fetch(`${this.url}/${todoList.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoList)
    });

    return await response.json();
  }
}
