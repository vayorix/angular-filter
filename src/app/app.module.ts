import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AboutComponent } from './about/about.component';
// import { HomeComponent } from './home/home.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QueryBuilderModule } from 'angular2-query-builder';
import { Routes } from '@angular/router';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
@NgModule({
  declarations: [
    AppComponent,
    FilterListComponent,
    FilterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    AgGridModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
