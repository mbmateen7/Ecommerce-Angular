import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { order, OrdersService } from '@itechnology/orders';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'itechnology-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {

  
  order: order;
  form: FormGroup
 isSubmitted: boolean = false;
 isEdit = false;
 currentID : string;
 orderStatuses = [];
  selectedStatus: any;

  constructor(
    private formBuilder: FormBuilder,
    private orderService : OrdersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

   this.getOrder();
   this._mapOrderStatus();

  }


  getOrder() {
    this.route.params.subscribe(param => {
      this.orderService.getOrdersById(param.id).subscribe( order => {
        this.order = order;
      })
    })
    
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }



  onStatusChange(event) {
    this.orderService.updateOrder({ status: event.value }, this.order._id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }

  get Orderform() {
    return this.form.controls;
  }

}
