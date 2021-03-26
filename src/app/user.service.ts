import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "http://localhost:8080/api/v1/users";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    constructor(private httpClient: HttpClient) { }
   
    getUserList(): Observable<User[]> {
      return this.httpClient.get<User[]>(this.apiURL + '/users')
      .pipe(
        catchError(this.errorHandler)
      )
    }
    createUser(user): Observable<User> {
      return this.httpClient.post<User>(this.apiURL + '/users', JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }  
     
    getUserById(id): Observable<User> {
      return this.httpClient.get<User>(this.apiURL + '/users/{id}' + id)
      .pipe(
        catchError(this.errorHandler)
      )
    }
     
    updateUser(id, user): Observable<User> {
      return this.httpClient.put<User>(this.apiURL + '/users/{id}' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }
     
    deleteUser(id){
      return this.httpClient.delete<User>(this.apiURL + '/users/{id}' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }
    errorHandler(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
   }
}