import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApiDocsComponent } from './components/resources/api-docs/api-docs.component';
import { ResourcesComponent } from './components/resources/resources.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'resources',
    component: ResourcesComponent,
    data: { title: 'Resources' },
    children: [
      {
        path: 'api-docs',
        component: ApiDocsComponent,
        data: { title: 'API Documentation' },
      },
    ],
  },
];
