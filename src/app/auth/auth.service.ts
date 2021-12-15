import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from './register-payload';
import { Observable } from 'rxjs';
import { LoginPayload } from './login-payload';
import { JwtAutResponse } from './jwt-aut-response';
import { AuthResponse } from './login/auth-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://sejal-blog-nty64gobktbm.runkit.sh/auth/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'register', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(this.url + 'login', loginPayload)
      .pipe(
        map((data) => {
          this.localStorageService.store('isLogged', data.isLogged);
          this.localStorageService.store('username', loginPayload.username);
          return data;
        })
      );
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('isLogged');
  }

  logout() {
    this.localStorageService.clear('isLogged');
    this.localStorageService.clear('username');
  }
}
