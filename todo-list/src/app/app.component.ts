import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListsComponent } from './lists/lists.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    ListsComponent
  ],
  template: `
    <aside>
          <!-- Contenido de la barra lateral -->
          <h2>Sidebar</h2>
          <ul>
              <li><a href="#">Enlace 1</a></li>
              <li><a href="#">Enlace 2</a></li>
              <li><a href="#">Enlace 3</a></li>
          </ul>
          <app-lists></app-lists>
      </aside>

      <main>
        <h1>Hello World!</h1>
      </main>
  `,
})
export class AppComponent {
  title = 'todo-list';
}
