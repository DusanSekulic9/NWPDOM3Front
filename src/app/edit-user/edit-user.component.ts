import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

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
    })

  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('editUser') || '')
    this.userGroup.get('username')?.setValue(user.email);
    this.userGroup.get('password')?.setValue(user.password);
    this.userGroup.get('name')?.setValue(user.name);
    this.userGroup.get('surname')?.setValue(user.surname);
    this.userGroup.get('read')?.setValue(user.can_read_users);
    this.userGroup.get('create')?.setValue(user.can_create_users);
    this.userGroup.get('update')?.setValue(user.can_update_users);
    this.userGroup.get('delete')?.setValue(user.can_delete_users);
  }

  update(){
    let username = this.userGroup.get('username')?.value;
    let password = this.userGroup.get('password')?.value;
    let name = this.userGroup.get('name')?.value;
    let surname = this.userGroup.get('surname')?.value;
    let read = this.userGroup.get('read')?.value;
    let create = this.userGroup.get('create')?.value;
    let update = this.userGroup.get('update')?.value;
    let del = this.userGroup.get('delete')?.value;
    this.http.update(username, password, name, surname, create,read,update,del).subscribe((response) =>{
      localStorage.removeItem('editUser');
      this.router.navigate(['/home'])
    })
  }

  back(){
    localStorage.removeItem('editUser');
    this.router.navigate(['/home']);
  }


}
