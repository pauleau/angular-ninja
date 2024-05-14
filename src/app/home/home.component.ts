import {Component, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user.model';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'pr-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: Signal<UserModel | null>;

  constructor(private userService: UserService) {
    this.user = this.userService.currentUser;
  }
}
