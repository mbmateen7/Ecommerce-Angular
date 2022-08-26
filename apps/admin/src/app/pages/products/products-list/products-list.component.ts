import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product, ProductsService } from '@itechnology/products';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'itechnology-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products : product[];
  
  

  constructor(
    private productService : ProductsService,
    private router: Router,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  onEditProducts(productId) {
    console.log('edit product'+productId);
    this.router.navigateByUrl(`products/form/${productId}`);
  }


  _getProducts() {
    this.productService.getProducts().subscribe(res => {

      this.products = res;

    })
  }

  onDelete(productId) {
    this.productService.deleteProducts(productId).subscribe(res=> {
      
      this.messageService.add({
        severity:'success',
         summary:'Service Message',
          detail:'Category Deleted'
        });
        this._getProducts();
     },
        (error) => {
          this.messageService.add({
            severity:'error',
             summary:'error',
              detail:'Category not Deleted'
            });
        }
     );          
     }

  }

