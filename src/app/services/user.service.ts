import {effect, Injectable, signal} from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {WsService} from "./ws.service";
import {MoneyHistoryModel} from "../models/moneyhistory.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = signal<UserModel | null>(null);
  readonly currentUser = this.user.asReadonly();

  constructor(
    private http: HttpClient,
    private wsService: WsService
  ) {
    this.retrieveUser();
    effect(() => {
      if (this.user()) {
        window.localStorage.setItem('rememberMe', JSON.stringify(this.user()));
      } else {
        window.localStorage.removeItem('rememberMe');
      }
    });
  }

  authenticate(login: string | undefined, password: string | undefined): Observable<UserModel> {
    return this.http
      .post<UserModel>(environment.baseUrl + '/api/users/authentication', { login, password })
      .pipe(tap(user => this.user.set(user)));
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(environment.baseUrl + '/users', { login, password, birthYear });
  }

  retrieveUser(): void {
    let localUser = window.localStorage.getItem('rememberMe');
    if (localUser) {
      const user = JSON.parse(localUser) as UserModel;
      this.user.set(user);
    }
  }

  logout(): void {
    this.user.set(null);
  }

  scoreUpdates(userId?: number): Observable<UserModel> {
    return this.wsService.connect<UserModel>(`/player/${userId}`);
  }

  getMoneyHistory(): Observable<Array<MoneyHistoryModel>> {
    return this.http.get<Array<MoneyHistoryModel>>(environment.baseUrl + '/api/money/history');
  }
}
