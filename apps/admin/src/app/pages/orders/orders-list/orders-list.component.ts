import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order, OrdersService } from '@itechnology/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'itechnology-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  

  orders: order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private orderService : OrdersService,
     private router: Router,
     private messageService: MessageService,
     private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {

    console.log(this._getOrders());
    this._getOrders();
  }


  _getOrders() {

      this.orderService.getOrders().subscribe( res => {
        this.orders = res;

      })

  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/form/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    });
  }



 
}
