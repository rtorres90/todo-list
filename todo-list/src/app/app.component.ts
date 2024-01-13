import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/list.component';
import { TodoList } from './interfaces';
import { TodolistService } from './todolist.service';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterModule
  ],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
