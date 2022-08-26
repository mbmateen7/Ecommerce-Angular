import { Component, OnInit } from '@angular/core';
import { authService } from '@itechnology/users';

@Component({
  selector: 'itechnology-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private auth: authService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
