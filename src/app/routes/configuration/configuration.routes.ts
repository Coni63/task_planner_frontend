import { Routes } from '@angular/router';
import { ConfigurationStatusComponent } from './status/status.component';
import { ConfigurationCategoriesComponent } from './categories/categories.component';
import { ConfigurationProjectsComponent } from './projects/projects.component';

export const routes: Routes = [{ path: 'status', component: ConfigurationStatusComponent },
{ path: 'categories', component: ConfigurationCategoriesComponent },
{ path: 'projects', component: ConfigurationProjectsComponent }
];
