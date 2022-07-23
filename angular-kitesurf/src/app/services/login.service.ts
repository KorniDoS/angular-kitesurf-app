import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { SignupRequest } from '../models/signup-request.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  apiBaseUrl = environment.apiBaseUrl;
  loggedUserId?: number;
  isLogged: boolean = false;

  user: any={
    userId: '',
    id: ''
  }
  



  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiBaseUrl + '/user');
  }

  loginUser(): Observable<User>{
    this.user = this.http.post<User>(this.apiBaseUrl + 'login', '');
    return this.http.post<User>(this.apiBaseUrl + 'login', '');
  }

  getUser(id?: number): Observable<User>{
    return this.http.get<User>(this.apiBaseUrl + 'user/' + id);
  }

  registerUser(user: SignupRequest): Observable<SignupRequest>{
    return this.http.post<SignupRequest>(this.apiBaseUrl + 'user', user);
  }

}
