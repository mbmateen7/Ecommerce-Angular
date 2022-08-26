import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../models/category';
import { environment } from '@env/environment';
 
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
   apiURLCategories = environment.apiURL + 'categories';

  constructor(
    private http: HttpClient ) { }


     getCategories(): Observable<category[]> {
      return this.http.get<category[]>(this.apiURLCategories);
     }

     getCategory(categoryId: String): Observable<category> {
      return this.http.get(`${this.apiURLCategories}/${categoryId}`);
     }

    createCategories( categories: category){
      return this.http.post<category>(this.apiURLCategories,categories);
    } 

    updateCategories( categories: category){
      return this.http.put<category>(`${this.apiURLCategories}/${categories._id}`,categories);
    } 

    deleteCategories(categoryId: String): Observable<object> {
      return this.http.delete<object>(`${this.apiURLCategories}/${categoryId}`);
     }
}
