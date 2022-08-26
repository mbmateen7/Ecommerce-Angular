import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { category } from '../../models/category';
import { product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'itechnology-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  product: product [] = [];
  category : category [] = [];
  isCategoryPage: boolean = false;

  
  constructor(
    private productService : ProductsService,
    private CategoryService : CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      console.log('params',params);
      params['categoryid'] ? this.getProducts([params['categoryid']]) : this.getProducts();
      params['categoryid'] ? this.isCategoryPage = true : this.isCategoryPage = false;

    })

   
    this.getCategories();

  }


    getProducts(categoryFilter?: string[]) {
      this.productService.getProducts(categoryFilter).subscribe( prod => {
        console.log('prodcts', prod);
        this.product = prod;
      })
    }


    getCategories() {
      this.CategoryService.getCategories().subscribe( cate => {
        this.category = cate;
      })
    }


      categoryFilter() {
      const selectedCategory = this.category.filter((category) => category.checked)
      .map((category) => category._id);

      this.getProducts(selectedCategory as string[]);
         
      console.log(selectedCategory);
    }
}
