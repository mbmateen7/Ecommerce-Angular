import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
declare const require:any;

 
@Injectable({
  providedIn: 'root'
})
export class UsersService {
   apiURLUsers = environment.apiURL + 'users';
   count : string = "get/count";
   constructor(private http: HttpClient ) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

   


     getUsers(): Observable<user[]> {
      return this.http.get<user[]>(this.apiURLUsers);
     }

     getUsersById(userId: String): Observable<user> {
      return this.http.get(`${this.apiURLUsers}/${userId}`);
     }

     getUsersCount(): Observable<user> {
      return this.http.get(`${this.apiURLUsers}/${this.count}`);
     }

    createUser( user: user){
      return this.http.post<user>(this.apiURLUsers,user);
    } 

    updateUser( user: user){
      return this.http.put<user>(`${this.apiURLUsers}/${user._id}`,user);
    } 

    deleteUser(userId: String): Observable<object> {
      return this.http.delete<object>(`${this.apiURLUsers}/${userId}`);
     }

    }
