import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateListComponent } from './create-list/create-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'create',
        component: CreateListComponent,
        title: 'Create List'
    }
];
