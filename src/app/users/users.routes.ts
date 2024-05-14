import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {MoneyHistoryComponent} from "../money-history/money-history.component";

export const usersRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'money/history', component: MoneyHistoryComponent}
];
