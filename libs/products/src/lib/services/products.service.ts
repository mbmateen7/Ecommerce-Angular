import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { environment } from '@env/environment';
 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   apiURLProducts = environment.apiURL + 'products';
   count:string = "get/count";
   feature:string = "get/featured"

  constructor(
    private http: HttpClient ) { }


     getProducts(categoryFilter?: string[]): Observable<product[]> {

      let params = new HttpParams();
      if (categoryFilter) {
        params = params.append('categories', categoryFilter.join(','));
        console.log(params);
        
      }
      
      return this.http.get<product[]>(this.apiURLProducts,{ params: params });
     }

     getProductById(productId: String): Observable<product> {
      return this.http.get(`${this.apiURLProducts}/${productId}`);
     }

     getProductCount(): Observable<product> {
      return this.http.get(`${this.apiURLProducts}/${this.count}`);
     }

    createProducts( productData: FormData){
      return this.http.post<product>(this.apiURLProducts, productData);
    } 

    updateProducts( productData: FormData , productId: String){
      return this.http.put<product>(`${this.apiURLProducts}/${productId}`,productData);
    } 

    deleteProducts(productId: String): Observable<object> {
      return this.http.delete<object>(`${this.apiURLProducts}/${productId}`);
     }

     getFeaturedProducts(count:number): Observable<product[]> {
      return this.http.get<product[]>(`${this.apiURLProducts}/${this.feature}/${count}`);
     }

}
