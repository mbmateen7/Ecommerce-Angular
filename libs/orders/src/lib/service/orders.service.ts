import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { order } from '../model/order';
import { environment } from '@env/environment';
 
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
   apiURLOrders = environment.apiURL + 'orders';
   apiURLProducts = environment.apiURL + 'products';

   count:string = "get/count";
   sales:string = "get/totalsales";

  constructor(
    private http: HttpClient ) { }


     getOrders(): Observable<order[]> {
      return this.http.get<order[]>(this.apiURLOrders);
     }
     getOrdersByCount(): Observable<order[]> {
      return this.http.get<order[]>(`${this.apiURLOrders}/${this.count}`);
     }
     getOrdersSales(): Observable<order[]> {
      return this.http.get<order[]>(`${this.apiURLOrders}/${this.sales}`);
     }

     getOrdersById(orderId: String): Observable<order> {
      return this.http.get(`${this.apiURLOrders}/${orderId}`);
     }

    createOrder( orders: order){
      return this.http.post<order>(this.apiURLOrders,orders);
    } 
    updateOrder(orderStaus: { status: string }, orderId: string): Observable<order> {
      return this.http.put<order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
    } 

    deleteOrder(orderId: String): Observable<object> {
      return this.http.delete<object>(`${this.apiURLOrders}/${orderId}`);
     }
     getProductById(productId: String): Observable<any> {
      return this.http.get(`${this.apiURLProducts}/${productId}`);
     }
}
