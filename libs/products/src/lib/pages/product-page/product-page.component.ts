import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cartItem, CartService } from '@itechnology/orders';
import { product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'itechnology-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit {

  product? : product;
  quantity = 1;
  afterPrice : number = 18;

  constructor(
    private productService : ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    
  }

  ngOnInit(): void {
      this.route.params.subscribe(param => {

        if (param['productid']){
          this.getProducts(param['productid']);
        }

      })

  }



  getProducts(productId:string) {
    this.productService.getProductById(productId).subscribe(prod => {
      this.product = prod;
    })
  }
  
  addProductToCart() {

    const cartItem : cartItem = {
      productId: this.product!.id,
      quantity: this.quantity,
    }

    console.log('show me cartItem',cartItem);
    this.cartService.setCartItem(cartItem);     
  }
}
