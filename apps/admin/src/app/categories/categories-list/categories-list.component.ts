import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, category } from '@itechnology/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'itechnology-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit , OnDestroy {

  categories:category[] = [];
  isEditOpen = false;
  endSubs: Subject<any> = new Subject();


  constructor( private categoryService:CategoriesService,
    private messageService: MessageService,
    private router: Router    ) { }

  ngOnInit(): void {

        this._getCategories();

  }

  ngOnDestroy(): void {


      console.log('last work destroyed');

      this.endSubs.complete();

  }

  onEditCategories(categoryId){

    this.router.navigateByUrl(`categories/form/${categoryId}`);

  }

  onDelete(categoryId) {
     this.categoryService.deleteCategories(categoryId).subscribe(res=> {
      
      this.messageService.add({
        severity:'success',
         summary:'Service Message',
          detail:'Category Deleted'
        });
        this._getCategories();
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
  

     _getCategories(){
      this.categoryService.getCategories().pipe(takeUntil(this.endSubs)).subscribe(res => {
        this.categories = res;
      });
     }

}
