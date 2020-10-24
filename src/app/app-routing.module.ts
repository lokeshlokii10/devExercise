import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminControlComponent } from './_components/admin-control/admin-control.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AdminControlComponent,
    canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
