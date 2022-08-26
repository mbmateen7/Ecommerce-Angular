import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user, UsersService } from '@itechnology/users';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'itechnology-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users:user[] = [];

  constructor( 
    private userService : UsersService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
      this.getListOfUsers();
  }

updateUser(userId) {
  this.router.navigateByUrl(`users/form/${userId}`);

}


onDelete(userId) {
  this.userService.deleteUser(userId).subscribe(res=> {
   
   this.messageService.add({
     severity:'success',
      summary:'Service Message',
       detail:'Category Deleted'
     });
     this.getListOfUsers();
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
  
  getListOfUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    })
  }
}
