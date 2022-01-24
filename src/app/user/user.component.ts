import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userGroup: FormGroup;

  constructor(private http: BackendService, private router: Router, private formBuilder: FormBuilder) {
    this.userGroup = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(4)]],
      name: ['',[Validators.required, Validators.minLength(4)]],
      surname: ['',[Validators.required, Validators.minLength(4)]],
      read: [false],
      create: [false],
      update: [false],
      delete: [false],
      create_m: [false],
      destroy_m: [false],
      search_m: [false],
      start_m: [false],
      restart_m: [false],
      stop_m: [false],
    })

  }

  ngOnInit(): void {
  }

  create(){
    let username = this.userGroup.get('username')?.value;
    let password = this.userGroup.get('password')?.value;
    let name = this.userGroup.get('name')?.value;
    let surname = this.userGroup.get('surname')?.value;
    let read = this.userGroup.get('read')?.value;
    let create = this.userGroup.get('create')?.value;
    let update = this.userGroup.get('update')?.value;
    let del = this.userGroup.get('delete')?.value;
    let create_m = this.userGroup.get('create_m')?.value;
    let destroy_m = this.userGroup.get('destroy_m')?.value;
    let search_m = this.userGroup.get('search_m')?.value;
    let start_m = this.userGroup.get('start_m')?.value;
    let restart_m = this.userGroup.get('restart_m')?.value;
    let stop_m = this.userGroup.get('stop_m')?.value;
    this.http.create(username, password, name, surname, create,read,update,del, create_m, destroy_m,search_m,start_m,restart_m,stop_m).subscribe((response) =>{
      this.router.navigate(['/home'])
    })
  }

  back(){
    localStorage.removeItem('editUser');
    this.router.navigate(['/home']);
  }

}
