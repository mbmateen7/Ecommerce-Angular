
import { UsersService, user } from '@itechnology/users';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'itechnology-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {
  isEdit = false;
  form: FormGroup;
  isSubmitted: boolean = false;
  currentID: string;
  Countries = [];


  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      password: ['',Validators.required],
      email:  ['',[Validators.required, Validators.email]],
      phone:  ['',Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      country: [''],
    });

    this.checkEdited();
    this._getCountries();
  }



  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return;
     }
     const user : user = {
        _id: this.currentID,
        name: this.userForm.name.value,
        password: this.userForm.password.value,
        email: this.userForm.email.value,
        phone: this.userForm.phone.value,
        isAdmin: this.userForm.isAdmin.value,
        street: this.userForm.street.value,
        apartment: this.userForm.apartment.value,
        zip: this.userForm.zip.value,
        country: this.userForm.country.value
     }

     if (this.isEdit){
      this._updateUser(user);
     } else {
      this._addUser(user);
     }

  }


  

    _addUser(user) {

        console.log(user);

      this.userService.createUser(user).subscribe(res => {
        this.messageService.add({
          severity:'success',
           summary:'Service Message',
            detail:'User Created'
          });
            timer(2000).toPromise().then(done=>{
                this.location.back();            
            })
          
       },
          (error) => {
            this.messageService.add({
              severity:'error',
               summary:'error',
                detail:'User not Created'
              });
          }
       );
    }

    private _getCountries() {
      this.Countries = this.userService.getCountries();
    }


    _updateUser(user) {

      this.userService.updateUser(user).subscribe(res => {
        this.messageService.add({
          severity:'success',
           summary:'Service Message',
            detail:'User updated'
          });
            timer(2000).toPromise().then(done=>{
                this.location.back();            
            })
          
       },
          (error) => {
            this.messageService.add({
              severity:'error',
               summary:'error',
                detail:'User not updated'
              });
          }
       );
    }
  
    private checkEdited (){
      
        this.route.params.subscribe(params => {
          if (params.id) {
            this.isEdit = true;
            this.currentID = params.id;
            this.userService.getUsersById(params.id)
            .subscribe(res =>{
              this.userForm.name.setValue(res.name);
              this.userForm.email.setValue(res.email);
              this.userForm.password.setValue(res.password);
              this.userForm.isAdmin.setValue(res.isAdmin);
              this.userForm.phone.setValue(res.phone);
              this.userForm.street.setValue(res.street);
              this.userForm.apartment.setValue(res.apartment);
              this.userForm.zip.setValue(res.zip);
              this.userForm.country.setValue(res.country);

              this.userForm.password.setValidators([]);
              this.userForm.password.updateValueAndValidity();
            })
  
          }
        });
      }


  
      onCancel() {
        this.location.back();
      }

  get userForm() {
    return this.form.controls;
  }
}
