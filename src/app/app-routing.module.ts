import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  { path: 'filters', component: FilterListComponent },
  { path: 'filters/new', component: FilterFormComponent },
  { path: 'filters/edit/:id', component: FilterFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
