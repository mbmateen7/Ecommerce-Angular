import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './service/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import {DropdownModule} from 'primeng/dropdown';



export const ordersRoutes: Route[] = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ordersRoutes),
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
  ],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
    
  }
}
