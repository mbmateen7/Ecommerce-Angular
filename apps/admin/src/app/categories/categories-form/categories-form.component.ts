import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, category } from '@itechnology/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'itechnology-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
 form: FormGroup
 isSubmitted: boolean = false;
 isEdit = false;
 currentID : string;


  constructor(
    private formBuilder: FormBuilder,
    private categoryService : CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      icon: ['',Validators.required],
      color: ['#ffff']
    });
    this.checkEdited();
  }

  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return;
     }
     const category : category = {
        _id: this.currentID,
       name: this.categoryForm.name.value,
       icon: this.categoryForm.icon.value,
       color: this.categoryForm.color.value
     }

     if (this.isEdit){
      this._updateCategory(category);
     } else {
      this._addCategory(category);
     }

   }


    private _addCategory(category: category) {
      this.categoryService.createCategories(category).subscribe(res => {
        this.messageService.add({
          severity:'success',
           summary:'Service Message',
            detail:'Category Created'
          });
            timer(2000).toPromise().then(done=>{
                this.location.back();            
            })
          
       },
          (error) => {
            this.messageService.add({
              severity:'error',
               summary:'error',
                detail:'Category not Created'
              });
          }
       );
  
    }

    private _updateCategory(category: category) {
      this.categoryService.updateCategories(category).subscribe(res => {
        this.messageService.add({
          severity:'success',
           summary:'Service Message',
            detail:'Category Created'
          });
            timer(2000).toPromise().then(done=>{
                this.location.back();            
            })
          
       },
          (error) => {
            this.messageService.add({
              severity:'error',
               summary:'error',
                detail:'Category not Created'
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
          this.categoryService.getCategory(params.id)
          .subscribe(res =>{
            this.categoryForm.name.setValue(res.name);
            this.categoryForm.icon.setValue(res.icon);
            this.categoryForm.color.setValue(res.color);
          })

        }
      });
    }

    get categoryForm() {
      return this.form.controls;
    }
}
