import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
};

const path = 'https://jsonplaceholder.typicode.com/';//environment.rpsgameback;

@Injectable({
  providedIn: 'root'
})
export class TypicodeserviceService {

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(path + endpoint, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getParam(endpoint: string, element: string) {
    return this.http.get(path + endpoint + '/'  + element).pipe(
      catchError(this.handleError)
    );
  }
  
  post(endpoint: string, element: any) {
    return this.http.post(path + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  patch(endpoint: string, element: any) {
    return this.http.patch(path + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(error.error);
  }
}
