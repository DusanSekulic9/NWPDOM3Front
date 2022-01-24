import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {User} from "../models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  loggedInUser: User = JSON.parse(localStorage.getItem('user') || '');

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.backend.getAllUsers().subscribe((response) =>{
      this.users = response.body || [];
    }, error => {
      if(!this.loggedInUser.can_read_users && !this.loggedInUser.can_create_users){
        alert('You don\'t have any permissions');
      }else{
        alert('You don\'t have permission to read users');
      }
    })
  }

  delete(user: number){
    this.backend.delete(user).subscribe((response) =>{
      this.ngOnInit();
    })
  }

  updateUser(user: User){
    localStorage.setItem('editUser', JSON.stringify(user));
    this.router.navigate(['/editUser']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  createUser(){
    this.router.navigate(['/createUser']);
  }

}
