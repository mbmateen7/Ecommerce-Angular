import { Component, OnInit } from '@angular/core';
import { product, ProductsService } from '@itechnology/products';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, category } from '@itechnology/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'itechnology-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  form: FormGroup
  isSubmitted: boolean = false;
  isEdit = false;
  currentID : string;
  categories = [];
  imageDisplay : string | ArrayBuffer; 

  constructor(
    private productService: ProductsService,
    private formBuilder : FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:['',Validators.required],
        image:['',Validators.required],
        price:['',Validators.required],
        brand:['',Validators.required],
        category:['',Validators.required],
        CountinStock:[''],
        description:['',Validators.required],
        richDescription:[''],
        isFeatured:[''],

      });

      this.getCategories();
      this.checkEdited();
  }

  onSubmit(){
    this.isSubmitted = true;

    if (this.form.invalid){
        return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      console.log(key);
      console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value);
    })

    if (this.isEdit) {
        this._updateProduct(productFormData);      
    }else {
      this._addProduct(productFormData);

    }

   

  }
onCancel(){
  this.location.back(); 
}

private _addProduct(productData: FormData) {
  this.productService.createProducts(productData).subscribe((product:product) => {
    this.messageService.add({
      severity:'success',
       summary:'Service Message',
        detail:'Product Created'
      });
        timer(2000).toPromise().then(done=>{
            this.location.back();            
        })
      
   },
      (error) => {
        this.messageService.add({
          severity:'error',
           summary:'error',
            detail:'Product not Created'
          });
      }
   );

}

private _updateProduct(productData: FormData, ) {
  this.productService.updateProducts(productData, this.currentID).subscribe(res => {
    this.messageService.add({
      severity:'success',
       summary:'Service Message',
        detail:'Product Updated'
      });
        timer(2000).toPromise().then(done=>{
            this.location.back();            
        })
      
   },
      (error) => {
        this.messageService.add({
          severity:'error',
           summary:'error',
            detail:'Product not updated'
          });
      }
   );


}

 private checkEdited (){
console.log('in mode');

  this.route.params.subscribe(params => {
    if (params.id) {
      this.isEdit = true;
      this.currentID = params.id;
      this.productService.getProductById(params.id)
      .subscribe((product) => {
        this.productForm.name.setValue(product.name);
        this.productForm.category.setValue(product.category._id);        
        this.productForm.brand.setValue(product.brand);
        this.productForm.price.setValue(product.price);
        this.productForm.CountinStock.setValue(product.CountinStock);
        this.productForm.isFeatured.setValue(product.isFeatured);
        this.productForm.description.setValue(product.description);
        this.productForm.richDescription.setValue(product.richDescription);
        this.imageDisplay = product.image;
        this.productForm.image.setValidators([]);
        this.productForm.image.updateValueAndValidity();
      });

    }
  });
}



  private getCategories(){
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }


   get productForm(){
      return this.form.controls;
  }


   onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        image: file
      });
      this.form.get('image').updateValueAndValidity();
        const fileReader = new FileReader();
        fileReader.onload = () => {
   
        this.imageDisplay = fileReader.result;

      };
      fileReader.readAsDataURL(file);
    }
  }
}
