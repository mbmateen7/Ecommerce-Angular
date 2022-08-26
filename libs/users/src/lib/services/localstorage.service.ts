import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';


const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {

  constructor() { }

  setToken(data:string) {
    localStorage.setItem(TOKEN,data);
  }

  getToken() : any {
      return localStorage.getItem(TOKEN);
  }

  removeItem() {
    localStorage.removeItem(TOKEN);
  }


  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return tokenDecode.userId;
    } else {
      return null
    }
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    } else {
      return false
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

 


}
