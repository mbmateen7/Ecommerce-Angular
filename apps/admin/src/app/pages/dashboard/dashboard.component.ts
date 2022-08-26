import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@itechnology/orders';
import { ProductsService } from '@itechnology/products';
import {  UsersService } from '@itechnology/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'itechnology-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  statistics = [];
  constructor(
    private orderService : OrdersService,
    private productService : ProductsService,
    private userService : UsersService
  ) { }

  ngOnInit(): void {

    combineLatest([
    this.orderService.getOrdersByCount(),
    this.productService.getProductCount(),
    this.userService.getUsersCount(),
    this.orderService.getOrdersSales()
  ]).subscribe ( (res) => {
      this.statistics = res;      
    })

    
    
  }

}
