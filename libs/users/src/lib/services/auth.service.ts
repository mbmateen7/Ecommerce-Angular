import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import { environment } from '@env/environment';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';


 
@Injectable({
  providedIn: 'root'
})
export class authService {
   apiURLUsers = environment.apiURL + 'users';

   constructor (private http: HttpClient,
    private localstorageService: LocalstorageService,
    private route: Router
    ) {

   }

   login(email:string , password: string) : Observable<user> {
            return this.http.post(`${this.apiURLUsers}/login`,{email,password});
   }

   logout() {
        this.localstorageService.removeItem();
        this.route.navigate(['/login']);
   }
  
}
