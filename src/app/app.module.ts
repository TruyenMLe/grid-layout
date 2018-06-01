import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';


import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './components/base-layout.component';
import { DeleteButtonComponent } from './components/delete-button.component';
import { ShellComponent } from './components/shell.component';
import { GridDataService } from './grid-data.service';
import { PhotoComponent } from './components/photo.component';
import { SelectComponent } from './components/select.component';
import { SearchBoxComponent } from './components/search-box.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ShellComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    DeleteButtonComponent,
    PhotoComponent,
    ShellComponent,
    SelectComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([DeleteButtonComponent, PhotoComponent, SelectComponent])
  ],
  providers: [GridDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
