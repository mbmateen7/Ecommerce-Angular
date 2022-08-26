import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { cartItem, cartItemProduct } from '../../model/cart';
import { CartService } from '../../service/cart.service';
import { OrdersService } from '../../service/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit {
  cartCount: number = 0;
  cartItemsDetailed: cartItemProduct[] = [];

  constructor(
    private router : Router,
    private cartService:CartService,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
        
      this.cartCount = cart?.items?.length  ?? 0;
    })

    this._getCartDetails();
  }


  private _getCartDetails() {
    this.cartService.cart$.subscribe((respCart) => {
      this.cartItemsDetailed = [];
      // this.cartCount = respCart?.items?.length ?? 0;
      respCart.items?.forEach((cartItem) => {
        this.orderService.getProductById(cartItem.productId!).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }


  backToShop() {
    this.router.navigateByUrl('/products');
  }

  deleteCartItem(cartItem:cartItemProduct) {

    this.cartService.deleteCartItem(cartItem.product.id);
    
  }

  updateCartItemQuantity(event:any, cartItem:cartItemProduct) {
      this.cartService.setCartItem ({
        productId: cartItem.product._id,
        quantity: event.value
      },true);
  }
}
