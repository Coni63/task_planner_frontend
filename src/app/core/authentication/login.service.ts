import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>('/api/auth/token/', {
      username,
      password,
      rememberMe,
    });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/api/auth/token/refresh/', params);
  }

  logout() {
    return this.http.post<any>('/api/auth/token/logout/', {});
  }

  me() {
    return this.http.get<User>('/api/users/me/');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/api/menu/').pipe(map(res => res.menu));
  }
}
