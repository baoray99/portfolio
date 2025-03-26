import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BookLayoutComponent } from './layouts/book-layout/book-layout.component';


const routes: Routes = [
  {
    path: '',
    component: BookLayoutComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
