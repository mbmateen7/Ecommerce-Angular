import { Component, OnInit } from '@angular/core';
import { CartService, OrdersService } from '@itechnology/orders';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit {
  totalPrice: number = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(private cartService: CartService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(this.endSubs$);
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {            
          this.ordersService
            .getProductById(item.productId!)
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity!;
            });
        });
      }
    });
  }
}
