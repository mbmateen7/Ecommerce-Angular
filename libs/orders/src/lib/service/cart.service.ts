import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart, cartItem } from '../model/cart';
 export const CartLocal = 'cart';


@Injectable({
  providedIn: 'root'
})


export class CartService {


  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCartItem());
  constructor(
    private http: HttpClient
  ) { }


  initCartLocalStorage() {

    const cartExist = this.getCartItem().items?.length;
    console.log('cart item exist in intilocal', cartExist);

    if(cartExist! > 0) {    
    const intialCart = {
      items: []
    }
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CartLocal, intialCartJson);
    }
  }


  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CartLocal, intialCartJson);
    this.cart$.next(intialCart);
    
  }

  getCartItem() {

    const cartJson: string = localStorage.getItem(CartLocal) || '{}';
    const cart: Cart = JSON.parse(cartJson);
    return cart;
  }

  setCartItem(cartItem: cartItem ,  updateCartItem?: boolean)  {
    console.log(cartItem);
    // const cart: Cart = JSON.parse(localStorage.getItem(CartLocal) || '{}');
    const cart = this.getCartItem();
    console.log(' whole cart in setItem', cart.items);

    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
    

        console.log('cart item exist in setItem', cartItemExist);
    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity! + cartItem.quantity!;
            console.log(item.quantity);
          }
        }
      });
    } else {
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CartLocal, cartJson);
    this.cart$.next(cart);

    return cart;
  }

  deleteCartItem (productId: string) {
    const cart = this.getCartItem();
    const cartItem = cart.items?.filter(item => item.productId != productId);
    console.log(cartItem);
    cart.items = cartItem;

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CartLocal, cartJson);
    this.cart$.next(cart);
    
  }
  
}
