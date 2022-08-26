import {
   HttpClient,
    HttpEvent,
     HttpHandler,
      HttpInterceptor, 
      HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(
    private localstorageService : LocalstorageService
    ) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.localstorageService.getToken();
        const isApiUrl = req.url.startsWith(environment.apiURL);

      if(token && isApiUrl) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })

      }
      return next.handle(req);
    }

}
