import {Component, Signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, concat, EMPTY, interval, of, switchMap} from "rxjs";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'pr-menu',
  standalone: true,
  imports: [RouterLink, NgbCollapse],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public navbarCollapsed: boolean = true;
  user: Signal<UserModel | null>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    const user$ = toObservable(this.userService.currentUser).pipe(
      switchMap(
        user => (user ? concat(of(user), this.userService
          .scoreUpdates(user.id)
          .pipe(catchError(() => EMPTY))) : of(null))
      )
    );
    this.user = toSignal(user$, {initialValue: null});
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
