import { Component, Input, OnInit } from '@angular/core';
import { cartItem, CartService } from '@itechnology/orders';
import { product } from '../../models/product';

@Component({
  selector: 'itechnology-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {

  @Input() product! : product ;
  constructor(
      private cartService: CartService

  ) {}

  ngOnInit(): void {}

  addToCart() {

      const cartItem: cartItem = {
        productId: this.product!.id,
        quantity: 1
      }

        console.log('show me cart itm -> ', cartItem);
     
      this.cartService.setCartItem(cartItem);
  }
}
